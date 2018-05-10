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
    resID: '0',
    name: '',
    address: '',
    phoneNum: ''
};


let restinfo = {
  restaurantID: '0'
};

let Visitor = {};
let Pay = {};

let Manager = {
    userID: '',
    resID: '',
    resName: '',
    resAddress: '',
    orders: []
};

let Cooks = {

};

let DeliveryPerson = {

};

let Orders = {

};

let Pending = {

};

let Complaints ={

};

// Establish connection with database :)
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

app.get('/visitorInfo',function(req,res){
  let q = 'select * from RegisteredAccts where userID='+signedInUser.userID+';';
  connection.query(q, function(err,results){
    if(err) return console.error('VISITOR INFO: '+err);
    if (results[0]) Visitor = results[0];
    res.send(JSON.stringify(Visitor));
  });
});

app.get('/payInfo',function(req,res){
  let q = 'select * from PaymentInfo where userID='+signedInUser.userID+';';
  let data = {};
  connection.query(q, function(err,results){
    if(err) return console.error('PAYMENT INFO: '+err);
    if (results[0]) Pay = results[0];
    res.send(JSON.stringify(Pay));
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
/*
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
*/

// app.post('/checkRest', function(req, res) {
//     var id = req.body.linkbtn;
//     var q = "SELECT * FROM Restaurants WHERE restaurantID=" + id;
//     connection.query(q, function(err, results) {
//         if(err) throw err;
//         // console.log(results);
//         if(results[0]) {
//             restaurant.name = results[0].name;
//             restaurant.address = results[0].address;
//             restaurant.phoneNum = results[0].phoneNum;
//             console.log("ass" + restaurant);
//         }
//     });
// });

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
    if (data[0]) restinfo = data[0];
    res.send(JSON.stringify(restinfo));
    console.log('restaurantInfo: '+JSON.stringify(restinfo));
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

app.get('/memberStatus',function(req,res){
  var stat = '0';
  var q = "select status from Members where userID="+signedInUser.userID+" and restaurantID="+restinfo.restaurantID+";";
  console.log('S: '+signedInUser.userID+' R: '+restinfo.restaurantID);
  connection.query(q,function(err,data){
    console.log('MEMBERSTATUS: '+JSON.stringify(data));
    if (err) return console.log('MEMBER STATUS: '+err);
    if (data[0]){
      if (data[0].status === 0) stat = '1';
      else stat = '2';
    }
    console.log('MEMBERS RETURN: '+stat);
    res.send(stat);
  });
});

app.get('/getCooks',function(req,res){
  let q='select Cooks.userID,restaurantID,f_name,l_name from Cooks left join '
    +'RegisteredAccts on Cooks.userID=RegisteredAccts.userID where Cooks.restaurantID='
    +restinfo.restaurantID+';';
  connection.query(q,function(err,data){
    console.log('getCOOKS: '+JSON.stringify(data));
    if (err) return console.log('getCOOKS: '+err);
    res.send(JSON.stringify(data));
  })
});

app.post('/editprofile',function(req,res){
  let q = 'Replace into RegisteredAccts (userID,f_name,l_name,address,phoneNum) values('
    + signedInUser.userID +",'"+req.body.f_name+"','"+req.body.l_name+"','"+req.body.address+"','"+req.body.phoneNum+"');";
  let p = 'Replace into PaymentInfo (userID,name,creditNum,ccv,expiration) values('
    + signedInUser.userID +",'"+req.body.f_name+' '+req.body.l_name+"','"+req.body.cardnum+"','"+req.body.ccv+"','"+req.body.exp+"');";
  connection.query(q,function(err,data){
    if (err) return console.error('EDITACCT: '+err);
  });
  connection.query(p,function(err,data){
    console.log('QQQ: '+p);
    if (err) return console.error('EDITPAY: '+err);
  });
  res.redirect(req.get('referer'));
});

app.post('/apply',function(req,res){
  let userID = req.body.userID;
  let restID = req.body.restID;
  var q = "insert into PendingApps values ("+userID+","+restID+")";
  connection.query(q,function(err,results){
    if (err) return console.log('APPLY: '+err);
  });
  res.redirect(req.get('referer'));
});

app.post('/placeorder', function(req,res){
  var user = req.body.user;
  var restID = req.body.restID;
  var cookID = req.body.cookID;
  var items = JSON.parse(req.body.items);
  var receipt = JSON.parse(req.body.receipt);
  var q = "INSERT INTO Orders (userID,cookID,restaurantID,tax,discount,subtotal,total,orderDate) values ("
          + user + "," +cookID+","+ restID + "," +receipt.tax+"," +receipt.discount+"," +receipt.subtotal+"," +receipt.total+",now());";
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

app.get('/MenuCook/',function(req,res){

  console.log('request menuInfo ');
  var q = "SELECT * FROM Cooks WHERE userID =" + signedInUser.userID;
  connection.query(q,function(err,results){
      console.log(results[0]);


  var restID = results[0].restaurantID;
  console.log(restID);
  var q = "SELECT * FROM Restaurants WHERE restaurantID = " + restID;
  connection.query(q,function(err,results){


      var googleID = results[0].googleID;
      console.log(googleID);

      var q = "SELECT * FROM Menu WHERE googleID = '" + googleID + "'";
      connection.query(q,function(err,data){


        if (err) return console.error("Restaurant Not Found" + err);
        res.send(JSON.stringify(data));
        console.log('menuInfo sent');
        });
    });
   });
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

    var q = "SELECT * FROM Restaurants WHERE restaurantID =" + restaurantID;
    connection.query(q,function(err, results){
        if(err) throw err;

        var googleID = results[0].googleID;
        var Food = {
          googleID,
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






// MANAGER PAGE
app.get('/Account/Manager', function(req, res) {
        console.log('hello from manager server');
        console.log(Manager.userID);
        var q = "SELECT * FROM Restaurants JOIN Managers ON Restaurants.restaurantID = Managers.restaurantID WHERE Managers.userID= " + Manager.userID;
        connection.query(q, function(err, results) {
            if(err) throw err;
            if(results[0]){
                console.log(results);
                Manager.resID = results[0].restaurantID;
                Manager.resName = results[0].name;
                Manager.resAddress = results[0].address;
                console.log('the resID is ' + Manager.resID);
                console.log('name of rest is: ' + Manager.resName);
                console.log('address:' + Manager.resAddress);
            }
            res.send(JSON.stringify(Manager));
        });
});

// get the cooks at a specific restaurant
app.get('/Cooks', function(req, res) {
    console.log("Hello from cooks");
    console.log(Manager);
    console.log(signedInUser);
    console.log("the manager resID:" + Manager.resID);
    var q = 'SELECT Cooks.userID, Cooks.salery, Cooks.strikes, CONCAT(f_name, " " , l_name) as name FROM Cooks JOIN RegisteredAccts ON Cooks.userID = RegisteredAccts.userID JOIN Restaurants ON Restaurants.restaurantID = Cooks.restaurantID WHERE Cooks.restaurantID =' + Manager.resID ;
    connection.query(q, function(err, results) {
        if(err) throw err;
        Cooks = results;
        console.log(Cooks);
        res.send(JSON.stringify(Cooks));
    });
});

// get the delivery people at a specific restaurant
app.get('/DeliveryPerson', function(req, res) {
    console.log("Hello from deliveryPerson");
    console.log(Manager);
    console.log(signedInUser);
    var q = 'SELECT DeliveryPerson.userID, DeliveryPerson.salery, DeliveryPerson.rating, CONCAT(f_name, " " , l_name) as name FROM DeliveryPerson JOIN RegisteredAccts ON DeliveryPerson.userID = RegisteredAccts.userID JOIN Restaurants ON Restaurants.restaurantID = DeliveryPerson.restaurantID WHERE DeliveryPerson.restaurantID =' + Manager.resID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        DeliveryPerson = results;
        console.log(DeliveryPerson);
        res.send(JSON.stringify(DeliveryPerson));
    });
});

// Pending Apps for a specific restaurant
app.get('/pendingUsers', function(req, res) {
    var q = "SELECT PendingApps.userID, PendingApps.restaurantID, CONCAT(f_name, ' ', l_name) AS name FROM PendingApps JOIN RegisteredAccts ON PendingApps.userID = RegisteredAccts.userID WHERE restaurantID= " + Manager.resID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        Pending = results;
        console.log(results);
        res.send(JSON.stringify(Pending));
    });
})

// Show Complaints
app.get('/Complaints', function(req, res) {
    q = "SELECT complaintID, CONCAT(f_name, ' ', l_name) AS name, complaint, rating, foodName FROM Complaints JOIN RegisteredAccts ON Complaints.userID = RegisteredAccts.userID WHERE Complaints.restaurantID = " + Manager.resID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        Complaints = results;
        res.send(JSON.stringify(Complaints));
        console.log(Complaints);
    });
});

// Manage Complaints
app.post('/removeComplaint', function(req,res){
    var complaintID = req.body.complaintID;

    var q = "DELETE FROM Complaints WHERE ComplaintID =" + complaintID ;
    connection.query(q, function(err, results) {
        if(err) throw err;
        console.log("You deleted a complaint !");
    });
    res.redirect("/Account/Manager");
});


// View orders that are ready to be deliver
// app.get('/Orders', function(res, req) {
//     var q = "SELECT * FROM Orders JOIN FoodInOrder ON Orders.orderID = FoodInOrder.orderID WHERE Orders.restaurantID =" + Manager.resID;
//     connection.query(q, function(err, results) {
//         if(err) throw err;
//         Orders = results;
//         console.log(Orders);
//         res.send(JSON.stringify(Orders));
//     });
//     res.redirect("/Account/Manager");
// });


// Apoint Devlivery Person to an order
// Some form that you can appoint a delivery person to an order (a drop down can appear for the orders next to a delivery person)
app.post('/restaurant/:resName/manager/delivery', function(req, res) {
    var order = req.body.orderID;
    var deliPersonID = req.body.delID;
    var q = "UPDATE Orders SET userID = " + deliPersonID + " WHERE orderID = " + order;
    connection.query(q, function(err, results) {
        if(err) throw err;
        console.log("delivery person successfully appointed to this order");
    });
    res.redirect("/restaurant/" + restaurantName + "/manager");
});

// Fire Worker
app.post('/manager/fire', function(req, res) {
    var workerID = req.body.fire;
    console.log(workerID);
    var q = "SELECT acctType FROM Users WHERE userID = " + workerID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        var workerType = results[0].acctType; // "Cooks" or "DeliveryPerson"
        console.log(workerType)
        if(workerType === "Cook") {
            workerType = "Cooks";
        } else {
            workerType = "DeliveryPerson";
        }
        q = "DELETE FROM " + workerType + " WHERE userID = " + workerID; // Delete from Worker Table
        connection.query(q, function(err, results) {
            if(err) throw err;
            q = "UPDATE Users SET acctType='Visitor' WHERE userID = " + workerID;
            connection.query(q, function(err, results) {
                if(err) throw err;
                console.log("user fired");
            });
        });
    })
    res.redirect("/Account/Manager");
});


// Change wages of workers
app.post('/manager/changeWage', function(req, res) {
    var workerID = req.body.workerID;
    var newWage = req.body.salary;
    console.log(workerID);
    var q = "SELECT acctType FROM Users WHERE userID = " + workerID;
    connection.query(q, function(err, results) {
        if(err) throw err;
        var workerType = results[0].acctType; // "Cooks" or "DeliveryPerson"
        console.log(workerType)
        if(workerType === "Cook") {
            workerType = "Cooks";
        } else {
            workerType = "DeliveryPerson";
        }
        q = "UPDATE " + workerType + " SET salery =" + newWage + "   WHERE userID = " + workerID; // Delete from Worker Table
        connection.query(q, function(err, results) {
            if(err) throw err;
            console.log("salary updated");
        });
    });
    res.redirect("/Account/Manager");
});


// Accept User request to join restaurant (accept/reject form)
app.post('/Manager/changeUserStatus', function(req, res) {
    var userID = req.body.userID;
    var choice = req.body.choice;
    var q = "";
    if(choice === "accept") {
        var newClient = {
            userID: userID,
            restaurantID: Manager.resID
        };
        connection.query("INSERT INTO Members SET ?", newClient, function(err, results) {
            if(err) throw err;
            q = "UPDATE Users SET acctType = 'Registered' WHERE userID =" + userID;
            connection.query(q, function(err, results) {
                if(err) throw err;
                console.log("request accepted");
            });
            q = "DELETE FROM PendingApps WHERE userID = "+ userID;
            connection.query(q, function(err, results) {
                console.log('good');
            });
        });
        // Accept Query
    } else {
        // Decline Query
        q = "DELETE FROM PendingApps WHERE userID = "+ userID;
        connection.query(q, function(err, results) {
            if(err) throw err;
            q = "UPDATE Users SET acctType = 'Visitor' WHERE userID = " + userID;
            connection.query(q, function(err, results) {
                if(err) throw err;
                console.log("request denied");
            });
        });
    }
    res.redirect("/Account/Manager");
});


app.get('*', function(req, res) {
    res.send("This is not a valid page on this website.")
});

// Setup port
app.listen(8080, function() {
    console.log("Server running on 8080");
});
