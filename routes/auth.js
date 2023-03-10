const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');

router.post('/register',async (req,res)=>{
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user is alredy in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email is already exist");
    // HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        // res.send(savedUser);
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
})


router.post('/login',async (req,res)=>{
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //CHECKING IF THE EMAIL IS EXIST IN DATABASE
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Email or password is wrong");
    // PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send({"token":token});
})

module.exports = router;