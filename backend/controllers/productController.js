import validator from "validator";
import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const createProductController = async (req, res) => {
     
     try{
          const {name, description, price, discount, category, quantity, shipping} = req.fields;
          const { photo } = req.files;

          // Fields are Empty
          if(!name || !description || !price || !discount || !category || !quantity || !shipping){
               return res.status(200).send({
                    success: false,
                    message: 'One or More Details are not Filled',
               });
          }

          // Check Product Already Exist with Same Name
          const existingProduct = await productModel.findOne({name});
          if(existingProduct){
               return res.status(200).send({
                    success: false,
                    message: 'Already, Product is Exist with Same Name',
               });
          }

          // Photo size Check
          if(!photo || (photo.size > 1000000)){
               return res.status(200).send({
                    success: false,
                    message: 'Photo should be size of less then 10MB',
               });
          }

          // Validation
          if(!validator.isAscii(name)){
               return res.status(200).send({
                   success: false,
                   message: 'Enter Valid Name',
               });
          }
          else if(!validator.isAscii(description)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Description',
               });
          }
          else if(!validator.isNumeric(price)){
               return res.status(200).send({
                   success: false,
                   message: 'Enter Valid Price',
               });
          }
          else if(!validator.isNumeric(discount)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Discount',
               });
          }
          else if(!validator.isAscii(category)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Category',
               });
          }
          else if(!validator.isNumeric(quantity)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Quantity',
               });
          }
          else if(!validator.isBoolean(shipping)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Shipping',
               });
          }

          const product = new productModel({...req.fields, slug: slugify(name)});
          if(photo){
               product.photo.data = fs.readFileSync(photo.path);
               product.photo.contentType = photo.type;
          }
          await product.save();

          // Successfully Created Product
          res.status(201).send({
               success: true,
               message: `Successfully product created`,
               product: product,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Create Product',
               error: error,
           });
     }

};

const updateProductController = async (req, res) => {

     try{
          const {name, description, price, discount, category, quantity, shipping} = req.fields;
          const { photo } = req.files;
          const { id } = req.params;

          // Fields are Empty
          if(!name || !description || !price || !discount || !category || !quantity || !shipping){
               return res.status(200).send({
                    success: false,
                    message: 'One or More Details are not Filled',
               });
          }

          // Check Product Already Exist with Same Name
          const existingProduct = await productModel.findOne({name});
          if(existingProduct){
               return res.status(200).send({
                    success: false,
                    message: 'Already, Product is Exist with Same Name',
               });
          }

          // Photo size Check
          if(!photo || (photo.size > 1000000)){
               return res.status(200).send({
                    success: false,
                    message: 'Photo should be size of less then 10MB',
               });
          }

          // Validation
          if(!validator.isAscii(name)){
               return res.status(200).send({
                   success: false,
                   message: 'Enter Valid Name',
               });
          }
          else if(!validator.isAscii(description)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Description',
               });
          }
          else if(!validator.isNumeric(price)){
               return res.status(200).send({
                   success: false,
                   message: 'Enter Valid Price',
               });
          }
          else if(!validator.isNumeric(discount)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Discount',
               });
          }
          else if(!validator.isAscii(category)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Category',
               });
          }
          else if(!validator.isNumeric(quantity)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Quantity',
               });
          }
          else if(!validator.isBoolean(shipping)){
               return res.status(200).send({
                    success: false,
                    message: 'Enter Valid Shipping',
               });
          }

          const product = await productModel.findByIdAndUpdate(id, {...req.fields, slug: slugify(name)}, {new: true});
          if(photo){
               product.photo.data = fs.readFileSync(photo.path);
               product.photo.contentType = photo.type;
          }
          await product.save();

          // Successfully Updated Product
          res.status(201).send({
               success: true,
               message: `Successfully product updated`,
               product: product,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Update Product',
               error: error,
           });
     }

};

const deleteProductController = async (req, res) => {

     try{
          const { id } = req.params;

          const product = await productModel.findByIdAndDelete(id).select('-photo');
          
          // Successfully Deleted Product
          res.status(201).send({
               success: true,
               message: 'Successfully Deleted product',
               product: product,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Delete Product',
               error: error,
          });
     }

};

const getProductPhotoController = async (req, res) => {

     try{
          const { id } = req.params;

          const productPhoto = await productModel.findById(id).select('photo');
          if(productPhoto.photo.data){
               res.set('Content-type', productPhoto.photo.contentType);
               return res.status(201).send(productPhoto.photo.data);
          }
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Getting Product Photo',
               error: error,
          });
     }

};

const getProductController = async (req, res) => {

     try{
          const { slug } = req.params;

          const product = await productModel.findOne({slug}).populate('category').select("-photo");

          // Successfully Got Product
          res.status(201).send({
               success: true,
               message: 'Successfully got product',
               product: product,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Getting Product',
               error: error,
          });
     }

};

const getProductsController = async (req, res) => {

     try{
          const products = await productModel.find({}).populate('category').select("-photo").limit(10).sort({ createdAt: -1 });

          // Successfully Got Products
          res.status(201).send({
               success: true,
               productsCount: products.length,
               message: 'Successfully got products',
               products: products,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Getting Products',
               error: error,
          });
     }

};

const filterProductsController = async (req, res) => {

     try{
          const {filteredCategories, filteredPrice} = req.body;
          let args = {};
          if(filteredCategories.length > 0) args.category = filteredCategories;
          if(filteredPrice.length) args.price = {$gte: filteredPrice[0], $lte: filteredPrice[1]};

          const products = await productModel.find(args);

          // Successfully Got Products
          res.status(201).send({
               success: true,
               productsCount: products.length,
               message: 'Successfully got filtered products',
               products: products,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Filtering The Products',
               error: error,
          });
     }
     
};

const productsCountController = async (req, res) => {

     try{
          const productsCount = await productModel.find({}).estimatedDocumentCount();

          // Successfully Count Products
          res.status(201).send({
               success: true,
               message: 'Successfully counted products',
               productsCount: productsCount,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Counting The Products',
               error: error,
          });
     }

};

const productsListController = async (req, res) => {

     try{
          const productsPerPage = 5;
          const page = req.params.page ? req.params.page : 1;
          const products = await productModel.find({}).select("-photo").skip((page - 1) * productsPerPage).limit(productsPerPage).sort({ createdAt: -1 });

          // Successfully Count Products
          res.status(201).send({
               success: true,
               productsCount: products.length,
               message: 'Successfully got products',
               products: products,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Getting Products',
               error: error,
          });
     }

};

const searchProductsController = async (req, res) => {

     try{
          const { keyword } = req.params;

          const searchProducts = await productModel.find({
               $or: [
                    {name: {$regex: keyword, $options: "i"}},
                    {description: {$regex: keyword, $options: "i"}},
               ],
          }).select("-photo");
          res.json(searchProducts);
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Searching Products',
               error: error,
          });
     }

};

const relatedProductsController = async (req, res) => {

     try{
          const { pid, cid } = req.params;

          const products = await productModel.find({ category: cid, _id: {$ne: pid}}).select("-photo").limit(5).populate("category");

          // Successfully Got Products
          res.status(201).send({
               success: true,
               message: 'Successfully got products',
               products: products,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Getting Products',
               error: error,
          });
     }

};

const categoryProductsController = async (req, res) => {

     try{
          const { slug } = req.params;

          const category = await categoryModel.findOne({slug});
          const products = await productModel.find({ category }).select("-photo").populate("category");

          // Successfully Got Products
          res.status(201).send({
               success: true,
               message: 'Successfully got products',
               category: category,
               products: products,
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Getting Products',
               error: error,
          });
     }

};

// Payment Gaateway
var gateway = new braintree.BraintreeGateway({
     environment: braintree.Environment.Sandbox,
     merchantId: process.env.BRAINTREE_MERCHANT_ID,
     publicKey: process.env.BRAINTREE_PUBLIC_KEY,
     privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const braintreeTokenController = async (req, res) => {

     try{
          gateway.clientToken.generate({}, function (error, response){
               if(error){
                    console.log(error);
                    res.status(500).send({
                         success: false,
                         message: "Error in Generate Token",
                         error: error,
                    });
               }
               else{
                    // Successfully Generate Token
                    res.status(201).send({
                         success: true,
                         message: "Generate Token Successful",
                         response: response,
                    });
               }
          });
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: "Error in Generate Token",
               error: error,
          });
     }

};

const braintreePaymentController = async (req, res) => {

     try{
          const {cart, nonce} = req.body;

          let total = 0;
          cart?.map((item) => {total += item.price;});

          let newTransaction = gateway.transaction.sale(
               {
               amount: total,
               paymentMethodNonce: nonce,
               options: {
                    submitForSettlement: true,
               },
               },
               function (error, response){
                    if(response){
                         const order = new orderModel({
                              products: cart,
                              payment: response,
                              buyer: req.user._id,
                         }).save();

                         // Payment Successful
                         res.status(201).send({
                              success: true,
                              message: "Payment Successful",
                              order: order,
                         });
                    }
                    else{
                         // Payment Error
                         console.log(error);
                         res.status(500).send({
                              success: false,
                              message: "Error in Payment",
                              error: error,
                         });
                    }
               }
          );
     }
     catch(error){
          console.log(error);
          res.status(500).send({
               success: false,
               message: 'Error in Payment',
               error: error,
          });
     }

};

export { createProductController, updateProductController, deleteProductController, getProductPhotoController, getProductController, getProductsController, filterProductsController, productsCountController, productsListController, searchProductsController, relatedProductsController, categoryProductsController, braintreeTokenController, braintreePaymentController };