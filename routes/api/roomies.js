const express = require('express');
const router = express.Router();
const asyncCall = require('async');
const User = require('../../modals/user')
const Roomie = require('../../modals/roomies')


router.post('/createRoomie', async (req, res) => {
    try {
        const foundUser = await User.findOne({ _id: req.body.room_id })
        if (foundUser) {
            if (foundUser.role === "admin") {
                const foundRoomie = await Roomie.findOne({ name: req.body.name })
                if (!foundRoomie) {
                    const newRoomie = new Roomie(req.body)
                    const user_add = {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        mobile_no: req.body.mobile_no,
                        role: req.body.role
                    }
                    const newUser = new User(user_add);
                    newRoomie.save().then(() => {
                        newUser.save((err, result) => {
                            if (!err) {
                                res.status(200).json({ success: "new roomie saved as a user", role: "roomie" })
                            }
                        })
                    })
                }
                else {
                    res.status(402).json({ error: "roomie already exist" })
                }
            }
            else {
                res.status(403).json({ error: "permission restricted" })
            }
        }
        else {
            res.status(402).json({ error: "User not found" })
        }
    }
    catch (err) {
        console.log(err)
    }


})

router.get("/getAllRoomie",async (req,res)=>{
    try{
        const allRoomie= await Roomie.find({room_id:req.query.user_id})
        res.json(allRoomie)
    }
    catch(err){
        console.log(err)
    }
      
})

router.post('/removeRoomie', async (req, res) => {
    try {
        await Roomie.findByIdAndDelete(req.body.id, (err, result) => {
            if (!err) {
                res.send('user removed successfully')
            }
        })
    }
    catch (err) {
        console.log(err)
    }

})







module.exports = router

