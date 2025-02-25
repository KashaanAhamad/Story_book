import "passport-google-oauth20";
const GoogleStrategy = passport - google - oauth20.strategy;
import mongoose from "mongoose";
import User from "../models/User";

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSceret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUEL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );

  //serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

const mongoose = mongoose();
