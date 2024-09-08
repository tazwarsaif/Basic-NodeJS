const Product = require('../models/product');

exports.getAddProds = (req,res,next)=>{
    console.log('In the Add');
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add',
        editing: false
    });
}

exports.addedProds = (req,res,next)=>{
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description =  req.body.description
    const product = new Product(null,title,imageURL,description,price);
    product.save();
    res.redirect('/');
}


exports.getEditProds = (req,res,next)=>{
    console.log('In the Add');
    const editMode = req.query.edit; 
    if(!editMode){
        return res.redirect('/');
    }
    const prodID = req.params.productID;
    Product.findbyID(prodID,(product)=>{
        if(!product){
            res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
}

exports.postEditProduct = (req,res,next)=> {
    const prodID = req.body.productID;
    const updatedTitle =  req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageURL = req.body.imageURL;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodID, updatedTitle,updatedImageURL,updatedDesc,updatedPrice);
    updatedProduct.save();
    res.redirect("/admin/products");
}

exports.getProducts = (req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products',{
            prods: products,
            pageTitle: 'Admin Products',
            path: "/admin/products", 
        })
    })
    console.log(2222);
}

exports.postDeleteProduct = (req,res,next) => {
    const prodID = req.body.productID;
    Product.delete(prodID);
    res.redirect('/admin/products');
}