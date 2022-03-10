'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { user } => require('../models');

exports.authenticateUser = async (req, res, next) => {
  //parse the users credentials from the authorization header
  const credentials = auth(req);
  if (credentials) {
    //find user account that emailAddress matches credentials name
    const user = await User.findOne({ where: {emailAddress: credentials.name} });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.username}`);

        //store the user on the request Object
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.username}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  }  else {
    message = `Auth header not found`;
  }
  next();
};
