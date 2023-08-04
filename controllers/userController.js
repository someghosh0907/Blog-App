const userModel = require('../models/userModels');
const bcrypt = require('bcrypt')

//CREATE USER REGISTER
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //VALIDATION
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "pliss fil all fields"
            });
        }
        //EXISTING USER
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)          //hash METHOD TAKE TWO INPUT PASSWORD AND SALT. SALT IS A RANDOM STRING. 
        // PASSWORD + SALT ->>UNIQUE STRING                                                            
        //SAVE NEW USER
        const user = new userModel({ username, email, password: hashedPassword });
        await user.save();
        return res.status(201).send({
            success: true,
            message: "New user created",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in register callback",
            error
        });
    }
};

//
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'all users data',
            users                                   //WILL SHOW THE USERS ARRAY OF OBJECTS
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: true,
            message: 'Error to get all users',
            error
        })
    }
};

//LOGIN
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //VALIDATION
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Pliss provide login or password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'email not registered'
            })
        }
        //PWD MSATCHING
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Error in username or password',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'login successful',
            user
        })
    } catch (error) {
        consol.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error In Login Callback',
            error
        })
    }
}