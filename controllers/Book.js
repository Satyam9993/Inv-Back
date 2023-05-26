const inventory = require('../models/Inventory');

exports.createInv = async (req, res) => {
    try {
        await inventory.create({ ...req.body, userId: req.user.id })
            .then((inv) => {
                res.send({ inv: inv });
            })
            .catch(err => {
                res.status(500).send({ err });
            })

    } catch (error) {
        res.status(501).send({ err: "Server error" });
    }
};

exports.fetchInv = async (req, res) => {
    try {
        await inventory.find()
            .then((invs) => {
                res.send({ invs: invs });
            })
            .catch(err => {
                res.status(500).send({ err });
            })

    } catch (error) {
        res.status(501).send({ err: "Server error" });
    }
};

exports.updateInv = async (req, res) => {
    try {
        await inventory.findByIdAndUpdate({ _id: req.params.invId },
            {
                $set: {
                    itemName: req.body.itemName,
                    image: req.body.image,
                    category: req.body.category,
                    code: req.body.code,
                    description: req.body.description,
                    inclusivetax: req.body.inclusivetax,
                    lowstockunit: req.body.lowstockunit,
                    openstock: req.body.openstock,
                    purchaseprice: req.body.purchaseprice,
                    unit: req.body.unit,
                    stockwarning: req.body.stockwarning,
                    taxrate: req.body.taxrate
                }
            })
            .then(async (inv) => {
                await inventory.findById({ _id: inv._id }).then((inventory) => {
                    res.send({ inv: inventory });
                }).catch((err) => {
                    res.status(502).send({ err });
                });
            })
            .catch(err => {
                res.status(500).send({ err });
            })

    } catch (error) {
        res.status(501).send({ err: "Server error" });
    }
};

exports.deleteInv = async (req, res) => {
    try {
        const { ids } = req.body;
        const deletedInventory = await inventory.deleteMany({ _id: { $in: ids } });

        if (deletedInventory.deletedCount === 0) {
            return res.status(404).json({ error: 'No inventories found' });
        }

        res.status(200).json({ message: 'Inventories deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.adjustInv = async (req, res) => {
    try {
        const data = {
            adjuststock : req.body.adjuststock,
            isAdd : req.body.isAdd,
            adjustby: req.user.id,
            remark : req.body.remark
        };
        const stock = req.body.isAdd ? (Number(req.body.openstock) + Number(req.body.adjuststock)) : (Number(req.body.openstock) - Number(req.body.adjuststock))
        await inventory.findByIdAndUpdate({ _id: req.params.invId },{
            $push:{
                adjust : data
            },
            $set:{
                openstock : stock
            }
        }).then(async (inv) => {
            await inventory.findById({ _id: inv._id }).then((inventory) => {
                res.send({ inv: inventory });
            }).catch((err) => {
                res.status(502).send({ err });
            });
        })
        .catch(err => {
            res.status(500).send({ err });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};