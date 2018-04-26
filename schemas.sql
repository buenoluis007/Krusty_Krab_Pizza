USE compose;

DROP TABLE Users;
CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
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
    status INT DEFAULT 1, /* 0 = blacklisted, 1 = regular, 2 = VIP */
    rateNum INT DEFAULT 0,
    rateSum DECIMAL DEFAULT 0.0,
    rating DECIMAL(18,1) DEFAULT 0.0, /* Decimal(18,1) Max number: 9,999,999,999,999,999.9 */
    FOREIGN KEY(userID) REFERENCES Users(id)
);

DROP TABLE PaymentInfo;
CREATE TABLE PaymentInfo(
    userID INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    creditNum INT NOT NULL,
    ccv INT NOT NULL,
    expiration DATE NOT NULL,
    FOREIGN KEY(userID) REFERENCES Users(id)
);

DROP TABLE Managers;
CREATE TABLE Managers(
    userID INT PRIMARY KEY,
    restaurantID INT,
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id)
);

DROP TABLE Cooks;
CREATE TABLE Cooks(
    userID INT,
    restaurantID INT,
    strikes INT DEFAULT 0,
    PRIMARY KEY(userID, restaurantID),
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id)
);

DROP TABLE DeliveryPerson;
CREATE TABLE DeliveryPerson(
    userID INT,
    restaurantID INT ,
    rateNum INT DEFAULT 0,
    rateSum DECIMAL(18, 1) DEFAULT 0.0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    PRIMARY KEY(userID, restaurantID),
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id)
);

DROP TABLE Restaurants;
CREATE TABLE Restaurants(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    address VARCHAR(255),
    phoneNum VARCHAR(15),
    rateNum INT DEFAULT 0,
    rateSum DECIMAL(18, 1) DEFAULT 0.0,
    rating DECIMAL(2,1) DEFAULT 0.0
);

DROP TABLE Menu;
CREATE TABLE Menu(
    restaurantID INT,
    food VARCHAR(255),
    price DECIMAL(4,2),
    description VARCHAR(500),
    rateNum INT,
    rateSum DECIMAL(18,1),
    rating DECIMAL(2,1),
    PRIMARY KEY(restaurantID, food),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id)
);

DROP TABLE Orders;
CREATE TABLE Orders(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userID INT, /*userID is 0 for guests, so no reference to userID table*/
    restaurantID INT,
    orderDate DATE,
    status INT DEFAULT 0, /*0 = pending order, 1 = filled order/pending delivery, 2 = delivered*/
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id)
);

-- Doesn't work
DROP TABLE FoodInOrder;
CREATE TABLE FoodInOrder(
    orderID INT,
    Menufood VARCHAR(255),
    PRIMARY KEY(orderID, Menufood),
    FOREIGN KEY(orderID) REFERENCES Orders(id),
    FOREIGN KEY(Menufood) REFERENCES Menu(food)
);

DROP TABLE Favorites;
CREATE TABLE Favorites(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userID INT,
    restaurantID INT,
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id)
);

-- Doesn't work
DROP TABLE FoodInFavorites;
CREATE TABLE FoodInFavorites(
    favoriteID INT,
    Menufood VARCHAR(255),
    -- PRIMARY KEY(favoriteID, Menufood),
    FOREIGN KEY(favoriteID) REFERENCES Favorites(id),
    FOREIGN KEY(Menufood) REFERENCES Menu(food)
);

-- Doesn't work
DROP TABLE Complaints;
CREATE TABLE Complaints(
    userID INT,
    restaurantID INT,
    Menufood VARCHAR(255),
    complaint VARCHAR(500),
    rating DECIMAL(2,1),
    -- PRIMARY KEY(userID, restaurantID, Menufood),
    FOREIGN KEY(userID) REFERENCES Users(id),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id),
    FOREIGN KEY(Menufood) REFERENCES Menu(food)
);
