const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const products = [];
const p = path.join(path.dirname(require.main.filename),'data','products.json');
const getAllProducts = cb => {
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    })
} 

module.exports = class Product {
    constructor(id,title,imageURL,description,price){
        this.id = id;
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
    save(){
        getAllProducts((products)=>{
            if(this.id){
                const existingProductIndex = products.findIndex(prod => prod.id == this.id);
                const updatedProducts =  [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                    console.log(err);
                })
            }else{
                
            this.id = Math.random();
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            })
            }
        })
    }
    static fetchAll(cb) {
        getAllProducts(cb);
    }

    static delete(id) {
        getAllProducts(products=>{
            var product;
            for(let i=0;i<products.length;i++){
                if(String(id)==products[i].id){
                    product = products[i];
                    break
                }
            }
            const updatedProducts = products.filter(p => p.id!=id);
            fs.writeFile(p, JSON.stringify(updatedProducts),(err)=>{
                if(!err){
                    Cart.deleteProduct(id,product.price);
                }
            })
        })
    } 

    static findbyID(id,cb) {
        getAllProducts(products=>{
            const product = products.find(p => p.id==id);
            cb(product);
        })
    }
}