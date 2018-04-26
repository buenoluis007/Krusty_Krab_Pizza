USE compose;

DROP TABLE Users;
CREATE TABLE Users(
    userID INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(16) NOT NULL,
    acctType VARCHAR(20) DEFAULT 'Regular'
);

DROP TABLE RegisteredAccts;
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

DROP TABLE PaymentInfo;
CREATE TABLE PaymentInfo(
    userID INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    creditNum INT NOT NULL,
    ccv INT NOT NULL,
    expiration DATE NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(userID)
);

DROP TABLE Managers;
CREATE TABLE Managers(
    userID INT PRIMARY KEY,
    restaurantID INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

DROP TABLE Cooks;
CREATE TABLE Cooks(
    userID INT,
    restaurantID INT ,
    strikes INT DEFAULT 0,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

DROP TABLE DeliveryPerson;
CREATE TABLE DeliveryPerson(
    userID INT,
    restaurantID INT ,
    rateNum INT DEFAULT 0,
    rateSum DECIMAL DEFAULT 0.0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

DROP TABLE Restaurants;
CREATE TABLE Restaurants(
    restaurantID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    address VARCHAR(255),
    phoneNum VARCHAR(15),
    rateNum INT DEFAULT 0,
    rateSum DECIMAL DEFAULT 0.0,
    rating DECIMAL(2,1) DEFAULT 0.0
);

DROP TABLE Menu;
CREATE TABLE Menu(
    restaurantID INT PRIMARY KEY,
    foodName VARCHAR(255) PRIMARY KEY,
    price DECIMAL(4,2),
    description VARCHAR(500),
    rateNum INT,
    rateSum DECIMAL(2,1),
    rating DECIMAL(2,1),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

DROP TABLE Orders;
CREATE TABLE Orders(
    orderID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT, /*userID is 0 for guests, so no reference to userID table*/
    restaurantID INT,
    orderDate DATE,
    status INT DEFAULT 0, /*0 = pending order, 1 = filled order/pending delivery, 2 = delivered*/
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

DROP TABLE FoodInOrder;
CREATE TABLE FoodInOrder(
    orderID INT PRIMARY KEY,
    foodName VARCHAR(255) PRIMARY KEY,
    qty INT,
    FOREIGN KEY(orderID) REFERENCES Orders(orderID),
    FOREIGN KEY(foodName) REFERENCES Menu(foodName)
);

DROP TABLE Favorites;
CREATE TABLE Favorites(
    favoriteID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    restaurantID INT,
    FOREIGN KEY(userID) REFERENCES Users(userID),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(restaurantID)
);

DROP TABLE FoodInFavorites;
CREATE TABLE FoodInFavorites(
    favoriteID INT PRIMARY KEY,
    foodName VARCHAR(255) PRIMARY KEY,
    qty INT,
    FOREIGN KEY(favoriteID) REFERENCES Favorites(favoriteID),
    FOREIGN KEY(foodName) REFERENCES Menu(foodName)
);

DROP TABLE Complaints;
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
