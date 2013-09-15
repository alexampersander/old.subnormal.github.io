// Intializing Parse
Parse.initialize("Rct4o5JxkkksTyCOiJVutTNqJelNFxSvXlpI8f47", "uShtb5i3wDsVnLYYXHS7UdE86thIAmrwVQLHzQGn");

function login() {

	//Get the login values
	var $username = $('#username'),
		$password = $('#password'),

		preferred = $username.val(),
		lowered = $username.val().toLowerCase(),
		password = $password.val(),

		query = new Parse.Query(Parse.User);
		query.equalTo(username, lowered);

	query.find({
		success: function(results) {
			alert("Received user: " + results.length);
			console.log(results);
		}
	});
}