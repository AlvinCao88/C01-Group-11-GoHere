import express from "express";
import cors from "cors"; // Import CORS middleware
import queriesRouter from "./routes/query.route.js";
import additionsRouter from "./routes/addition.route.js";
import adminRouter from "./routes/admin.route.js";

const app = express();
const API_URL = "http://localhost:8000";

// Apply CORS middleware before defining routes
app.use(cors({
    origin: API_URL
}));

app.use(express.json());

app.use("/user/query", queriesRouter);
app.use("/user/request", additionsRouter);
app.use("/admin", adminRouter);

app.listen(8000);
