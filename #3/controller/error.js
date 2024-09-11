exports.getError404 = (req,res,next)=>{
    res.status(404).render('notfound',{pageTitle:'Page not Found!',path:'/notfound'});
};