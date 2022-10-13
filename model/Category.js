const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        require: [true, "name must be defined"],
    },
    description: {
        type: String,
        require: [true, "description must be defined"],
    },
});

module.exports = model('Category', categorySchema);
