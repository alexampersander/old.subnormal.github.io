// Intializing Parse
Parse.initialize("Rct4o5JxkkksTyCOiJVutTNqJelNFxSvXlpI8f47", "uShtb5i3wDsVnLYYXHS7UdE86thIAmrwVQLHzQGn");

var currentUser = Parse.User.current();
if (currentUser != null) {
	var user = currentUser.get("username"),
		pass = currentUser.get("password2"),
		salt = currentUser.get("salt");
	console.log("Password: " + pass);
	console.log("Salt: " + salt);
} else {
	window.location.assign("http://subnormal.github.io/loggedout");
	return false;
}

// Verify info stuff
function verify() {
	// Get the values from the input boxes
	var currPass = $('#password').val(),
		newPass = $('#new').val(),
		verPass = $('#verifynew').val(),

		sha3Pass = CryptoJS.enc.Hex.stringify(CryptoJS.SHA3(currPass)),
		newsha3 = CryptoJS.enc.Hex.stringify(CryptoJS.SHA3(newPass));
	hasalt = (sha3Pass + salt);
	newhasalt = (newsha3 + salt);
	console.log("Current pass: " + hasalt);
	console.log("New pass: " + newhasalt);
	/* Check to make sure that currPass matches the user's password
	   if not, then tell the user that it's wrong. */
	if (newPass.length < 6) {
		console.log("Tooshort.");
		return false;
	}
	if (newPass != verPass) {
		// "Passwords do not match" error next to verfify input box
		console.log("Passwords do not match.");
		return false;
	}
	if (hasalt == pass) {
		save();
		return true;
	} else {
		console.log("Password incorrect.");
		return false;
	}
}

// Save functionality
function save() {
	currentUser.set("password", newhasalt);
	currentUser.set("password2", newhasalt);
	currentUser.save(null, {
		success: function() {
			console.log("Password saved.");
			Parse.User.logOut();
			Parse.User.logIn(user, newhasalt, {
				success: function() {
					// Do nothing
				},
				error: function() {
					// Do nothing
				}
			});
		},
		error: function(error) {
			console.log("Error: " + error.code + error.message);
			Parse.User.logOut();
			Parse.User.logIn(user, pass, {
				success: function() {
					// Do nothing
				},
				error: function() {
					// Do nothing
				}
			});
		}
	});
}