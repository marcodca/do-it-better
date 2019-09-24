const mongoose = require('mongoose') ;
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, lowercase: true, trim: true },
});

module.exports = mongoose.model('User', userSchema);
