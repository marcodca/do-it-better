const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: String,
    userId: Number,
    completed: Boolean,
    created: String
});

module.exports = mongoose.model('Product', taskSchema);
