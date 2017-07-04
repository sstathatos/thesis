let logoutHandlerConstructor = (obj) => {

    let {get,errorHandler,init} =  obj;
    let logoutHandler = () => {
        document.getElementById('BackToProjectButton').style.display='none';

        get({uri:'/logout'},(err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }

            document.getElementById('top').innerHTML = "";
            document.getElementById('app').innerHTML = "";


            init(obj);

        })

    };

    return logoutHandler;
};

module.exports = logoutHandlerConstructor;