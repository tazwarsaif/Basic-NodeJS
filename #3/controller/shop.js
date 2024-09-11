const Product = require('../models/product');
const Cart =  require('../models/cart');

exports.getProducts = (req,res,next)=>{
    Product.fetchAll().
    then(([rows,fieldData])=>{
        res.render('shop/product-list',{
            prods: rows,
            pageTitle: "All Products",
            path: "/products"
        });
    }).
    catch(err => {console.log(err)});
}

exports.getProduct = (req,res,next) =>{
    const productID = req.params.productID;
    Product.findbyID(productID).
    then(([product])=>{
        res.render('shop/product-details',
            {product: product[0],
                pageTitle: product.title,
                path:'/products'});
            console.log(product)}).
    catch(err => {console.log(err)});

}

exports.getIndex = (req,res,next) => {
    Product.fetchAll().
    then(([rows,fieldData])=>{res.render('shop/index',{
        prods: rows,
        pageTitle: "Shop",
        path: "/"
    });}).
    catch(err => {
        console.log(err);
    });
}

exports.getCart = (req,res,next) => {
    Cart.getProducts(cart=>{
        Product.fetchAll((products)=>{
            const cartProducts =[];
            for (product of products){
                let cartProductData;
                // let cartProductData = cart.products.find(prod => {prod.id===product.id});
                for(let i=0;i<cart.products.length;i++){
                    if(cart.products[i].id===product.id){
                        cartProductData = cart.products[i];
                        break;
                    }
                }
                console.log(cartProductData);
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart',{
                pageTitle: "My Cart",
                path: "/cart",
                products: cartProducts
            });
        });
    })
};

exports.postCart = (req,res,next) => {
    const prodID = req.body.productID;
    Product.findbyID(prodID,(product)=>{
        Cart.addProduct(prodID,product.price);
    })
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req,res,next) => {
    const prodID = req.body.productID;
    Product.findbyID(prodID,(product)=>{
        Cart.deleteProduct(prodID,product.price);
    })
    res.redirect('/cart');
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}

exports.getOrders = (req,res,next) => {
    Product.fetchAll((products)=>{
        res.render('shop/orders',{
            prods: products,
            pageTitle: "My Orders",
            path: "/orders"
        });
    });
};