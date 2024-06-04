import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { createProductController, updateProductController, deleteProductController, getProductPhotoController, getProductController, getProductsController, filterProductsController, productsCountController, productsListController, searchProductsController, relatedProductsController, categoryProductsController, braintreeTokenController, braintreePaymentController } from "../controllers/productController.js";
import formidable from "express-formidable";

// Router Object
const router = express.Router();

// Routing

// Create Product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// Update Product
router.put('/update-product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

// Delete Product
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

// Get Product Photo
router.get('/get-product-photo/:id', getProductPhotoController);

// Get Product
router.get('/get-product/:slug', getProductController);

// Get Products
router.get('/get-products', getProductsController);

// Filter Products
router.post('/filter-products', filterProductsController);

// Count Products
router.get('/products-count', productsCountController);

// Products Per Page
router.get('/products-list/:page', productsListController);

// Search Products
router.get('/search-products/:keyword', searchProductsController);

// Related Products
router.get('/related-products/:pid/:cid', relatedProductsController);

// Category Wise Products
router.get('/category-products/:slug', categoryProductsController);

// Payment Route

// Token Generate
router.get('/braintree/token', requireSignIn, braintreeTokenController);

// Payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

export default router;