
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export default async function handler(req,res){

  if(req.mothod === "POST"){
    try {
        const params= {
          submit_type:"pay",
          mode:"payment",
          payment_method:["cartd"],
          billing_address_collection:"auto",
          shipping_options:[
            {shipping_rate: "shr_1MQwG4FWsM7Q5XJZw0jvzZc6"}
          ],
          line_items:[
            {

              price:" rpice ",
              quantity:1,
            }
          ],
          mode:"payment",
          success_url:`${req.headers.origin}/?success=true`,
          cancel:`${req.headers.origin}/?canceled=true`,
        }

          
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);

    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  }else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }

}