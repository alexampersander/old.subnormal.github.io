// Intializing Parse
Parse.initialize("Rct4o5JxkkksTyCOiJVutTNqJelNFxSvXlpI8f47", "uShtb5i3wDsVnLYYXHS7UdE86thIAmrwVQLHzQGn");

// Validates that all entered information is correct
function validateStuff() {
    var y=document.forms["signup"]["password"].value;
    var y2=document.forms["signup"]["password2"].value;
    if (y.length < 6) {
        alert("Your password must be at least 6 characters long. Please enter another.");
        return false;
    } else {return true;}
    if (y != y2) {
        alert("Password missmatch.");
        return false;
    } else {return true;}
    var x=document.forms["signup"]["email"].value;
    var atpos=x.indexOf("@");
    var dotpos=x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid email address.");
        return false;
    } else {return true;}
}

// Verify that validation passed through before registering
function verify() {
    var truth = validateStuff();
    if (truth) {
        register();
    }
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

    var encryptPass = md5(password);
    alert(encryptPass);
}