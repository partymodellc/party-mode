const stripe = require("../stripe/stripeAPi.js");
function createMembership(member_id,member_data){
stripe.createCustomer(member_id,member_data);
}
function renewMembership(member_id,member_data){
	stripe.updateCustomer(member_id,member_data);
}
function cancelMembership(member_id){
	stripe.deleteCustomer(member_id);
}
function payMembership(payment_id){
	stripe.retrievePayment(payment_id);
}