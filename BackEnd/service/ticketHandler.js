const stripe = require("../stripe/stripeAPi.js");
function purchaseTicket(amount,currency,automate_method){
	stripe.createPaymentIntent(amount,currency,automate_method);
}

function refundTicket(ref_id){
	stripe.createRefund(ref_id);
}
