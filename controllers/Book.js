const inventory = require('../models/Inventory');

exports.createInv = async (req, res) => {
    try {
        await inventory.create({...req.body, userId: req.user.id})
            .then((inv) => {
                res.send({ inv: inv });
            })
            .catch(err => {
                res.status(500).send({ err });
            })

    } catch (error) {
        res.status(501).send({ err: "Server error" });
    }
}


exports.fetchInv = async (req, res) => {
    try {
        await inventory.find()
            .then((invs) => {
                res.send({ invs : invs });
            })
            .catch(err => {
                res.status(500).send({ err });
            })

    } catch (error) {
        res.status(501).send({ err: "Server error" });
    }
};