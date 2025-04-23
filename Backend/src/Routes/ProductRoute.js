import express from 'express';
import { createProduct, updateProduct,deleteProduct, getAllProduct ,getSingleProduct, similarProduct,bestSellerProduct,newArrivalProduct} from '../Controllers/Product.js';
import { authMiddleware,isAdmin } from '../Middlewares/AuthMiddleware.js';
const router = express.Router();
router.post('/product',authMiddleware,isAdmin,createProduct)
router.get('/product/best-seller',bestSellerProduct)
router.get('/product/new-arrival',newArrivalProduct)
router.get('/product',getAllProduct)
router.put('/product/:productId',authMiddleware,isAdmin,updateProduct)
router.delete('/product/:productId',authMiddleware,isAdmin,deleteProduct)
router.get('/product/:id',getSingleProduct)
router.get('/product/:productId/similar',similarProduct)



export default router