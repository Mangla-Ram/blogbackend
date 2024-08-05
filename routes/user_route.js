import express from "express";
import { getUserById, login, userSignUp, viewuser } from "../controllers/user_controller.js";


const userRoute = express.Router();

userRoute.post("/signup", userSignUp);
userRoute.get("/jai",viewuser);
userRoute.get("/:id:", getUserById);
userRoute.post("/login",login);

export default userRoute;