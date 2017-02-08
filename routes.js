var express= require('express');
var router= express.Router();

router.all('*',  function(req,res) {
    console.log(req.baseUrl);
    console.log(req.params);
    console.log(req.path);
    console.log(req.body);
    console.log(req.cookies);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.method);
    console.log(req.header);

});


module.exports = router;
