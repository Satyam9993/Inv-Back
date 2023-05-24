const mongoose = require('mongoose');
const { Schema } = mongoose;

const InventorySchema = new Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    createdon : {
        type: Date,
        default: Date.now 
    }
});

const Inv = mongoose.model('inventory', InventorySchema);
module.exports = Inv;