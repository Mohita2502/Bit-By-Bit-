
const loginURL =   "https://gamestart-backend.azurewebsites.net/com.gamestart/v1/home/userauthentication/login/";

export async function createOrder(order_id: number, items: string[], itemQuantity: number[], totalPrice: number){
	// JSON function to convert order info to a string and send it to the backend
	const res = await fetch(`${loginURL},${order_id}, ${items}, ${itemQuantity}, ${totalPrice}`, {
		method: "POST",
		headers: {
			'Content-Type': "application/json"
		},
		body: JSON.stringify({order_id, items, itemQuantity, totalPrice}),
	});
	
	if(!res.ok){
	let message = "could not get orders";
        try{
		console.log(res)
	}
	catch{}
	throw new Error(message); 
	}
	
	console.log(res);
	const data = await res.json();	
	return data;

}