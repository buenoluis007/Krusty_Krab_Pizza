var cart = function(){
  var discountpct = 0.0;
  var discount = 0.0;
  var subtotal = 0.0;
  var taxpct = 0.08875;
  var tax = 0.0;
  var total = 0.0;
  var restaurantID = null;
  var restaurantName = "";
  var items = [];

  this.getReceipt = function(){
    return {'restaurantName':restaurantName,
                   'items':items,
                   'subtotal':subtotal,
                   'discountpct':discountpct,
                   'discount':discount,
                   'taxpct':taxpct,
                   'tax':tax,
                   'total':total};
  }

  this.getItems = function(){
    return items;
  };

  this.getDiscount = function(){
    return discount;
  };

  this.getSubtotal = function(){
    return subtotal;
  };

  this.getTotal = function(){
    return total;
  };

  this.addItem = function(foodName,qty,price){
    if (items.find(i => i.foodName === foodName)){
      return;
    }
    else{
      items.push({'foodName':foodName,
                'qty': qty,
                'price': price});
    }
  };

  this.removeItem = function(i){
    items.splice(i,1);
  };

  this.clearCart = function(){
    items.splice(i,1);
  };

  this.updateQty = function(i, qty){
    items[i].qty = qty;
  };

  this.increaseQty = function(i){
    items[i].qty += 1;
  };

  this.decreaseQty = function(i){
    items[i].qty -= 1;
  };

  this.updatePrice = function(discountpct=0){
    var sum = 0.0
    items.forEach(function(food){
      sum += food.price * food.qty;
    });
    discount = discountpct * sum;
    subtotal = sum - discount;
    tax = subtotal * taxpct;
    total = subtotal + tax;
  }
}

module.exports = cart;
