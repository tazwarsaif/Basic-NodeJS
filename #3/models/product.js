const db = require('../util/database');
const Cart = require('./cart');

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
        return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price,this.imageURL, this.description]);
    }
    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }

    static delete(id) {
        
    } 

    static findbyID(id) {
     return db.execute('SELECT * FROM products where products.id=?',[id]);
    }
}