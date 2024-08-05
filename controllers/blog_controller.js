import blog_model from "../models/blog_model.js";
import user_model from "../models/user_model.js";
import mongoose from "mongoose";
export const blog = async (req,res)=> {

  let allblogs;
  try {
   allblogs =  await blog_model.find();
    
  } catch (err) {
    print(err);
  }
  return res.status(200).json({
    allblogs
  });

};

export const  getBlogById = async (req,res) => {
 const blogID = req.params.id;
 let blog;
 try {
   blog = await blog_model.findById(blogID);
 } catch (err) {
  return res.status(500).json({
    message: `${err}`
  });
 }
  res.status(200).json({
    blog
  });
};

export const addblog = async (req,res)=> {
  const {title,description,image,dateAndTime,user} = req.body;
  
  let exitinUser;
  try {
      exitinUser = await user_model.findById(user);
    // return  res.status(400).json({
    //       message: "already have a account Go to Login Page"
    //   })
  } catch (err) {
     console.log(`${err}`);
  }

  if(!exitinUser){
      return  res.status(400).json({
          message: "you have no account Go to signup Page"
      })
  }
  const blog = new blog_model({title,description,image,dateAndTime,user})
  try {
  const session = await mongoose.startSession();
  session.startTransaction();
   await blog.save({session});
   exitinUser.blog.push(blog);
   await exitinUser.save({session});
   await session.commitTransaction();
    
// res.status(201).json({
//     message: "blog saved"
// });
} catch (err) {
    console.log(err);
    
}
res.status(200).json({
  message: "your blog is saved"
})
};

export const updateBlog = async (req,res) => {
  const blogID = req.params.id;
  const {title,description,image,dateAndTime} = req.body;
  try {
    await blog_model.findByIdAndUpdate(blogID,
{title,description,image,dateAndTime}
    )
  } catch (err) {
     return res.status(500).json({
    message: `${err}`
  });
    
    }
    return res.status(200).json({
      message: "blog is updated"
    });
}

export const deleteBlog = async (req,res) => {
  const blogID = req.params.id;
  let blog;
  try {
    blog = await blog_model.findByIdAndRemove(blogID).populate("user");
    await blog.user.blog.pull(blog);
    await blog.user.save();
  } catch (err) {
    return res.status(500).json({
      message: `${err}`
    });
    
  }
  return res.status(200).json({
    message: "blog is deleted"
  })
}