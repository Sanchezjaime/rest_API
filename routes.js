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
router.get('/courses', asyncHandler( async(req, res) => {
  const courses = await Course.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"]},
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
      }
    ]
  });
  res.status(200).json(courses);
}));

//route to return the corresponding course including user associated with this course
router.get('/courses/:id', asyncHandler( async(req, res) => {
  const course = await Course.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: User,
        attributes: ['firstName', 'lastName', 'emailAddress'],
      }
    ]
  });

  if (course) {
    res.status(200).json({course})
  } else {
    res.status(404).json({ message: "Course Not Found" });
  }
}));

//route that will create a new courses
router.post('/courses', authenticateUser, asyncHandler( async(req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).location(`/api/courses/${course.id}`).end();
  } catch (error) {
    console.log('ERROR: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

//route to update the corresponding Courses
router.put('/courses/:id', authenticateUser, asyncHandler( async(req, res, next) => {
  try {
    const user = req.currentUser;
    const course = await Course.findByPk(req.params.id);
    if (course && course.userId === user.id) {
      await course.update(req.body);
      res.status(204).end();
    } else {
      res.status(403).json({ message: "You dont own this course."});
      next(err);
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

//route to delete the corresponding courses
router.delete('/courses/:id', authenticateUser, asyncHandler( async(req, res, next) => {
  const user = req.currentUser;
  const course = await Course.findByPk(req.params.id);
    if (course && course.userId === user.id) {
      await course.destroy();
      res.status(204).end();
    } else {
      const err = createError(403, "You dont own this course.");
      next(err);
    }
}));

module.exports = router;
