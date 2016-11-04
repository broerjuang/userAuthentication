'use strict'

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get /login
router.get('/login', (req, res) => {
  return res.render('login', {title : 'Log In'});
});

// Post /login
router.post('/login', (req, res) => {
  return res.send('You\'re login')
})

// GET /
router.get('/', (req, res, next) => {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', (req, res, next) => {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', (req, res, next) => {
  return res.render('contact', { title: 'Contact' });
});

// GET /register
router.get('/register', (req, res, next) => {
  return res.render('register', { title: 'Sign Up'})
  //return res.render('register', { title: 'Register'})
});

//POST /register
router.post('/register', (req, res, next) => {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword) {
      //confirm if that user type the same password twice
      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match');
        err.status = 400;
        return next(err)
      }

      // create object with form input
      var userData = {
        email : req.body.email,
        name  : req.body.name,
        favoriteBook : req.body.favoriteBook,
        password : req.body.password
      };

      // use schema's crate method to insert document into mongodb
      console.log(userData);
      User.create(userData, (err, user) => {
        err ? next(err) : res.redirect('/profile')
      })
    } else {
      var err = new Error('All fields required');
      err.status = 400;
      return next(err)
    }
});

module.exports = router;
