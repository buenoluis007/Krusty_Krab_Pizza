// Krusty Krab Pizza
// Need to npm install --save express, mysql, ejs, and body-parser
const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();
const React = require('react');


// Will look for a file in local directory called "views" and for a file with ".ejs" at the end
app.use(express.static(__dirname + "/public")); // Use public folder to access css
app.use(bodyParser.urlencoded({extended: true})); // Needed for post requests ie: submitting a form
let signedInUser = {
    email: "",
    type: "",
    loggedIn: false,
    failed: false
};

let restaurant = {
  name: '',
  address: '',
  phoneNum: ''
};
// Establish connection with database
var connection = mysql.createConnection({
  host: 'sl-us-south-1-portal.20.dblayer.com',
  port: 40397,
  user: 'admin',
  password: 'SFXQRQVBQVYQFGUC',
  database: 'compose'
});

// Check if database is properly connected to
connection.connect(function(error) {
    if(!!error) {
        console.log("Error connecting to database");
    } else {
        console.log("Connected");
    }
});


// app.get('/', function(req, res) {
//   console.log("Asdasdasdasdsad");
//   console.log(signedInUser);
// })

app.get('/user', function(req, res) {
  console.log("Hello there from server");
  console.log(signedInUser);
  var q = "SELECT * FROM Users";
  connection.query(q, function(err, results) {
    if(!err){
      res.send(JSON.stringify(signedInUser));
      console.log(signedInUser);
      signedInUser.failed = false
    } else {
      console.log("Nope no good");
    }
  });
});

app.get('/restaurant', function(req, res) {
  var id = req.query.id;
  var q = "SELECT * FROM Restaurants WHERE restaurantID=" + id;
  connection.query(q, function(err, results) {
      if(err) throw err;
      // console.log(results);
      if(results[0]) {
          restaurant.name = results[0].name;
          restaurant.address = results[0].address;
          restaurant.phoneNum = results[0].phoneNum;
      }
  console.log(restaurant);
  res.send(JSON.stringify(restaurant));
  })
});

// // Login Page
// app.post('/login', function(req, res) {
//   console.log(signedInUser.email);
//     if(signedInUser.status === true) { // If the user is already signed in and tries to access this page, redirect them
//       req.redirect('/');
//     } else {
//         res.render("/login");
//     }
// });
// app.post('/checkRest', function(req, res) {
//   var restID = req.body.link;
//   console.log("the restid is:" + restID);
//   q = "SELECT * FROM Restaurants WHERE restaurantID = '" + restID + "'";
//   connect.query(q, function(err, results) {
//     if(err) throw err;
//     if(results[0]) {
//       restaurant.name = results[0].name;
//       restaurant.address = results[0].address;
//       restaurant.phoneNum = results[0].phoneNum;
//       console.log("res:" + restaurant);
//     }
//   })
// });

app.post('/checkRest', function(req, res) {
    console.log("Fuck me in the ass");
    var id = req.body.linkbtn;
    var q = "SELECT * FROM Restaurants WHERE restaurantID=" + id;
    connection.query(q, function(err, results) {
        if(err) throw err;
        // console.log(results);
        if(results[0]) {
            console.log("Fuck me in the ass2");
            restaurant.name = results[0].name;
            restaurant.address = results[0].address;
            restaurant.phoneNum = results[0].phoneNum;
            console.log("ass" + restaurant);
        }
    });
});

app.post('/logincheck', function(req, res) {
    var email = req.body.email;
    var password = req.body.pass;
    console.log(email);
    console.log(password);
    var q = "SELECT * FROM Users WHERE email='" + email + "' && password='" + password + "'";
    connection.query(q, function(err, results) {
        if(err) throw err;
        // console.log(results);
        if(results[0]) {
            console.log("The email and password are correct!");
            signedInUser.email = results[0].email;
            signedInUser.type = results[0].acctType;
            signedInUser.loggedIn = true;
            signedInUser.failed = false;
            console.log(signedInUser);
            res.redirect('/');
        } else {
            console.log("The email or password is incorrect. Try again.");
            signedInUser.failed = true
            console.log(signedInUser.failed);
            res.redirect('/login');
        }
    });
});

// Register Page
// app.get('/register', function(req, res) {
//     if(signedInUser.email) { // If the user is already signed in and tries to access this page, redirect them
//         res.redirect('/');
//     } else {
//         res.render('register');
//     }
// });

app.post('/registercheck', function(req, res) {
    var fName = req.body.fName; // information obtained from body-parser
    var lName = req.body.lName;
    var email = req.body.email;
    var address = req.body.address;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    if(pass1 == pass2) {
        var q = "SELECT email FROM Users WHERE email ='" + email + "'";
        connection.query(q, function(err, results) {
            if(err) throw err;
            if(results[0]) {
                console.log("This email already exists!");
            } else {
                var user = {
                    email: email,
                    password: pass2
                };
                // q = "INSERT INTO Users(email, password) VALUES ('" + email + "', '" + pass2 + "')";
                connection.query("INSERT INTO Users SET ?", user, function(err, results) {
                    if(err) throw err;
                });

                q = "SELECT userID FROM Users WHERE email = '" + email + "'";
                connection.query(q, function(err, result) {
                    if(err) throw err;
                    var registerAccount = {
                        userID: result[0]['userID'],
                        address: address,
                        f_name: fName,
                        l_name: lName,
                    };
                    // console.log(getUserID(email));
                    connection.query("INSERT INTO RegisteredAccts SET ?", registerAccount, function(err, results) {
                        if(err) throw err;
                        console.log("The User has been successfully registered!");
                    });
                });
            }
        });
    } else {
        console.log("Your passwords do not match!");
    }
    res.redirect('/login');
});

// Sign Out
app.post('/signout', function(req, res) {
    signedInUser.email = "";
    signedInUser.type = "";
    signedInUser.loggedIn = false;
    res.redirect('/');
});

app.get('*', function(req, res) {
    res.send("This is not a valid page on this website.")
});

// Setup port
app.listen(8080, function() {
    console.log("Server running on 8080");
});

function checkExistingEmail(email) {
    var q = "SELECT email FROM Users WHERE email = '" + email + "'";
    connection.query(q, function(err, results) {
        if(err) throw err;
        if(results) {
            return true;
        } else {
            return false;
        }
    });
}

function getUserID(email) {
    var q = "SELECT id FROM Users WHERE email = '" + email + "'";
    connection.query(q, function(err, results) {
        if(err) throw err;
        return (results[0]['userID']);
    });
}
