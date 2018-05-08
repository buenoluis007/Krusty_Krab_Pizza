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
    id: "",
    email: "",
    type: "",
    loggedIn: false,
    failed: false
};

let restaurantInfo = {
    resID: '',
    name: '',
    address: '',
    phoneNum: ''
};

let Manager = {
    resID: '',
    name: '',
    address: '',
    deliveryPerson: [],
    pendingUsers: [],
    orders: [],
    complaints: []
};

let Cooks = {

};
// Establish connection with database :)
var connection = mysql.createConnection({
    host: '',
    port: 40397,
    user: 'admin',
    password: '',
    database: ''
});


// Check if database is properly connected to
connection.connect(function(error) {
    if(!!error) {
        console.log("Error connecting to database");
    } else {
        console.log("Connected");
    }
});


app.get('/', function(req, res) {
  console.log("Asdasdasdasdsad");
  console.log(signedInUser);
})

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
          restaurantInfo.resID = results[0].restaurantID;
          restaurantInfo.name = results[0].name;
          restaurantInfo.address = results[0].address;
          restaurantInfo.phoneNum = results[0].phoneNum;
      }
  console.log(restaurantInfo);
  res.send(JSON.stringify(restaurantInfo));
  })
});

// Login Page
app.post('/login', function(req, res) {
  console.log(signedInUser.email);
    if(signedInUser.status === true) { // If the user is already signed in and tries to access this page, redirect them
      req.redirect('/');
    } else {
        res.render("/login");
    }
});
app.post('/checkRest', function(req, res) {
  var restID = req.body.link;
  console.log("the restid is:" + restID);
  q = "SELECT * FROM Restaurants WHERE restaurantID = '" + restID + "'";
  connect.query(q, function(err, results) {
    if(err) throw err;
    if(results[0]) {
      restaurant.name = results[0].name;
      restaurant.address = results[0].address;
      restaurant.phoneNum = results[0].phoneNum;
      console.log("res:" + restaurant);
    }
  })
});

app.post('/checkRest', function(req, res) {
    var id = req.body.linkbtn;
    var q = "SELECT * FROM Restaurants WHERE restaurantID=" + id;
    connection.query(q, function(err, results) {
        if(err) throw err;
        // console.log(results);
        if(results[0]) {
            restaurant.name = results[0].name;
            restaurant.address = results[0].address;
            restaurant.phoneNum = results[0].phoneNum;
            console.log("ass" + restaurant);
        }
    });
});

var cart = require('./cart');
var shoppingCart = new cart();

app.get('/restaurantInfo', function(req,res){
  console.log('request restaurantInfo ');
  var q = "select * from Restaurants where restaurantID = "+req.query.id+";";
  connection.query(q,function(err,data){
    if (err) return console.error("Restaurant Not Found" + err);
    res.send(JSON.stringify(data[0]));
    console.log('restaurantInfo sent');
  });
});

app.get('/menuInfo',function(req,res){
  console.log('request menuInfo ');
  var q = "select * from Menu where restaurantID = " + req.query.id + ";";
  connection.query(q,function(err,data){
    if (err) return console.error("Restaurant Not Found" + err);
    res.send(JSON.stringify(data));
    console.log('menuInfo sent');
  });
});

app.get('/receipt',function(req,res){
  console.log('request receipt ');
  res.send(JSON.stringify(shoppingCart.getReceipt()));
});

app.get('/shoppingCart',function(req,res){
  console.log('request shoppingCartInfo ');
  res.send(JSON.stringify(shoppingCart.getItems()));
});

app.post('/addItem',function(req,res){
  shoppingCart.addItem(req.body.foodName,req.body.qty,req.body.price);
  shoppingCart.updatePrice();
  console.log(req.body.foodName + ' added');
  res.end();
});

app.post('/removeItem',function(req,res){
  shoppingCart.removeItem(req.body.index);
  shoppingCart.updatePrice();
  res.end();
});

app.post('/increaseQty',function(req,res){
  shoppingCart.increaseQty(req.body.index);
  shoppingCart.updatePrice();
  res.end();
});

app.post('/decreaseQty',function(req,res){
  shoppingCart.decreaseQty(req.body.index);
  shoppingCart.updatePrice();
  res.end();
});

app.post('/clearCart',function(req,res){
  shoppingCart.clearCart();
  shoppingCart.updatePrice();
  res.end();
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
            signedInUser.id = results[0].userID;
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

//Register Page
app.get('/register', function(req, res) {
    if(signedInUser.email) { // If the user is already signed in and tries to access this page, redirect them
        res.redirect('/');
    } else {
        res.render('register');
    }
});

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

//Cook section of the site.

app.get("/restaurant/cook/menu",function(req, res){
    if(signedInUser.type === "Cook"){
        var resName = res.params.resName;
        var currentMenuName = [];
        var currentMenuDesc = [];
        var currentMenuPrice =[];
        restaurantID = 0;

        //retrieves the specific restaurantID using the restaurant name.
        var q = "SELECT restaurantID FROM Restaurants WHERE name = '" + resName+"'";
        connection.query(q, function(err, results) {
            if(err) throw err;
            var restaurantID = results[0].restaurantID;

            //Adds all of the food in a the Menu array from the Menu database
            var k = "SELECT * FROM Menu WHERE restaurantID = " + restaurantID ;

            connection.query(k, function(err, results) {
                if(err) throw err;
                for(var i = 0; i< results.length; i++){
                currentMenuName.push(results[i].foodName);
                currentMenuDesc.push(results[i].description);
                currentMenuPrice.push(results[i].price);
            }

            });
        });
    }
});

// Add the new button to the Menu
app.post("/restaurant/:resName/cook/menu/addfood", function(req,res){
  var foodName = req.body.foodName;
  var description = req.body.foodDesc;
  var price = req.body.foodPrice;
  var restaurantID = 0;
  var resName = req.params.resName;

  var Food = {
    restaurantID: restaurantID,
    foodName : foodName,
    description: description,
    price : price,
  };
  console.log(Food.price);


//  Adds the new food item to the Menu table in the database.
  connection.query("INSERT INTO Menu SET ?", Food, function(err, results) {
      if(err) throw err;
  });

  res.redirect("/"+ resName +"/cook/menu");

});

//post request that removes food from menu.
app.post("/restaurant/:resName/cook/menu/removeFood",function(req,res){

    var foodName = req.body.foodName;
    var resName = req.params.resName;

    //retrieves the specific restaurantID using the restaurant name.
    var q = "SELECT restaurantID FROM Restaurants WHERE name = '" + resName+"'";
    connection.query(q, function(err, results) {
        if(err) throw err;
        var restaurantID = results[0].restaurantID;

        //Removes food from menu.
        var k = "DELETE FROM Menu WHERE restaurantID =" + restaurantID + " AND foodName = '" + foodName +"'";
        connection.query(k, function(err, results) {
            if(err) throw err;
        });
    });
});

// Manager Part of Website
// app.get('/Manager', function(req, res) {
//     var restaurantName = req.params.resName;
//     var pendingUsers = []; // Currently no good way to display pending users linked to the restaurant with given data
//     var users = []; // Currently no good way to display users linked to the restaurant with given data
//     var workers = []; // Cooks will be workers[0], DeliveryPerson will be workers[1]
//     var orders = [];
//     var complaints = [];
//     if(signedInUser.type === "Manager") {
//         var q = "SELECT restaurantID FROM Restaurants WHERE name = '" + restaurantName + "'";
//         connection.query(q, function(err, results) {
//             if(err) throw err;
//             var resID = results[0].restaurantID;
//             // View Cooks from their restaurant
//             q = 'SELECT Cooks.userID, Cooks.salery, CONCAT(f_name, " ", l_name) AS name FROM Cooks JOIN Users ON Cooks.userID = Users.userID JOIN RegisteredAccts ON Users.userID = RegisteredAccts.userID WHERE Cooks.restaurantID = ${restaurant.resID}'
//             connection.query(q, function(err, results){
//                 if(err) throw err;
//                 // Every cook comes back as an array of objects
//                 workers.push(results); // workers[0][i].name to access specific cook
//             });
//             // View DeliveryPerson from their restaurant
//             q = 'SELECT DeliveryPerson.userID, DeliveryPerson.salery, CONCAT(f_name, " ", l_name) AS name FROM DeliveryPerson JOIN Users ON DeliveryPerson.userID = Users.userID JOIN RegisteredAccts ON Users.userID = RegisteredAccts.userID WHERE DeliveryPerson.restaurantID = ${restaurant.resID}';
//             connection.query(q, function(err, results){
//                 if(err) throw err;
//                 // Every cook comes back as an array of objects
//                 workers.push(results); // workers[1][i].name to access specific delivery person
//             });
//             // View Current Orders (Selecting DeliveryPerson will be done in another post request)
//             q = "SELECT * FROM ORDERS WHERE restaurantID = " + restaurant.resID;
//             connection.query(q, function(err, results) {
//                 if(err) throw err;
//                 if(results[0]) {
//                     orders.push(results); // orders[0][i].AnAttributeFromOrdersTableGoesHere
//                 } else {
//                     console.log("There are 0 orders for this restaurant at the moment");
//                 }
//             });
//             // Pending Users
//             q = "SELECT * FROM PendingApps";
//             connection.query(q, function(err, results) {
//                 if(err) throw err;
//                 pendingUsers.push(results);
//             });
//
//             // Show Complaints
//             q = "SELECT * FROM Complaints WHERE restaurantID = " + restaurant.resID;
//             connection.query(q, function(err, results) {
//                 if(err) throw err;
//                 complaints.push(results);
//             });
//             // The ejs part that needs to be converted to react
//             res.render("manager", {
//                 pendingdata: pendingUsers,
//                 userdata: users,
//                 workerdata: workers,
//                 orderdata: orders,
//                 currentRestaurant: restaurantName,
//                 complaints: complaints
//             });
//         });
//         res.send(JSON.stringify(restaurant));
//     } else {
//         console.log("You are not authorised to view this page");
//         res.redirect('/');
//     }
// });

// -------------------------------------------------------------------------------
app.get('/Account/Manager', function(req, res) {
    console.log('hello from manager server');
        var q = "SELECT * FROM Restaurants JOIN Managers ON Restaurants.restaurantID = Managers.restaurantID WHERE userID= " + signedInUser.id;
        console.log('manager id is: ' + signedInUser.id);
        connection.query(q, function(err, results) {
            if(err) throw err;
            Manager.resID = results[0].restaurantID;
            Manager.name = results[0].name;
            Manager.address = results[0].address;
            console.log('the resID is ' + Manager.resID);
            console.log('name of rest is: ' + Manager.name);
            console.log('address:' + Manager.address);

            // View DeliveryPerson from their restaurant
            q = `SELECT DeliveryPerson.userID, DeliveryPerson.salery, CONCAT(f_name, " ", l_name) AS name FROM DeliveryPerson JOIN Users ON DeliveryPerson.userID = Users.userID JOIN RegisteredAccts ON Users.userID = RegisteredAccts.userID WHERE DeliveryPerson.restaurantID = ${Manager.resID}`;
            connection.query(q, function(err, results){
                if(err) throw err;
                // Every cook comes back as an array of objects
                Manager.deliveryPerson.name = results[0].name;
                Manager.deliveryPerson.salary = results[0].salery;
            });
            // View Current Orders (Selecting DeliveryPerson will be done in another post request)
            q = "SELECT * FROM Orders WHERE restaurantID = " + Manager.resID;
            connection.query(q, function(err, results) {
                if(err) throw err;
                if(results[0]) {
                    Managerorders.push(results); // orders[0][i].AnAttributeFromOrdersTableGoesHere
                } else {
                    console.log("There are 0 orders for this restaurant at the moment");
                }
            });
            // Pending Users
            q = "SELECT * FROM PendingApps";
            connection.query(q, function(err, results) {
                if(err) throw err;
                if(results[0]){
                    Manager.pendingUsers.push(results);
                } else {
                    console.log('no pending');
                }
            });

            // Show Complaints
            q = "SELECT * FROM Complaints WHERE restaurantID = " + Manager.resID;
            connection.query(q, function(err, results) {
                if(err) throw err;
                Manager.complaints.push(results);
                res.send(JSON.stringify(Manager));
            });

        });
});


app.get('/Cooks', function(req, res) {
    console.log("Hello from cooks");
    var q = `SELECT Cooks.userID, Cooks.salery, CONCAT(f_name, " " , l_name) as name FROM Cooks JOIN RegisteredAccts ON Cooks.userID = RegisteredAccts.userID JOIN Restaurants ON Restaurants.restaurantID = Cooks.restaurantID WHERE Cooks.restaurantID = 8`;
    console.log('asldkjhasdkjajksd');
    connection.query(q, function(err, results) {
        if(err) throw err;
        Cooks = results;
        console.log(Cooks);
        res.send(JSON.stringify(Cooks));
    });
});









// -------------------------------------------------------------------------------








// Apoint Devlivery Person to an order
// Some form that you can appoint a delivery person to an order (a drop down can appear for the orders next to a delivery person)
app.post('/restaurant/:resName/manager/delivery', function(req, res) {
    var restaurantName = req.params.resName;
    var order = req.body.orderID;
    var deliPersonID = req.body.delID;
    var q = "UPDATE Orders SET userID = " + deliPersonID + " WHERE orderID = " + order;
    connection.query(q, function(err, results) {
        if(err) throw err;
        console.log("delivery person successfully appointed to this order");
    });
    res.redirect("/restaurant/" + restaurantName + "/manager");
});

// Fire Worker (some form with a fire button next to a worker)
app.post('/restaurant/:resName/manager/fire', function(req, res) {
    var restaurantName = req.params.resName;
    var workerID = req.body.workerID;
    var workerType = req.body.workerType; // "Cooks" or "DeliveryPerson"
    var q = "DELETE FROM " + workerType + " WHERE userID = " + workerID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        q = "DELETE FROM RegisteredAccts WHERE userID = " + workerID;
        connection.query(q, function(err, results) {
            if(err) throw err;
            q = "DELETE FROM Users WHERE userID = " + workerID;
            connection.query(q, function(err, results) {
                if(err) throw err;
                console.log("user successfully fired");
            });
        });
    });
    res.redirect("/restaurant/" + restaurantName + "/manager");
});


// Change wages of workers (currently have no wages attribute in any table), but an input form next to the worker
app.post('/restaurant/:resName/manager/changeWage', function(req, res) {
    var restaurantName = req.params.resName;
    var workerID = req.body.workerID;
    var workerType = req.body.workerType; // "Cook" or "DeliveryPerson"
    var newWage = req.body.wage;
    var q = "UPDATE '" + workerType + "' SET salery = " + newWage + " WHERE userID = " + workerID; // Query will not work b/c no attribute 'salery' exists yet
    connection.query(q, function(err, results) {
        if(err) throw err;
        console.log("salery successfully updated for " + workerID);
    });
    res.redirect("/restaurant/" + restaurantName + "/manager");
});

// Manage Complaints
app.post('/restaurant/:resName/manager/complaints', function(req,res){
    var restaurantName = req.params.resName;
    // var userID = req.body.userID;
    // var resID = req.body.restaurantID;
    var complaintID = req.body.complaintID;

    var q = "DELETE FROM Complaints WHERE ComplaintID =" + complaintID ;
    connection.query(q, function(err, results) {
        if(err) throw err;
        console.log("You deleted a complaint !");
    });
});

// Accept User request to join restaurant (accept/reject form)
// Currently Database is insufficient to handle this request
app.post('/restaurant/:resName/manager/changeUserStatus', function(req, res) {
    var restaurantName = req.params.resName;
    var restaurantID = req.body.redID;
    var userID = req.body.userID;
    var answer = req.body.answer;
    var q = "";
    if(answer === "yes") {
        var newClient = {
            userID: userID,
            restaurantID: restaurantID
        };
        connection.query("INSERT INTO Members SET ?", newClient, function(err, results) {
            if(err) throw err;
            q = "UPDATE Users SET status = 'Registered' WHERE userID =" + userID;
            connection.query(q, function(err, results) {
                if(err) throw err;
                console.log("request accepted");
            });
        });
        // Accept Query
    } else {
        // Decline Query
        q = "DELETE FROM PendingApps WHERE userID = "+ userID;
        connection.query(q, function(err, results) {
            if(err) throw err;
            console.log("request denied");
        });
    }
    res.redirect("/restaurant/" + restaurantName + "/manager");
});


app.get('*', function(req, res) {
    res.send("This is not a valid page on this website.")
});

// Setup port
app.listen(8080, function() {
    console.log("Server running on 8080");
});
