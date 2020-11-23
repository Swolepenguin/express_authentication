const { render } = require("ejs")

module.exports = (req,res,next)=>{
    if (!req.user){
        req.flash('error', 'you must be signed in to acess this page')
        res.redirect('/auth/login')
    }else{
        next();
    }
}