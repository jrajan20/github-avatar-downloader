var request = require('request');
var secret = require('./secrets');


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
  	if (!err && res.statusCode == 200){
  		var data = JSON.parse(body);
  		console.log(data);
    	cb(null, res, data);
    
  	} else {
  		console.log(err)
  	}
   
});
}

getRepoContributors("jquery", "jquery", function(err, result, body){
	body.forEach(function(element){
		console.log(element['avatar_url'])
	});
});


 