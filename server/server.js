import express from "express";

// Import API Routes
import testRoute from "./routes/testRoute.js";

// Import Middleware

const app = express();
app.use(express.json());

app.route("/test", testRoute);

app.listen(8000);
