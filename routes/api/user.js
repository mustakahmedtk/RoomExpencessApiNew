const express = require('express');
const router = express.Router()
const User = require('../../modals/user')
const { tokenAuthJwt, tokenAuthLocal, generateToken } = require('../../config/auth')



router.get('/getAllUser', async (req, res) => {
    try {
        const allUser = await User.find()
        res.json(allUser)
    }
    catch (err) {
        console.log(err)
    }

})

router.get('/getUserById', async (req, res) => {
    try {
        await User.findById(req.query.id, (err, result) => {
            if (!err) {
                res.json({ user: result })
            }
        })
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/removeUserById', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.body.id, (err, result) => {
            if (!err) {
                res.send('user removed successfully')
            }
        })
    }
    catch (err) {
        console.log(err)
    }

})

router.put('/updateUserById', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.query.id, req.body, (err, result) => {
            if (!err) {
                res.json({ success: "user updated suucessfully" })
            }
        })
    }
    catch (error) {
        console.log(error)
    }

})




module.exports = router;