import express from "express";

// Import API Routes
import queriesRouter from "./routes/query.route.js";
import additionsRouter from "./routes/addition.route.js";
import adminRouter from "./routes/admin.route.js"

// Import Middleware

const app = express();
app.use(express.json());

app.use("/user/query", queriesRouter);
app.use("/user/request", additionsRouter);
app.use("/admin", adminRouter);

app.listen(8000);
