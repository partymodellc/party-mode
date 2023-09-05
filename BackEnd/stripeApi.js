//const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

/* Customers API in stripe*/

const createCustomer = (user_id,ticketName,username,email,price,quantity,ticketImg,eventName) => {
 return stripe.customers.create({

 "id": user._id,
  "object": "customer",
  "address": null,
  "currency": "usd",
  "description": "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
  "discount": null,
  "email": "test@test.com", 	
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


const deleteCustomer = (userId) => {
 await stripe.customers.del(userId);

}

const listCustomers = ()=> {
 await stripe.customers.list({
  limit: 3,
});
}

const searchCustomers = (email) => {
	await stripe.customers.search({
  query: email
  });
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

/* End of Customers API in stripe*/

/*Payment Intent API in stripe*/
const createPaymentIntent = (amount,currency,payment_method) => {
  await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  automatic_payment_methods: {enabled: true},
});

}

const retrievePaymentIntent = (payment_id) => {
	await stripe.paymentIntents.retrieve(payment_id);
}

const updatePaymentIntent = (payment_id,ticketName) => {
	 await stripe.paymentIntents.update(
  payment_id,
  {metadata: {order_id: ticketName}}
);
}

const confirmPaymentIntent = (payment_id) => {
	await stripe.paymentIntents.confirm(
  payment_id,
  {payment_method: 'pm_card_visa'}
);
}

const cancelPaymentIntent= (payment_id) => {
	 await stripe.paymentIntents.cancel(payment_id);
}

/*End of Payment Intent API in stripe.*/


/*Payment Method API in stripe*/
const createPayment = () =>{
	 await stripe.paymentMethods.create({
  type: 'card',
  card: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2034,
    cvc: '314',
  },
});
}

const retrievePayment = (paymeth_id) => {
	await stripe.paymentMethods.retrieve(paymeth_id);
}

const retrieveCustomersPayment = (user_id,paymeth_id) => {
	await stripe.customers.retrievePaymentMethod(user_id,paymeth_id);
}

const updatePayment = (paymeth_id) => {
	await stripe.paymentMethods.update(
   paymeth_id,
   {metadata: {order_id: '6735'}}
   );
}

const listPaymentMethods = (user_id) => {
	 await stripe.paymentMethods.list({
  customer: user_id,
  type: 'card',
});
}

const listCustomersPaymentMethod = (user_id) => {
	await stripe.customers.listPaymentMethods(
  user_id,
  {type: 'card'}
);
}

const attachPaymentToCustomer= (user_id) => {
	await stripe.customers.listPaymentMethods(
  user_id,
  {type: 'card'}
);
}

const attachPaymentToCustomer = (paymeth_id) => {
	await stripe.customers.listPaymentMethods(
  paymeth_id,
  {customer: 'cus_9s6XKzkNRiz8i3'});
}


const detachPaymentFromCustomer = (paymeth_id) =>{
await stripe.paymentMethods.detach(
  paymeth_id
);
}

/*End of Payment Method API in stripe*/

/*Refund API in stripe*/
const createRefund = () => {
	await stripe.refunds.create({
  charge: 'ch_1Nl7u02eZvKYlo2CtGgiKr63'
});
}

const retrieveRefund = (ref_id) => {
	stripe.refunds.retrieve(ref_id);
}

const updateRefund = (ref_id) => {
	await stripe.refunds.update(
  ref_id,
  {metadata: {order_id: '6735'}}
);

}

const cancelRefund = (ref_id) => {
	stripe.refunds.cancel(ref_id);
}

const listRefund = () => {
	await stripe.refunds.list({
    limit: 3,
     });

}
/*End of Refund API in stripe*/


/*Bank Account API in stripe*/
const createAcct = (user_id,acct_id) => {
	stripe.customers.createSource(
  user_id,
  {source: acct_id}
);

}

const retrieveAcct = (user_id,acct_id) => {
	stripe.customers.createSource(
  user_id,
  {source: acct_id}
);

}

const updateAcct = (user_id) => {
	stripe.customers.updateSource(
  user_id,
  'ba_1NmOBY2eZvKYlo2CjWvTQlk4',
  {metadata: {order_id: '6735'}}
);
}

const verifyAcct = (user_id) => {
	stripe.customers.verifySource(
  user_id,
  'ba_1NmOBY2eZvKYlo2CjWvTQlk4',
  {amounts: [32, 45]}
);
}

const deleteAcct = (user_id) => {
	 stripe.customers.deleteSource(
  user_id,
  'ba_1NmOBY2eZvKYlo2CjWvTQlk4'
);

}

const listAcct = (user_id) => {
	stripe.customers.listSources(
  user_id,
  {object: 'bank_account', limit: 3}
);
}

/*End of Bank Account API in stripe*/

/*Create Product API in stripe*/
const createProduct = () =>  {
	stripe.products.create({
  name: 'Gold Special',
   });
}

const retrieveProduct = (prod_id) => {
	stripe.products.retrieve(prod_id);
}

const updateProduct = () => {
	 stripe.products.update(
   prod_id,
  {metadata: {order_id: '6735'}}
);
}

const listProduct = () => {
	 stripe.products.list({
  limit: 3,
});
}

const deleteProduct = () => {
	stripe.products.del(prod_id)
}

const searchProduct = (prod_name) => {
	stripe.products.search({
  query: prod_name,
});
}
/*End of Create Product API in stripe*/

/*Prices API in stripe*/
const createPrice = (amount,prod_id) => {
	stripe.prices.create({
  unit_amount: amount,
  currency: 'usd',
  recurring: {interval: 'month'},
  product: prod_id,
});

}

const retrievePrice = (price_id) => {
	 stripe.prices.retrieve(price_id);
}
const updatePrice = () => {
stripe.prices.update(
  price_id,
  {metadata: {order_id: '6735'}}
);


}
const listPrice = () => {
stripe.prices.list({
  limit: 3,
});

}
const searchPrice = () => {
 stripe.prices.search({
  query: 'active:\'true\' AND metadata[\'order_id\']:\'6735\'',
});


}
/*End of prices API in stripe*/

/*End of Checkout Session API in stripe*/
const createSession = (success_url,cancel_url,price,quantity,payment_mode) => {
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

const expireSession = (session_id) => {
stripe.checkout.sessions.expire(session_id);
}

const retrieveSession = () => {
stripe.checkout.sessions.retrieve(session_id);
}

const listSession = () => {
	 stripe.checkout.sessions.list({
  limit: 3,
});
}

/*End of Checkout Session API in stripe*/
module.exports = {createCustomer,retrieveCustomer,
	deleteCustomer,listCustomers,searchCustomers,updateCustomer,
createPaymentIntent,retrievePaymentIntent,updatePaymentIntent,confirmPaymentIntent,cancelPaymentIntent,
createPayment,retrievePayment,retrieveCustomersPayment,updatePayment,listPaymentMethods,listCustomersPaymentMethod,
detachPaymentFromCustomer}; 

/*
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
*/
