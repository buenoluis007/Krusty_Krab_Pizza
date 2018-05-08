DROP TABLE Cooks;
DROP TABLE DeliveryPerson;
DROP TABLE Managers;
DROP TABLE FoodInOrder;
DROP TABLE FoodInFavorites;
DROP TABLE PaymentInfo;
DROP TABLE Orders;
DROP TABLE Favorites;
DROP TABLE Complaints;
DROP TABLE Menu;
DROP TABLE Restaurants;
DROP TABLE RegisteredAccts;
DROP TABLE Users;

CREATE TABLE Users(
    userID INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(16) NOT NULL,
    acctType VARCHAR(20) DEFAULT 'Regular'
);

CREATE TABLE RegisteredAccts(
    userID INT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    status INT DEFAULT 1, /*0 = blacklisted, 1 = regular, 2 = VIP*/
    rateNum INT DEFAULT 0,
    rateSum DECIMAL DEFAULT 0.0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    FOREIGN KEY(userID) REFERENCES Users(userID)
);

CREATE TABLE PaymentInfo(
    userID INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    creditNum INT NOT NULL,
    ccv INT NOT NULL,
    expiration DATE NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(userID)
);

CREATE TABLE Restaurants(
    restaurantID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    address VARCHAR(255),
    phoneNum VARCHAR(15),
    rateNum INT DEFAULT 0,
    rateSum DECIMAL DEFAULT 0.0,
    rating DECIMAL(2,1) DEFAULT 0.0
);

CREATE TABLE Managers(
    userID INT PRIMARY KEY,
    restaurantID INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

CREATE TABLE Cooks(
    userID INT PRIMARY KEY,
    restaurantID INT ,
    strikes INT DEFAULT 0,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

CREATE TABLE DeliveryPerson(
    userID INT PRIMARY KEY,
    restaurantID INT ,
    rateNum INT DEFAULT 0,
    rateSum DECIMAL DEFAULT 0.0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

CREATE TABLE Menu(
    restaurantID INT,
    foodName VARCHAR(255),
    price DECIMAL(4,2),
    description VARCHAR(500),
    rateNum INT,
    rateSum DECIMAL(2,1),
    rating DECIMAL(2,1),
    PRIMARY KEY(foodName, restaurantID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

CREATE TABLE Orders(
    orderID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT, /*userID is 0 for guests, so no reference to userID table*/
    restaurantID INT,
    orderDate DATE,
    status INT DEFAULT 0, /*0 = pending order, 1 = filled order/pending delivery, 2 = delivered*/
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

CREATE TABLE FoodInOrder(
    orderID INT,
    foodName VARCHAR(255),
    qty INT,
    PRIMARY KEY(orderID, foodName),
    FOREIGN KEY(orderID) REFERENCES Orders(orderID),
    FOREIGN KEY(foodName) REFERENCES Menu(foodName)
);

CREATE TABLE Favorites(
    favoriteID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    restaurantID INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

CREATE TABLE FoodInFavorites(
    favoriteID INT,
    foodName VARCHAR(255),
    qty INT,
    PRIMARY KEY(favoriteID, foodName),
    FOREIGN KEY(favoriteID) REFERENCES Favorites(favoriteID),
    FOREIGN KEY(foodName) REFERENCES Menu(foodName)
);

CREATE TABLE Complaints(
    complaintID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    restaurantID INT,
    foodName VARCHAR(255),
    complaint VARCHAR(500),
    rating DECIMAL(2,1),
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID),
    FOREIGN KEY(foodName) REFERENCES Menu(foodName)
);




SELECT Cooks.userID FROM Cooks JOIN RegisteredAccts ON Cooks.userID = RegisteredAccts.userID JOIN Restaurants ON Restaurants.restaurantID = Cooks.restaurantID WHERE Cooks.restaurantID = 8;

SELECT Cooks.userID, Cooks.salery, CONCAT(f_name, " ", l_name) AS name FROM DeliveryPerson JOIN Users ON DeliveryPerson.userID = Users.userID JOIN RegisteredAccts ON Users.userID = RegisteredAccts.userID WHERE Cooks.restaurantID =
