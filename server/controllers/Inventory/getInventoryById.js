const Inventory = require('../../models/inventorySchema');

const getInventoryById = async (req , res) =>{
    try {
       const { id } = req.params;

       const inventory = await Inventory.findById(id);

       if(!inventory) {
        return res.json({
            message : "Inventory Not Found"
        })
       }
      
       return res.status(201).json({
        msg : "Fetched successfully",
        inventory
       })

    } catch (error) {
        return res.json({
            message : "something went wrong"
        })
    }
    

}

module.exports = {getInventoryById};