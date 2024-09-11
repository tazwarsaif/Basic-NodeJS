const fs = require('fs');
const path = require("path");
const p = path.join(path.dirname(require.main.filename),'data','cart.json');


module.exports = class Cart {
    static addProduct(id, productPrice) {
      // Fetch the previous cart
      fs.readFile(p, (err, fileContent) => {
        let cart = { products: [], totalPrice: 0 };
        if (!err) {
          cart = JSON.parse(fileContent);
        }
        // Analyze the cart => Find existing product
        const existingProductIndex = cart.products.findIndex(
          prod => prod.id === id
        );
        const existingProduct = cart.products[existingProductIndex];
        let updatedProduct;
        // Add new product/ increase quantity
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }
        cart.totalPrice = Number(cart.totalPrice) +Number(productPrice);
        fs.writeFile(p, JSON.stringify(cart), err => {
          console.log(err);
        });
      });
    }

    static deleteProduct(id,productPrice){
      fs.readFile(p, (err,fileContent)=>{
        if(err) {
          return;
        }else {
          const updatedCart = {...JSON.parse(fileContent)};
          console.log(updatedCart);
          console.log(id);
          if(updatedCart.products.length===0){
            return;
          }
          var product;
            for(let i=0;i<updatedCart.products.length;i++){
              console.log(updatedCart.products[i].id,i);
                if((id)===(updatedCart.products[i].id)){
                    product = updatedCart.products[i];
                    console.log(product);
                    break
                }
            }
          const productQty = product.qty;
          function removeItem (p) {
            return p.id !== id;
          }
          updatedCart.products = updatedCart.products.filter(removeItem);
          updatedCart.totalPrice = updatedCart.totalPrice-productPrice * productQty;
          fs.writeFile(p, JSON.stringify(updatedCart), err => {
            console.log(err);
          });
        }
      })
    }

    static getProducts(cb) {
      fs.readFile(p, (err,fileContent)=>{
        const cart = JSON.parse(fileContent);
        if(err){
          cb(null)
        }else{
          cb(cart)
        }
      })
    }
  };
  



// module.exports = class Cart {
//     static addProduct(id,productPrice) {
//         //Fetch the previous cart
//         fs.readFile(p,(err,fileContent)=>{
//             let cart = {products : [], totalPrice: 0};
//             if(!err){
//                 cart = JSON.parse(fileContent);
//             }
//         })
//         // Analyze the cart => Find existing product
//         const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
//         const existingProduct = cart.products[existingProductIndex];
//         let updatedProduct;
//         // Add new product/ increase quatity
//         if(existingProduct) {
//             updatedProduct = {...existingProduct};
//             updatedProduct.qty = updatedProduct.qty +1;
//             cart.products = [...cart.products];
//             cart.products[existingProductIndex] = updatedProduct; 
//         } else {
//             updatedProduct = {id:id, qty:1};
//             cart.products = [...cart.products,updatedProduct];
//         }
//         cart.totalPrice = cart.totalPrice + productPrice;
//         fs.writeFile(p,JSON.stringify(cart),(err)=>{
//             console.log(err);
//         })
//     }
// }