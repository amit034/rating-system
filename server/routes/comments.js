const express = require('express');
const router = express.Router();



module.exports = (ws) => {
    router.get('/comments', (req, res) => {
      const Comment = require('../dal/comment');
      Comment.find().then((comments) => {
          res.json(comments)
      })
    })

    router.post('/comments/:id/rate/:rate', (req, res) => {
      const Comment = require('../dal/comment');
      const id  = req.params.id;
      const rate = parseInt(req.params.rate);
      Comment.findById(id).then((comment) => {
          const rating = comment.rating || {rate:0, count:0};
          rating.rate =  Math.round((rating.rate * rating.count + rate) / (rating.count + 1));
          rating.count ++;
          comment.rating = rating;
          return comment.save().then(function(){
              ws.broadcastMessage({commentId: comment.id, rating: rating});
              res.send();
          }).catch(function (err) {
              res.send(err);
          });
      });
    });
    return router;
}
