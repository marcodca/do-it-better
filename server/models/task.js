const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: { type: String, lowercase: true, trim: true },
    userId: String,
    completed: Boolean,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
