const express = require('express');
const router = express.Router()
const expences = require('../../modals/expencess')
const User = require('../../modals/user')
const Roomie = require('../../modals/roomies')


router.post('/addexpencess', async (req, res) => {
    try {
        const newExpencess = new expences(req.body)
        const foundUser = await User.findOne({ _id: req.body.user_id })
        if (foundUser) {
            const foundRoomie = await Roomie.findOne({ _id: req.body.roomie_id })
            if (foundRoomie) {
                newExpencess.save((err, result) => {
                    if (!err) {
                        res.json({ success: true, message: "expencess saved" })
                    }
                })
            }
            else {
                res.json(422, { error: "roomie not found" })
            }
        }
        else {
            res.json(422, { error: "user not found" })
        }

    }
    catch (error) {
        console.log(error)
    }



})

module.exports = router;
