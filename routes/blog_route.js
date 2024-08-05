import express from "express";
import  {addblog, blog, deleteBlog, getBlogById, updateBlog}  from "../controllers/blog_controller.js";
const blogRoute = express.Router();

blogRoute.get("/getAllBlogs", blog);
blogRoute.get("/:id", getBlogById);
blogRoute.post("/addblog",addblog);
blogRoute.put("/update/:id",updateBlog);
blogRoute.delete("/delete/:id",deleteBlog);


export default blogRoute;