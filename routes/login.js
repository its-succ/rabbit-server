const express = require('express');
const models = require('../models');

const sequelize = models.sequelize;
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    // テスト用ユーザー
    let user = {id:"test", username:"user",password:"password"};

    // 認証
    if(username===user.username && password===user.password){
      return done(null, true);
    } else {
      return done(null, false, { message: 'ログインに失敗しました。' });
    }
  }
));

router.get('/',
  function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/',
  passport.authenticate('local', {failureRedirect: '/',
                                   session: false }),
  function(req, res, next){
    res.redirect('index');

  }
);

module.exports = router;
