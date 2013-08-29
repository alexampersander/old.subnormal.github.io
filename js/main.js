// Intializing Parse
Parse.initialize("Rct4o5JxkkksTyCOiJVutTNqJelNFxSvXlpI8f47", "uShtb5i3wDsVnLYYXHS7UdE86thIAmrwVQLHzQGn");

// Log In and Sign Up
function register() {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
}