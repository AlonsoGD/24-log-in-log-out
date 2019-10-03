function getEmail() {
  window.gapi.client.load("plus", "v1", function() {
    var request = window.gapi.client.plus.people.get({
      userId: "me"
    });
    request.execute(function(resp) {
      console.log(resp.emails[0].value);
    });
  });
}
