import express from "express";

// Import API Routes
import queriesRouter from "./routes/query.route.js";
import additionsRouter from "./routes/addition.route.js";
import adminRouter from "./routes/admin.route.js"

// Import Middleware

const app = express();
app.use(express.json());

app.route("/user/query", queriesRouter);
app.route("/user/request", additionsRouter);
app.route("/admin", adminRouter);

app.listen(8000);
