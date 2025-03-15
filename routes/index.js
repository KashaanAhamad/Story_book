//const express = require('express')
import express from "express";
import  Router  from "express";
import Layer from "express/lib/router/layer.js";
const router = express.Router()

//Login/Landing page
//rout GET/
router.get("/", (req, res) => {
  res.render("login",
    {layout : 'login'},
  );
});

// Dashboard
//rout GET/Dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

//module.exports =router
export default router;
