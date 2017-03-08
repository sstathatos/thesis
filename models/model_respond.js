function errorRespond(req,res,redirect,err,msg) {
    if(msg) {
        req.flash('error',msg);
    }
    console.log(err);
    res.status(302);
    res.redirect(redirect);
}

function successRedirect(req,res,redirect,msg) {
    if(msg) {
        req.flash('success',msg);
    }
    res.status(302);
    res.redirect(redirect);
}




module.exports= {
    errorRespond: errorRespond,
    successRedirect: successRedirect
};


// for(let i=0;i<result.length;i++) {
//     if (result[i].user_id.equals(req.user._id)) {
//         searches.filter(function (obj) {return obj._id.equals(result[i].obj_id);})[0]['bool']=true;
//     }
// }