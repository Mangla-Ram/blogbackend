import mongoose from "mongoose";
import { blog } from "../controllers/blog_controller.js";

const Schema = mongoose.Schema;
const userSchema = new Schema({
   name: {
    type: String,
    required: true,
   },
   
   email: {
    type: String,
   required: true,
   unique: true,
   },

   password: {
    type: String,
    required: true,
    minlength: 6,
   },
   blog: [
      {
         type: mongoose.Types.ObjectId,
         Ref : "Blog",
         required: true,
      }
   ]

});

export default mongoose.model("User",userSchema);
