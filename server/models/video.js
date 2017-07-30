const mongoose = require('mongoose');

const schema = mongoose.Schema;

const videoSchema = new schema({
    title : String,
    url: String,
    description: String,
    id: String
});

module.exports = mongoose.model('video', videoSchema, 'videos');