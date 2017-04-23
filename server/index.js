process.env.NODE_ENV = process.env.NODE_ENV || "development";

const mongo = require('./setup/mongo');
const generator = require('./setup/generator');
const express = require('./setup/express');
const ws = require('./setup/ws');
// Registers all HTTP endpoints
module.exports = require('./routes')(express, ws);
