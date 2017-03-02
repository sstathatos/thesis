router.get('*', function(req,res) {
    if(method==get)  getmodel(req,res);
    else throw error;
})


function getmodel(req,res) {
    if (req.query | req.body | req.params)  search_request(req,res);
    else {
        res.status
        res.render
    }

}

function search_request(req,res)