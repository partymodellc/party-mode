const stripe = require(config.stripe.apikey);

/* Customers for stripe*/

const createCustomer = (cust_id,user_id,ticketName,username,email,price,quantity,ticketImg,eventName) => {
return await stripe.customers.create({

 "id": cust_id, 	
  "metadata" : {
	"userId" : user_id,
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

const retrieveCustomer = (user_id) => {
	returnrawait stripe.customers.retrieve(user_id);
}


const deleteCustomer = (user_id) => {
return await stripe.customers.del(user_id);

}

const listCustomers = (list_num)=> {
return await stripe.customers.list({
  limit:list_num,
});
}

const searchCustomers = (email) => {
return	await stripe.customers.search({
  query: email
  });
}

const updateCustomer = (userId,ticketName,username,email,price,quantity,ticketImg,eventName) => {
  return await stripe.customers.update(userId, {
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

/* End of Customers for stripe*/

/*Payment Intent for stripe*/
const createPaymentIntent = (pay_amount,pay_currency,auth_meth) => {
 return await stripe.paymentIntents.create({
  amount: pay_amount,
  currency: pay_currency,
  automatic_payment_methods: {enabled: auth_meth},
});

}

const retrievePaymentIntent = (payment_id) => {
return	await stripe.paymentIntents.retrieve(payment_id);
}

const updatePaymentIntent = (payment_id,ticketName) => {
	return await stripe.paymentIntents.update(
  payment_id,
  {metadata: {order_id: ticketName}}
);
}

const confirmPaymentIntent = (payment_id,payment_mode) => {
return	await stripe.paymentIntents.confirm(
  payment_id,
  {payment_method: payment_mode}
);
}

const cancelPaymentIntent= (payment_id) => {
	return await stripe.paymentIntents.cancel(payment_id);
}

/*End of Payment Intent for stripe.*/
 

/*Payment Method for stripe*/
const createPayment = (crd_num,crd_exp_mth,crd_exp_yr,crd_cvc) =>{
	return await stripe.paymentMethods.create({
  type: 'card',
  card: {
    number: crd_num,
    exp_month: crd_exp_mth,
    exp_year:crd_exp_yr,
    cvc: crd_cvc,
  },
});
}

const retrievePayment = (paymeth_id) => {
return	await stripe.paymentMethods.retrieve(paymeth_id);
}

const retrieveCustomersPayment = (user_id,paymeth_id) => {
return	await stripe.customers.retrievePaymentMethod(user_id,paymeth_id);
}

const updatePayment = (paymeth_id,order_id) => {
return	await stripe.paymentMethods.update(
   paymeth_id,
   {metadata: {order_id: order_id}}
   );
}

const listPaymentMethods = (user_id,pay_type) => {
	return await stripe.paymentMethods.list({
  customer: user_id,
  type: pay_type,
});
}

const listCustomersPaymentMethod = (user_id,pay_type) => {
return	await stripe.customers.listPaymentMethods(
  user_id,
  {type: pay_type}
);
}

const attachPaymentToCustomer= (user_id,pay_type) => {
return	await stripe.customers.listPaymentMethods(
  user_id,
  {type: pay_type}
);
}

const attachPaymentToCustomer = (paymeth_id,cus_id) => {
return	await stripe.customers.listPaymentMethods(
  paymeth_id,
  {customer: cus_id});
}


const detachPaymentFromCustomer = (paymeth_id) =>{return
await stripe.paymentMethods.detach(
  paymeth_id
);
}

/*End of Payment Method for stripe*/

/*Refund for stripe*/
const createRefund = (ref_id) => {
return	await stripe.refunds.create({
  charge: ref_id
});
}

const retrieveRefund = (ref_id) => {
	return await	stripe.refunds.retrieve(ref_id);
}

const updateRefund = (ref_id,order_id) => {
return	await stripe.refunds.update(
  ref_id,
  {metadata: {order_id: order_id}}
);

}

const cancelRefund = (ref_id) => {
	return await	stripe.refunds.cancel(ref_id);
}

const listRefund = (list_num) => {
return	await stripe.refunds.list({
    limit:list_num,
     });

}
/*End of Refund for stripe*/



/*Bank Account for stripe*/
const createAcct = (user_id,acct_id) => {
	return await stripe.customers.createSource(
  user_id,
  {source: acct_id}
);

}

const retrieveAcct = (user_id,acct_id) => {
	return await	stripe.customers.createSource(
  user_id,
  {source: acct_id}
);

}

const updateAcct = (user_id,update_id,order_id) => {
	return await	stripe.customers.updateSource(
  user_id,
  update_id,
  {metadata: {order_id: order_id}}
);
}

const verifyAcct = (user_id,del_id,amt) => {
	return await	stripe.customers.verifySource( user_id,del_id, {amounts: [amt]});
}

const deleteAcct = (user_id,del_id) => {
	return await stripe.customers.deleteSource(
  user_id,del_id);

}

const listAcct = (user_id,acct_type,list_num) => {
	return await	stripe.customers.listSources(user_id,{object: acct_type, limit: list_num});
}

/*End of Bank Account for stripe*/

/*Create Product for stripe*/
const createProduct = (prod_name) => {
 return await	stripe.products.create({name: prod_name,});
}

const retrieveProduct = (prod_id) => {
	return await stripe.products.retrieve(prod_id);
}

const updateProduct = (prod_id,update_id) =>{
 return await stripe.products.update(
   prod_id,
  {metadata: {order_id: update_id}}
);
}

const listProduct = (list_num) => {
return await stripe.products.list({
  limit:list_num,
});
}

const deleteProduct = (prod_id) => {
	return await stripe.products.del(prod_id)
}

const searchProduct = (prod_name) => {
	return await stripe.products.search({
  query: prod_name,
});
}
/*End of Create Product for stripe*/

/*Prices for stripe*/
const createPrice = (amount,curr_type,interval_type,prod_id) => {
	return await stripe.prices.create({
  unit_amount: amount,
  currency: curr_type,
  recurring: {interval: interval_type},
  product: prod_id,
});

}

const retrievePrice = (price_id) => {
return await stripe.prices.retrieve(price_id);
}
const updatePrice = (price_id,update_id) => {
	return await stripe.prices.update(
  price_id,
  {metadata: {order_id: update_id}}
);


}
const listPrice = (list_num) => {
	return await stripe.prices.list({
  limit: list_num,
});

}
const searchPrice = (price) => {
	return await stripe.prices.search({
  query:price,
});


}
/*End of prices for stripe*/

/*End of Checkout Session for stripe*/
const createSession = (success_url,cancel_url,price,quantity,payment_mode) => {
	return await stripe.checkout.sessions.create({
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
	return await
stripe.checkout.sessions.expire(session_id);
}

const retrieveSession = (session_id)=> {
	return await stripe.checkout.sessions.retrieve(session_id);
}

const listSession = (list_num)=> {
 return await stripe.checkout.sessions.list({
  limit: list_num,
});
}

/*End of Checkout Session for stripe*/
module.exports = {createCustomer,retrieveCustomer,
	deleteCustomer,listCustomers,searchCustomers,updateCustomer,
createPaymentIntent,retrievePaymentIntent,updatePaymentIntent,confirmPaymentIntent,cancelPaymentIntent,
createPayment,retrievePayment,retrieveCustomersPayment,updatePayment,
listPaymentMethods,listPaymentMethods,listCustomersPaymentMethod,
attachPaymentToCustomer,detachPaymentFromCustomer,
createRefund,updateRefund,retrieveRefund,cancelRefund,listRefund,
createAcct,retrieveAcct,updateAcct,verifyAcct,deleteAcct,listAcct,
createProduct,retrieveProduct,updateProduct,listProduct,retrieveProduct,deleteProduct,searchProduct,
createPrice,retrievePrice,updatePrice,listPrice,searchPrice,
createSession,expireSession,retrieveSession,listSession}; 
