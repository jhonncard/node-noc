import mongoose from "mongoose";


const LogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high' ],
        default: 'low',
    },
    createAt: {
        type: Date,
        default:new Date(),
    },

});


export const LogModel = mongoose.model('Log', LogSchema)