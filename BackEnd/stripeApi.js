const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const createCustomer = (user_id,ticketName,username,email,price,quantity,ticketImg,eventName) => {
 return stripe.customers.create({
"metadata" : {
	"userId" : user._id,
	"ticketName" : ticketName,
	"username" : username,
	"email": email,
	"price": price,
	"quantity" : qunatity,
	"ticketImg" : ticketImg,
	"eventName" : eventName
}
});

}

const retrieveCustomer = (userId) => {
	return stripe.customers.retrieve(userId);
}

const updateCustomer = (userId,ticketName,username,email,price,quantity,ticketImg,eventName) => {
  return stripe.customers.update(userId, {
    metadata : {
	"ticketName" : ticketName,
	"username" : username,
	"email": email,
	"price": price,
	"quantity" : quantity,
	"ticketImg" : ticketImg,
	"eventName" : eventName
}

  }
);
}

const checkoutSession = (success_url,cancel_url,price,quantity,payment_mode) => {
	return stripe.checkout.sessions.create({
  "success_url" : success_url,
  "cancel_url" : cancel_url,
  line_items: [
    {"price": price,
     "quantity": quantity
    }
  ],
  mode: payment_mode,
});
}


module.exports = {createCustomer,retrieveCustomer,updateCustomer,checkoutSession}; 