const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // we also want to note taht which user is adding the notes so that we could put 
    // a constraint ki koi other user kisi other user ka notes fetch na kar sake. so somehow we have to relate user.js to the notes.js(like foreign key)
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        default: 'General'
    }, 
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('notes', NotesSchema);   // notes wii be the name of your collection in the database