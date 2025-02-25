//const express = require("express")

//const dotenv = require("dotenv")
//const morgan = require("morgan")
//const exphbs = require("express-handlebars")
//const connectDB=require('./config/db')
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import exphbs from "express-handlebars";
import { engine } from "express-handlebars";
import passport from "passport";
import session from "express-session";

import connectDb from "./config/db.js";
import Router from "./routes/index.js";

//Load config
dotenv.config({ path: "./config/config.env" });

//passport config PROBLEM oCCURS
//import("./config/passport")(passport);
import('./config/passport.js').then(module => {
  module.default(passport); // Assuming the module exports a default function
}).catch(err => {
  console.error('Error loading passport config:', err);
});

//call db
connectDb();

const app = express();

//logging middleware
if (process.env.NODE_ENV === `development`) {
  app.use(morgan("dev"));
}

//Handlebars middleware
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//Session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
//app.use(path.join(__dirname,'public'));

//Routes
app.use("/", Router);
//app.use("/auth", "./routes/auth"); //changes may occur

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port number ${PORT}`
  )
);
