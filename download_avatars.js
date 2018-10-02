var request = require('request');
var secret = require('./secrets');
var fs = require('fs');
var args = process.argv.slice(2)


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
}
var query = options;


  request.get(query, function(err, res, body) {
  	if (!err && res.statusCode == 200 && repoOwner !== null && repoName !== null){
  		var data = JSON.parse(body);
  		
    	cb(null, res, data);
    	//CB(data['avatar_url'], 'avatars/' + data['login'] + '.jpg')

    
  	} else {
  		console.log(err);
  		console.log("Error! Please enter Repo Owner and Repo Name");
  	}
  
   
});
}

getRepoContributors(args[0], args[1], function(err, result, body){
	body.forEach(function(element){
		console.log(element['avatar_url'])
		downloadImageByURL(element['avatar_url'], 'avatars/' + element['login'] + '.jpg', element['login'])

	});
});

function downloadImageByURL(url, filePath, name) {
  request.get(url + filePath)               
       .on('error', function (err) {                                   // Note 2
         throw err; 
       })
       .on('response', function (response) {   
                              
         console.log('Response Status Code: ', response.statusCode, '\n', response.statusMessage, '\n', response.headers['content-type']);
       })
       .pipe(fs.createWriteStream('./'+ name + '.jpg' ));
}




 