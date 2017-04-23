const express = require('express');

module.exports = (app, ws) => {

  const commentsRouter = require('./comments')(ws);
  app.use(commentsRouter);
}
