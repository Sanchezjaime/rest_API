'use strict';

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('./middleware/authenticate');
const { Courses, Users } = require('./models');


//handler function to wrap each routes
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      //forward to global error handler in app.js using next method not yet coded
      next(error);
    }
  }
}


//route to return all properties and values for the current authenticated user
router.get('/users', authenticateUser, asyncHandler(async(req, res, next) => {
  const user = req.currentUser
  //returns all properties and values for authenticated user along with 200 http status code
  res.status(200).json({

  });
}));

//route to will create a new user
router.post('/users', asyncHandler( async(req, res) => {
  try {
      await User.create(req.body);
      res.status(201).location("/").end();
  } catch (error) {
    console.log('Error: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

//route to return all courses including the user associated with each course
router.get('/courses');

//route to return the corresponding course including user associated with this course
router.get('/courses/:id');

//route that will create a new courses
router.post('/courses');

//route to update the corresponding Courses
router.put('/courses/:id');

//route to delete the corresponding courses
router.delete('/courses/:id');
