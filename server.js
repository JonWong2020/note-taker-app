// libs to import
const express = require('express');
const fs = require('fs');
const path = require('path');

// server ports
const PORT = process.env.PORT || 3001;
const app = express();

// app staging
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// GET Request functions
