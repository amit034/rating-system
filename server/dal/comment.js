const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    updatedAt: Date,
    comment: String,
    email: String,
    rating: {count:{type: Number, default: 0}, rate: {type: Number, default: 0 }}
});

module.exports = mongoose.model('Comment', commentSchema);
