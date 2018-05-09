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
    userID: '0',
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


let restinfo = {
  restaurantID: ''
};
// Establish connection with database
let Manager = {
    userID: '',
    resID: '',
    resName: '',
    resAddress: '',
    pendingUsers: [],
    orders: [],
    complaints: []
};

let Cooks = {

};

let DeliveryPerson = {

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

app.get('/restaurant/:placeID', function(req, res) {
  var id = req.query.id;
  var q = "SELECT * FROM Restaurants WHERE googleID=" + id;
  console.log("hello from restaurant");
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

app.get('/currRest',function(req,res){
  console.log('RESTINFO: '+ JSON.stringify(restinfo));
  res.send(JSON.stringify(restinfo));
});

app.get('/restaurantInfo/:placeID', function(req,res){
    var placeID = req.params.placeID;
  console.log('request restaurantInfo ');
  var q = "select * from Restaurants where googleID = '" + placeID + "'";
  connection.query(q,function(err,data){
    if (err) return console.error("Restaurant Not Found" + err);
    restinfo = data[0];
    res.send(JSON.stringify(data[0]));
    console.log('restaurantInfo sent');
  });
});

app.get('/menuInfo/:placeID',function(req,res){
    var placeID = req.params.placeID;
  console.log('request menuInfo ');
  var q = "select * from Menu where googleID = '" + placeID + "'";
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

app.post('/placeorder', function(req,res){
  var user = req.body.user;
  var restID = req.body.restID;
  var items = JSON.parse(req.body.items);
  var q = "INSERT INTO Orders (userID,restaurantID,orderDate) values ("
          + user + "," + restID + ",now());";
  var orderid = null;
  var valuestr = null;
  console.log(q);
  connection.query(q, function(err,results){
    if(err) console.error('insert into orders: '+err);
    q = 'select last_insert_id() as id;'
    connection.query(q, function(err,results){
      orderid = results[0].id;
      var tupleArr = items.map(item=>{
        valuestr = "("+orderid+",'"+item.foodName+"',"+item.qty+")";
        return valuestr;
      });
      q = 'INSERT INTO FoodInOrder values '+tupleArr.join(',')+';';
      console.log(q);
      connection.query(q, function(err,results){
        if(err) console.error('insert into foodinorder: '+err);
        res.redirect('/processingorder')
      });
    });
  });
});

// check the crediental provided
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
            signedInUser.userID = results[0].userID;
            signedInUser.email = results[0].email;
            signedInUser.type = results[0].acctType;
            signedInUser.userID = results[0].userID;
            signedInUser.loggedIn = true;
            signedInUser.failed = false;
            Manager.userID = results[0].userID;
            console.log(signedInUser);
            var z = "SELECT * FROM Restaurants JOIN Managers ON Restaurants.restaurantID = Managers.restaurantID WHERE Managers.userID= " + signedInUser.userID;
            if(signedInUser.type === "Manager") {
                connection.query(z, function(err, results) {
                    if(err) throw err;
                    if(results[0]){
                        console.log(results);
                        Manager.resID = results[0].restaurantID;
                        Manager.resName = results[0].name;
                        Manager.resAddress = results[0].address;
                        console.log('the resID is ' + Manager.resID);
                        console.log('name of rest is: ' + Manager.resName);
                        console.log('address:' + Manager.resAddress);
                        res.redirect('/')
                    }
                });
            } else {
                res.redirect('/');
            }
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
    Manager.userID = '';
    Manager.resID = '';
    Manager.resName = '';
    Manager.resAddress = '';
    Manager.pendingUsers = [];
    Manager.orders = [];
    Manager.complaints = [];
    res.redirect('/');
});

//Cook section of the site.

app.get("/Account/Cook",function(req, res){

console.log("You made it to your section of the site! ")

    // if(signedInUser.type === "Cook"){
    //     var resName = res.params.resName;
    //     var currentMenuName = [];
    //     var currentMenuDesc = [];
    //     var currentMenuPrice =[];
    //     restaurantID = 0;
    //
    //     //retrieves the specific restaurantID using the restaurant name.
    //     var q = "SELECT restaurantID FROM Restaurants WHERE name = '" + resName+"'";
    //     connection.query(q, function(err, results) {
    //         if(err) throw err;
    //         var restaurantID = results[0].restaurantID;
    //
    //         //Adds all of the food in a the Menu array from the Menu database
    //         var k = "SELECT * FROM Menu WHERE restaurantID = " + restaurantID ;
    //
    //         connection.query(k, function(err, results) {
    //             if(err) throw err;
    //             for(var i = 0; i< results.length; i++){
    //             currentMenuName.push(results[i].foodName);
    //             currentMenuDesc.push(results[i].description);
    //             currentMenuPrice.push(results[i].price);
    //         }
    //
    //         });
    //     });
    // }
});

// Add the new button to the Menu
app.post("/Account/Cook/AddFood", function(req,res){
  var foodName = req.body.foodName;
  var description = req.body.foodDesc;
  var price = req.body.foodPrice;

  console.log(price);
  console.log(foodName);


//  Adds the new food item to the Menu table in the database.
var q = "SELECT * FROM Cooks WHERE userID =" + signedInUser.userID;
connection.query(q, function(err, results) {
    if(err) throw err;
    var restaurantID = results[0]['restaurantID']
    var Food = {
      restaurantID,
      foodName,
      description,
      price
    };

      connection.query("INSERT INTO Menu SET ?", Food, function(err, results) {
          if(err) throw err;
          console.log("It eorke");
      });

      res.redirect("/Account/Cook");

    });
});


//post request that removes food from menu.
app.post("/Account/Cook/RemoveFood",function(req,res){

    var foodName = req.body.foodName_2;

    //retrieves the specific restaurantID using the restaurant name.
    var q = "SELECT * FROM Cooks WHERE userID =" + signedInUser.userID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        var restaurantID = results[0].restaurantID;

        //Removes food from menu.
        var k = "DELETE FROM Menu WHERE restaurantID =" + restaurantID + " AND foodName = '" + foodName +"'";
        connection.query(k, function(err, results) {
            if(err) throw err;
        });
      res.redirect("/Account/Cook");
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
// app.post('/Account/Manager', function(req, res) {
//         console.log('hello from manager server');
//         console.log(Manager.userID);
//         var q = "SELECT * FROM Restaurants JOIN Managers ON Restaurants.restaurantID = Managers.restaurantID WHERE Managers.userID= " + Manager.userID;
//         connection.query(q, function(err, results) {
//             if(err) throw err;
//             if(results[0]){
//                 console.log(results);
//                 Manager.resID = results[0].restaurantID;
//                 Manager.resName = results[0].name;
//                 Manager.resAddress = results[0].address;
//                 console.log('the resID is ' + Manager.resID);
//                 console.log('name of rest is: ' + Manager.resName);
//                 console.log('address:' + Manager.resAddress);
//             }
//         });
// });


app.get('/Cooks', function(req, res) {
    console.log("Hello from cooks");
    console.log(Manager);
    console.log(signedInUser);
    console.log("the manager resID:" + Manager.resID);
    var q = 'SELECT Cooks.userID, Cooks.salery, CONCAT(f_name, " " , l_name) as name FROM Cooks JOIN RegisteredAccts ON Cooks.userID = RegisteredAccts.userID JOIN Restaurants ON Restaurants.restaurantID = Cooks.restaurantID WHERE Cooks.restaurantID =' + Manager.resID ;
    connection.query(q, function(err, results) {
        if(err) throw err;
        Cooks = results;
        console.log(Cooks);
        res.send(JSON.stringify(Cooks));
    });
});

app.get('/DeliveryPerson', function(req, res) {
    console.log("Hello from deliveryPerson");
    console.log(Manager);
    console.log(signedInUser);
    var q = 'SELECT DeliveryPerson.userID, DeliveryPerson.salery, CONCAT(f_name, " " , l_name) as name FROM DeliveryPerson JOIN RegisteredAccts ON DeliveryPerson.userID = RegisteredAccts.userID JOIN Restaurants ON Restaurants.restaurantID = DeliveryPerson.restaurantID WHERE DeliveryPerson.restaurantID =' + Manager.resID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        DeliveryPerson = results;
        console.log(DeliveryPerson);
        res.send(JSON.stringify(DeliveryPerson));
    });
});



//
// q = "SELECT * FROM Orders WHERE restaurantID = " + Manager.resID;
// connection.query(q, function(err, results) {
//     if(err) throw err;
//     if(results[0]) {
//         Managerorders.push(results); // orders[0][i].AnAttributeFromOrdersTableGoesHere
//     } else {
//         console.log("There are 0 orders for this restaurant at the moment");
//     }
// });
// // Pending Users
// q = "SELECT * FROM PendingApps";
// connection.query(q, function(err, results) {
//     if(err) throw err;
//     if(results[0]){
//         Manager.pendingUsers.push(results);
//     } else {
//         console.log('no pending');
//     }
// });
//
// // Show Complaints
// q = "SELECT * FROM Complaints WHERE restaurantID = " + Manager.resID;
// connection.query(q, function(err, results) {
//     if(err) throw err;
//     Manager.complaints.push(results);
//     res.send(JSON.stringify(Manager));
// });



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
