const express = require('express');
const router = express.Router()

// ------------ HTTP METHODS --------------- // 


const getAllUsers = (req, res) => {
     res.status(500).json({
          status: 'error',
          message: 'Route is not yet defined'
     })
}

const createUser = (req, res) => {
     res.status(500).json({
          status: 'error',
          message: 'Route is not yet defined'
     })
}

const getUser = (req, res) => {
     res.status(500).json({
          status: 'error',
          message: 'Route is not yet defined'
     })
}

const updateUser = (req, res) => {
     res.status(500).json({
          status: 'error',
          message: 'Route is not yet defined'
     })
}

const deleteUser = (req, res) => {
     res.status(500).json({
          status: 'error',
          message: 'Route is not yet defined'
     })
}

router.route('/')
     .get(getAllUsers)
     .post(createUser)

router.route('/')
     .get(getUser)
     .patch(updateUser)
     .delete(deleteUser)

module.exports = router