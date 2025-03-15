//const express = require('express')
import express from "express";
import Router from "express";
import Layer from "express/lib/router/layer.js";
import passport from "passport";
const router = express.Router();
import passport from "passport";

//@desc auth with GOOLGE
//rout GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc  Google auth callback
//rout GET/auth/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

//module.exports =router
export default router;
