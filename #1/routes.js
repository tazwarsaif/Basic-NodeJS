const fs = require('fs');

function handler(req,res) {
    const url = req.url;
    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html><head><title>Fill the form</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body></html>');
        return res.end();
    }else if(url === '/message' && req.method==='POST'){
        const body = [];
        console.log(2222)
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
            console.log(33333);
        })
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const tex = parsedBody.split('=')[1];
            fs.writeFile('message.txt',tex,(err)=>{
                res.statusCode = 302;
                res.setHeader('Location',"/");
                return res.end();
            });
        })
    }
    
    res.setHeader('Content-Type','text/html');
    res.write('<html><head><title>My GG Hadid</title></head>');
    res.write('<body><h1>Hey, Whadup?</h1></body></html>');
    res.end();
}

module.exports = handler;