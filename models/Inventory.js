const mongoose = require('mongoose');
const { Schema } = mongoose;

const InventorySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    image: {
        type: String
    },
    itemName: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Panel', 'Inverter', 'Wire', 'MC4 Connector', 'others']
    },
    code: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    unit: {
        type: String,
        required: true,
        default: 'unit'
    },
    openstock: {
        type: Number,
        required: true,
        default: 0
    },
    stockwarning: {
        type: Boolean,
        required: true,
        default: false
    },
    purchaseprice: {
        type: Number,
        required: true,
        default: 0
    },
    inclusivetax: {
        type: Boolean,
        required: true,
        default: false
    },
    lowstockunit: {
        type: Number,
        required: true,
        default: 0
    },
    taxrate: {
        type: String,
        required: true,
        default: "NAN"
    },
    adjust: [{
        adjuststock: {
            type: Number,
            required: true,
        },
        isAdd: {
            type: Boolean,
            required: true,
        },
        adjustby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        remark: {
            type: String,
            default: ''
        }
    }],
    createdon: {
        type: Date,
        default: Date.now
    }
});

const Inv = mongoose.model('inventory', InventorySchema);
module.exports = Inv;