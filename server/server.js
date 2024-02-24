import express from "express";

// Import API Routes
import queriesRouter from "./routes/query.route.js";
import additionsRouter from "./routes/addition.route.js";
import adminRouter from "./routes/admin.route.js"

// Import Stripe for payment
import Stripe from "stripe";
// public key
const stripePublicKey = "pk_test_51Omh0XD4UdDQFwxRIjqyccC4UN8VXKH40AZkVufSYAKJIPaVqPMJbDatDAnMfATvniF1JB98uS71ahxwqTRnHB0s00wjzaO9Jm";

require("dotenv").config(); //to use secret api key without having it in the file
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Import Middleware

const app = express();
app.use(express.json());

app.use("/user/query", queriesRouter);
app.use("/user/request", additionsRouter);
app.use("/admin", adminRouter);

app.listen(8000);

// Managing card payments
// amount is in CENTS!
app.post("/donate", async (req, res) => {
    try {
        let amount = req.body;
        // Simple validation
        if (!amount) {
            return res.status(400).json({ message: "Need to enter an amount" });
        }
        amount = Math.round(amount * 100); //amount was a float with 2 decimal places
                                           //amount in paymentIntents is in cents so * 100
                                           //brings it to the correct amount
        
        // Initiate payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), //amount is in cents so we mult by 100
            currency: "CAD",
            payment_method_types: ["card"],
        });
        
        // clientSecret holds important info but hides sensitive ones
        const clientSecret = paymentIntent.client_secret;
        res.json({ message: "Payment initiated", clientSecret });

    } catch (err) {
        // Catch any error and send error 500 to client
        console.log(err.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
});

  