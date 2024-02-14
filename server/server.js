import express from "express";

// Import API Routes
import userQueryRouter from "./routes/userQuery.route.js";
import userRequestRouter from "./routes/userRequest.route.js";
import adminRouter from "./routes/admin.route.js"

// Import Middleware

const app = express();
app.use(express.json());

app.route("/user/query", userQueryRouter);
app.route("/user/request", userRequestRouter);
app.route("/admin", adminRouter);

app.listen(8000);
