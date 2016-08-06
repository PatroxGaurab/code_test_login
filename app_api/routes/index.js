var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlPublicProfile = require('../controllers/publicprofile');

// profile
router.post('/profile/public/connect*',auth, ctrlProfile.connectToUser);
router.get('/profile/public*', ctrlPublicProfile.publicProfileRead);
router.get('/profile*', auth, ctrlProfile.profileRead);
router.post('/profile*',auth, ctrlProfile.profileEdit);

router.post('/upload/image', auth, ctrlProfile.uploadImage);
// google login
router.get('/login_external/auth/google', ctrlAuth.login_external_google);

router.get('/auth/google*', ctrlAuth.login_external_callback_google);

// facebook login
router.get('/login_external/auth/facebook', ctrlAuth.login_external_facebook);
router.get('/auth/facebook*', ctrlAuth.login_external_callback_facebook);

// twitter login
router.get('/login_external/auth/twitter', ctrlAuth.login_external_twitter);
router.get('/auth/twitter*', ctrlAuth.login_external_callback_twitter);

// linkedin login
router.get('/login_external/auth/linkedin', ctrlAuth.login_external_linkedin);
router.get('/auth/linkedin*', ctrlAuth.login_external_callback_linkedin);

// Check unique username
router.post('/username/save', auth, ctrlProfile.saveUsername);
router.get('/username*', auth, ctrlProfile.isUsernameUnique);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
