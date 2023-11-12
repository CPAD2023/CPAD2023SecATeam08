const router=require('express').Router();
const cartController=require('../controllers/cartController')
const {verifyToken} =require('../middleware/verifyToken')

router.get("/find",verifyToken, cartController.getcart);
router.post("/", verifyToken, cartController.addTocart);
router.post("/quantity",cartController.decrementCartItem);
router.delete("/:cartItemId",cartController.deleteCartItem);

module.exports=router;