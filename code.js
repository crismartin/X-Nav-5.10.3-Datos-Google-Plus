// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyBIldknjdWG4RpRVszKwBwFWiG5PCOS0kA';
var users = ['108086881826934773478', '103846222472267112072'];

// Use a button to handle authentication the first time.
function handleClientLoad() {    
  gapi.client.setApiKey(apiKey);
  users.forEach(makeApiCall);
}  

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall(userId) {  
  gapi.client.load('plus', 'v1', function() {    
    var req_moments = gapi.client.plus.activities.list({
      'userId': userId,
      'collection': 'public',
      'maxResult': '10'
    });
    
    req_moments.execute(function(resp) {         
      var heading = document.createElement('h2');
      var image = document.createElement('img');      
      image.src = resp.items[0].actor.image.url;
      heading.appendChild(image);
      heading.appendChild(document.createTextNode(resp.items[0].actor.displayName));      
      document.getElementById('content').appendChild(heading);

      resp.items.forEach(function(element) {        
        var publicacion = document.createElement('h4');
        var url = document.createElement('a');
        url.href = element.url;        
        url.innerHTML = "<br>" + url.href;        
        publicacion.appendChild(document.createTextNode(element.title));
        publicacion.appendChild(url);
        document.getElementById('content').appendChild(publicacion);        
      }); 
    });    
  });
}