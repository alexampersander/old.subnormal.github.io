// Intializing Parse
Parse.initialize("Rct4o5JxkkksTyCOiJVutTNqJelNFxSvXlpI8f47", "uShtb5i3wDsVnLYYXHS7UdE86thIAmrwVQLHzQGn");
function initlogin(lowered, hasalt) {
	Parse.User.logIn(lowered, hasalt, {
		success: function(user) {
			alert("Success!");
			return true;
		},
		error: function(user, error) {
			alert("Something weird just happened. Error: " + error.code + " " + error.message);
			return false;
		}
	})
}
function login() {

	//Get the login values
	var $username = $('#username'),
		$password = $('#password'),

		preferred = $username.val(),
		lowered = $username.val().toLowerCase(),
		password = $password.val(),
		hash = CryptoJS.enc.Hex.stringify(CryptoJS.SHA3(password)),

		query = new Parse.Query(Parse.User);
		query.equalTo("username", lowered);

	function getresult(results, lowered, hasalt) {
		alert("Received user: " + results.length);
		console.log(results);
		var salt = results[0].attributes['salt'],
			hasalt = hash + salt;
		initlogin(lowered, hasalt);
		return hasalt;
	}

	query.find({
		success: function(results) {getresult(results, lowered);},

		error: function(error) {
			alert("Something just went badly. Error: " + error.code + ".");
			return false;
		}
	});
}