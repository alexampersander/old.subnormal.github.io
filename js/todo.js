/* New mainview called Appview with two subviews: LogInView and
ManageTodosView */
if (Parse.User.current()) {
	new ManageTodosView();
} else {
	new LogInView();
}

// Login Code
Parse.User.logIn(username, password, {
  success: function(user) {
    new ManageTodosView();
    self.undelegateEvents();
    delete self;
  },
  error: function(user, error) {
    self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
    this.$(".login-form button").removeAttr("disabled");
  }
});

// Signup Code
Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
  success: function(user) {
    new ManageTodosView();
    self.undelegateEvents();
    delete self;
  },
  error: function(user, error) {
    self.$(".signup-form .error").html(error.message).show();
    this.$(".signup-form button").removeAttr("disabled");
  }
});

//idk
var Todo = Parse.Object.extend("Todo", {
  // ...
});
var TodoList = Parse.Collection.extend({
  // ...
});

//Todo stuff.
// Create our collection of Todos
this.todos = new TodoList;
 
// Setup the query for the collection to look for todos from the current user
this.todos.query = new Parse.Query(Todo);
this.todos.query.equalTo("user", Parse.User.current());
 
// ...
 
// Fetch all the todo items for this user from Parse
this.todos.fetch();