// Intializing Parse
Parse.initialize("Rct4o5JxkkksTyCOiJVutTNqJelNFxSvXlpI8f47", "uShtb5i3wDsVnLYYXHS7UdE86thIAmrwVQLHzQGn");

var foo = false;
// Sets the values in the input boxes
var currentUser = Parse.User.current();
if (currentUser) {
	var Name = currentUser.get("preferredname"),
		Pass = currentUser.get("password2"),
		Email = currentUser.get("email"),
		emailVer = currentUser.get("emailVerified"),
		loweredName = Name.toLowerCase();
	username.setAttribute('value',Name);
	if (Email == undefined) {
		//Do nothing
	} else {
		email.setAttribute('value',Email);
		if(!emailVer) {
			$('#unverified').removeAttr("style");
		}
	}
} else {
	window.location.assign("http://subnormal.github.io/loggedout");
	return false;
}

// Save button functionality
var newname = "",
	newemail = "";
function save() {
	var username = $('#username').val(),
		lowered = username.toLowerCase(),
		email = $('#email').val();
	if (username != Name && username != newname) {
		newname = $('#username').val();
		currentUser.set("username", lowered);
		currentUser.set("preferredname", username);
	}
	if (email != Email && email != newemail) {
		newemail = $('#email').val();
		currentUser.set("email", email);
	}

	currentUser.save(null, {
		success: function(object) {
			nametaken.setAttribute('style',"visibility:hidden;");
            foo = true;
		},
		error: function(error) {
			// Name or email taken
			$('#nametaken').removeAttr('style');
            foo = false;
            // Refresh the session. Else, Parse gives you errors.
            Parse.User.logOut();
            Parse.User.logIn(loweredName, Pass, {
                success: function(user) {
                    //Do something
                },
                error: function(user) {
                    //Failed twice. This is bad.
                }
            });
		}
	});
    setTimeout(function(){
        if (foo){
            Parse.User.logOut();
            var username = $('#username').val(),
                lowered = username.toLowerCase(),
                loweredName = lowered;
            Parse.User.logIn(lowered, Pass, {
                success: function(user) {
                    $('#namesaved').fadeIn("slow");
                    $('#namesaved').delay(3000).fadeOut("slow");
                },
                error: function(user) {
                    //Do something
                }
            })
        }
    },700);
}