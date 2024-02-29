import express from "express";

// Import API Routes
import queriesRouter from "./routes/query.route.js";
import additionsRouter from "./routes/addition.route.js";
import adminRouter from "./routes/admin.route.js"

// Import Stripe for payment
import Stripe from "stripe";
// public key
const stripePublicKey = "pk_test_51Omh0XD4UdDQFwxRIjqyccC4UN8VXKH40AZkVufSYAKJIPaVqPMJbDatDAnMfATvniF1JB98uS71ahxwqTRnHB0s00wjzaO9Jm";

import dotenv from 'dotenv';
dotenv.config(); //used to get secret key

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Import Middleware

const app = express();
app.use(express.json());

app.use("/user/query", queriesRouter);
app.use("/user/request", additionsRouter);
app.use("/admin", adminRouter);

app.listen(8000);

// Managing card payments
// amount is same as amount customer sees
// amount == 1.23 means they'll be charged 1.23 CAD
app.post("/donate", async (req, res) => {
    try {
        let amount = req.body.amount;

        // Simple validation
        if (isNaN(amount)) {
            return res.status(400).json({ message: "Need to enter an amount" });
        }

        amount = Math.round(amount * 100) / 100;
        
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

  