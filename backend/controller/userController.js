const users = require("../model/userModel");
var jwt = require('jsonwebtoken');

// register
exports.registerController = async (req, res) => {
  const { username, email, password } = req.body
  console.log(username, email, password);

  try {
    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json("User already exists");
    }

    const newUser = new users({
      username,
      email,
      password,  
      cpassword, 
      profile: ""
    });

    await newUser.save();
    res.status(201).json(newUser);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

exports.loginController=async(req,res)=>{
      const {email,password}=req.body
      console.log(email,password);
      try{
        const existingUser= await users.findOne({email})
        if(existingUser){
            if(existingUser.password==password){
                const token=jwt.sign({userMail:existingUser.email},`secretkey`)
                res.status(200).json({existingUser,token})
            }else{
                res.status(401).json("Password Does not exist")
            }
        }else{
           res.status(404).json("User Does not exist")
        }
            
        }catch(err){
        res.status(500).json(err)
      }
      
}

exports.googleLoginController = async (req,res) => {
    const{username,email,password,profile}=req.body
    console.log(username,email,password,profile);
   
    try {
        const existingUser=await users.findOne({email})
    
        if(existingUser){
            const token=jwt.sign({userMail:existingUser.email},'secretKey')
           
        res.status(200).json({existingUser,token})
            
        }else{
            const newUser=new users({
                username,
                email,
                password,
                profile

            })
            await newUser.save()
            const token=jwt.sign({userMail:newUser.email},'secretKey')
            
        res.status(200).json({existingUser:newUser,token})

        }
        
       
       
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.editUserProfileController = async (req, res) => {
  try {
    const { username, password, bio } = req.body;
    const email = req.payload; 

    if (!email) return res.status(401).json("Unauthorized");

    // If user uploaded a new profile image
    const profile = req.file ? req.file.filename : req.body.profile;

    // Prepare update data
    const updateData = { username, bio, profile };

    // Only update password if provided
    if (password) {
      updateData.password = password;
    }

    // Update user in DB
    const updatedUser = await users.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(updatedUser);

  } catch (err) {
    console.error( err);
    res.status(500).json(err);
  }
};






















