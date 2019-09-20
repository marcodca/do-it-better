import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: String,
    title: String,
    userId: Number,
    completed: Boolean,
    created: String
});

export default mongoose.model('Product', taskSchema);