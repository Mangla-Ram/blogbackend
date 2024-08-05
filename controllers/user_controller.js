
import user_model from "../models/user_model.js";
import bcryptjs from "bcryptjs";


export const viewuser = async (req,res) =>{
    let alluser;
    try {
        alluser = await user_model.find();
        
    } catch (err) {
        console.log(`${err}`);
    }
    return res.status(200).json({alluser});
}

export const getUserById = async (req,res) =>{
    const UserId = req.params.id;
    let user;

    try {
        user = await user_model.findById(UserId);
    } catch (err) {
        console.log(`${err}`)
    }
    res.status(200).json({user});
}

export const userSignUp = async (req,res) => {
    const {name,email,password} = req.body;
    let exitinUser;
    try {
        exitinUser = await user_model.findOne({email});
      return  res.status(400).json({
            message: "already have a account Go to Login Page"
        })
    } catch (err) {
       console.log(`${err}`);
    }

    if(exitinUser){
        return  res.status(400).json({
            message: "already have a account Go to Login Page"
        })
    }

    const incrptedPass = bcryptjs.hashSync(password);
    const user = new user_model({name,email,password: incrptedPass});
    try {
      await user.save();
       res.status(201).json({
    user
       });

    } catch (err) {
        console.log(`${err}`);
    }
return res.status(200).json({user});
};

export const login = async (req,res) =>{
    const {email,password} = req.body;
    let exitinUser;
    try {
        exitinUser = await user_model.findOne({email});
    //   return  res.status(400).json({
    //         message: "already have a account Go to Login Page"
    //     })
    } catch (err) {
       console.log(`${err}`);
    }

    if(!exitinUser){
        return  res.status(400).json({
            message: "You have no account yet"
        })
    }

    const isPasswordCorrect = bcryptjs.compareSync(password,exitinUser.password);
if(isPasswordCorrect){
    return  res.status(200).json({
        exitinUser
    })
}else{
    return  res.status(500).json({
        message: "Your password is not correct"
    })
}

};