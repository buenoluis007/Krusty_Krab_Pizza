USE compose;

CREATE TABLE Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(16) NOT NULL,
    acctType VARCHAR(20) DEFAULT 'Regular'
);

CREATE TABLE RegisteredAccts(
    userID INT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    vip_status BOOLEAN,
    rating DECIMAL(2,1),
    FOREIGN KEY(userID) REFERENCES Users(id)
);

CREATE TABLE PaymentInfo(
    userID INT PRIMARY KEY,
    creditNum INT,
    ccv INT,
    experation DATETIME,
    FOREIGN KEY(userID) REFERENCES Users(id)
);

-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-- Anything below this comment is questionable/ looks complicated to work with and should probably be changed
-- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

CREATE TABLE Managers(
    userID INT PRIMARY KEY,
    restaurantID INT,
    FOREIGN KEY(userID) REFERENCES Users(id)
);

CREATE TABLE Restaurants(
    id INT PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(255),
    name VARCHAR(255),
    rating DECIMAL(2,1),
    telephoneNum INT
);

CREATE TABLE Menu(
    restaurantID INT PRIMARY KEY,
    foodID INT,
    price DECIMAL(4,2),
    FOREIGN KEY(restaurantID) REFERENCES Restaurants(id),
    FOREIGN KEY(foodID) REFERENCES Food(id),
);

CREATE TABLE Food(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE Cook(
    userID INT REFERENCES Users(id),
    restID INT REFERENCES Restaurants(id),
    stikes INT DEFAULT 0
);

CREATE TABLE Favorites(
    id INT PRIMARY KEY,
    userID INT REFERENCES Users(id),
    restID INT REFERENCES Restaurants(id)
);

CREATE TABLE FoodInFavorites(
    id INT,
    foodID INT,
    FOREIGN KEY(foodID) REFERENCES Food(id)
);

CREATE TABLE CurrentOrders(
    id INT PRIMARY KEY AUTO_INCREMENT,
    foodID INT REFERENCES Food(id)
);
