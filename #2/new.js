const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const get404 = require('./controller/error')
const db = require('./util/database');

const app = express()

app.set('view engine','ejs');
app.set('views','views');

// db.execute('SELECT * FROM products;').
//     then((result)=>{
//         console.log(result);
//     }).
//     catch((err)=>{
//         console.log(err);
//     });

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))


app.use('/admin',adminRouter.router);
app.use(shopRouter);

// app.use((req,res,next)=>{
//     res.status(404).sendFile(path.join(__dirname,'views','notfound.html'));
// })

app.use(get404.getError404)

app.listen(3000);