import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signupUser = async(req,res)=>{
    try{
        //get the data from frontend that user will type --
        const{name,email,username,password}=req.body;
        
        //check if the user already exists --
        const userExists = await User.findOne({$or:[{email},{username}]});
        if(userExists){
            return res.status(400).json({error:"User already exists!"});
        }
        // hash the password here --
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //now we will create the new user object--
        const newUser= new User({
          name,
          username,
          email,
          password: hashedPassword,
        });
        //now save the user
        await newUser.save();
        //now we will send the success message--

        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email:newUser.email,
            username:newUser.username,
            message:"user created successfully!"
        });
    }catch(error){
        console.error("Error in signup:",error.message);
        res.status(500).json({error:"Server error"});
    }
};
