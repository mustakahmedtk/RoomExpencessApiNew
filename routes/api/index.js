const express = require('express');
const router = express.Router()
const User = require('../../modals/user')
const { tokenAuthJwt, tokenAuthLocal, generateToken } = require('../../config/auth')
const usersRoute = require('./user')
const roomieRoute = require('./roomies')
const expenceRoute = require('./expencess')


router.post('/signUp', async (req, res) => {
    try {
        const { email, password } = req.body
        const newUser = new User(req.body)
        const foundUser = await User.findOne({ email })
        if (foundUser) {
            return res.status(403).json({ error: "user is already exist" })
        }
        await newUser.save((err, user) => {
            res.send({ "success": "signUp done" })
        })
    }
    catch (error) {
        console.log(error)
    }

})

router.post('/token', tokenAuthLocal, async (req, res) => {
    const token = generateToken.getToken(req.user)
    res.json({ message: "sign in successFull", token })
})

router.get('/me', tokenAuthJwt, async (req, res) => {
    res.json(req.user)
})


/* function generateRoomId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  } */


router.use('/user', tokenAuthJwt, usersRoute)
router.use('/roomie', tokenAuthJwt, roomieRoute)
router.use('/expences', tokenAuthJwt, expenceRoute)

module.exports = router