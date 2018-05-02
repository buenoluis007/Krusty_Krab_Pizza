-- Stuff needed for google maps

ALTER TABLE Restaurants
ADD COLUMN longitude VARCHAR(15) AFTER address;

ALTER TABLE Restaurants
ADD COLUMN latitude VARCHAR(15) AFTER longitude;

ALTER TABLE Restaurants
ADD COLUMN googleID VARCHAR(100) AFTER latitude;
