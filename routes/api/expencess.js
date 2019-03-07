const express = require('express');
const router = express.Router()
const expences = require('../../modals/expencess')
const User = require('../../modals/user')
const Roomie = require('../../modals/roomies')


router.post('/addexpencess', async (req, res) => {
    try {

        const expencess = req.body
        const foundUser = await User.findOne({ _id: req.body.user_id })
        if (foundUser) {
            expencess.room_id = await checkUserRoleAndSendRoomId(req.user)
            const newExpencess = new expences(expencess)
            newExpencess.save((err, result) => {
                if (!err) {
                    res.json({ success: true, message: "expencess saved" })
                }
            })
        }
        else {
            res.json(422, { error: "user not found" })
        }

    }
    catch (error) {
        console.log(error)
    }

})

router.get('/getExpencesById', async (req, res) => {
    try {
        const expencess = await expences.find({ user_id: req.query.user_id })
        if (expencess) {
            res.status(200).json({ expencess })
        }

    }
    catch (error) {
        console.log(error)
    }
})

router.get('/getAllExpencess', async (req, res) => {
    try {
        const id = await checkUserRoleAndSendRoomId(req.user);

        const allExpencess = await expences.find({ room_id: id })
        if (allExpencess) {
            res.status(200).json({ allExpencess })
        }

    } catch (error) {
        console.log(error)
    }
})

router.post('/deleteExpenceById', async (req, res) => {
    try {
        await expences.findByIdAndDelete(req.body.id, (err, result) => {
            if (!err) {
                res.send("expencess deleted successfully")
            }
        })

    } catch (err) {
        console.log(err)
    }
})

router.post('/updateExpenceById', async (req, res) => {
    try {
        await expences.findByIdAndUpdate(req.query.id, req.body, (err, result) => {
            if (!err) {
                res.send("expence updated successfully")
            }
        })

    } catch (err) {

    }
})

checkUserRoleAndSendRoomId = async user => {
    if (user.role !== "admin") {
        const roomie_as_user = await Roomie.find({ name: user.name })
        return roomie_as_user[0].room_id
    } else {
        return user._id
    }
}

module.exports = router;
