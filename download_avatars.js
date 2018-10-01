var request = require('request');
var secret = require('./secrets');
secret.GITHUB_TOKEN = aa6b90f566ebe654a5ce2d52188ade8c386dc648;

console.log('Welcome to the GitHub Avatar Downloader!');

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
}
  request(options, function(err, res, body) {
    cb(err, body);
});


getRepoContributors("jquery","jquery", function(err, result) {

  // ...
   console.log("Errors:", err);
  console.log("Result:", result);

});

console.log(getRepoContributors())