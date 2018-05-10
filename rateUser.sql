/*
--rateUser() will call updateStatus() at the end
--you can also call updateStatus() on its own if needed
--Use procedure with these queries:

call rateUser(userID,restaurantID,rating);
call rateDelivery(userID,rating);
call rateRestaurant(restaurantID,rating);
call rateFood(foodName,restaurantID,rating);

call updateStatus(userID,restaurantID);
*/


DELIMITER //
DROP PROCEDURE IF EXISTS updateStatus //
create procedure updateStatus(IN useid int, IN restid int)

BEGIN
  declare rate decimal(2,1);
  declare amount int;

  SELECT rating, rateNum into rate, amount
    FROM Members WHERE userID=useid and restaurantID=restid;

  if (amount > 3) THEN
    if (rate > 4.0) THEN
      UPDATE Members SET status = 1
        WHERE userID=useid and restaurantID=restid;
    ELSEIF (rate > 1.0) THEN
      UPDATE Members SET status = 0
        WHERE userID=useid and restaurantID=restid;
    else
      DELETE FROM Members
        WHERE userID=useid and restaurantID=restid;
      UPDATE RegisteredAccts SET status = 0
        WHERE userID=useid;
    end if;
  end if;

END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS rateUser //
create procedure rateUser(IN useid int, IN restid int, IN rating int)

BEGIN
  declare rnum int;
  declare rsum decimal;

  UPDATE Members SET rateSum=(rateSum + rating),rateNum=(rateNum + 1)
    WHERE userID = useid and restaurantID = restid;

  SELECT rateSum,rateNum into rsum,rnum
    FROM Members WHERE userID = useid and restaurantID = restid;

  UPDATE Members SET rating = (rsum/rnum)
    WHERE userID = useid and restaurantID = restid;

  CALL updateStatus(useid,restid);

END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS rateDelivery //
create procedure rateDelivery(IN useid int, IN rating int)

BEGIN
  declare rnum int;
  declare rsum decimal;

  UPDATE DeliveryPerson SET rateSum=(rateSum + rating), rateNum=(rateNum + 1)
    WHERE userID=useid;

  SELECT rateSum, rateNum into rsum,rnum
    FROM DeliveryPerson WHERE userID=useid;

  UPDATE DeliveryPerson SET rating = (rsum/rnum)
    WHERE userID=useid;
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS rateRestaurant //
create procedure rateRestaurant(IN restid int, IN rating int)

BEGIN
  declare rnum int;
  declare rsum decimal;

  UPDATE Restaurants SET rateSum=(rateSum + rating), rateNum=(rateNum + 1)
    WHERE restaurantID=restid;

  SELECT rateSum, rateNum into rsum,rnum
    FROM Restaurants WHERE restaurantID=restid;

  UPDATE Restaurants SET rating = (rsum/rnum)
    WHERE restaurantID=restid;
END //
DELIMITER ;


DELIMITER //
DROP PROCEDURE IF EXISTS rateFood //
create procedure rateFood(IN food varchar(255), IN restid int, IN rating int)

BEGIN
  declare rnum int;
  declare rsum decimal;

  UPDATE Menu SET rateSum=(rateSum + rating), rateNum=(rateNum + 1)
    WHERE foodName=food and restaurantID=restid;

  SELECT rateSum, rateNum into rsum,rnum
    FROM Menu WHERE foodName=food and restaurantID=restid;

  UPDATE Menu SET rating = (rsum/rnum)
    WHERE foodName=food and restaurantID=restid;
END //
DELIMITER ;
