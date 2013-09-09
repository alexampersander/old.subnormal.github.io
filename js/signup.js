// Intializing Parse
Parse.initialize("Rct4o5JxkkksTyCOiJVutTNqJelNFxSvXlpI8f47", "uShtb5i3wDsVnLYYXHS7UdE86thIAmrwVQLHzQGn");

// Validates that all entered information is correct
function validateStuff() {
    var userRegex = /^[\w\.@]{6,30}$/;
    var validName = document.getElementById('username').value.match(userRegex);
    if (!validName) {
        $('#badname').removeClass("hidden");
        $('#shortpass').addClass("hidden");
        $('#confpass').addClass("hidden");
        $('#wrongemail').addClass("hidden");
        return false;
    }
    var y=document.forms["signup"]["password"].value;
    var y2=document.forms["signup"]["password2"].value;
    if (y.length < 6) {
        $('#shortpass').removeClass("hidden");
        $('#badname').addClass("hidden");
        $('#confpass').addClass("hidden");
        $('#wrongemail').addClass("hidden");
        return false;
    }
    if (y != y2) {
        $('#confpass').removeClass("hidden");
        $('#badname').addClass("hidden");
        $('#shortpass').addClass("hidden");
        $('#wrongemail').addClass("hidden");
        return false;
    }
    var x=document.forms["signup"]["email"].value;
    var atpos=x.indexOf("@");
    var dotpos=x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        $('#wrongemail').removeClass("hidden");
        $('#badname').addClass("hidden");
        $('#shortpass').addClass("hidden");
        $('#confpass').addClass("hidden");
        return false;
    } else {return true;}
}

function register() {
    // Get the values from login page
    var $username = $("#username"),
        $password = $("#password"),
        $password2 = $("#password2"),
        $email = $("#email");

    var username = $username.val(),
        password = $password.val(),
        password2 = $password.val(),
        email = $email.val();

    var lowered = username.toLowerCase();
    var encryptPass = md5(password);

    var user = new Parse.User();
    user.set("username", lowered);
    user.set("preferredname", username);
    user.set("password", encryptPass);
    user.set("email", email);

    user.signUp(null, {
        success: function(user) {
            //Login user
            /*user.logIn(lowered, encryptPass {
                success: function(user) {
                    return true;
                },
                error: function(user, error) {
                    alert("Error: " + error.code + " " + error.message);
                    return false;
                }
            });*/
            return true;
        },
        error: function(user, error) {
            if (error.code == 202) {
                $('#taken').removeClass("hidden");
                return false;
            }
            else {
                alert("Error: " + error.code + " " + error.message);
                return false;
            }
        }
    });
}

// Verify that validation passed through before registering
function verify() {
    var truth = validateStuff();
    if (truth) {
        register();
    } else {return false;}
}