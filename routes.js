'use strict';

const express = require('express');
const router = express.Router();
const authenticate = require.('./middleware/authenticate');
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



router.get('/users', asyncHandler(async(req, res, next) => {
  const users = await User.findAll();
}));

router.post('/users');

router.get('/courses');

router.post('/courses');
