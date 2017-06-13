let logoutHandlerConstructor = (obj) => {

    let {get,errorHandler,loginComponentConstructor} =  obj;
    let logoutHandler = () => {
        get({uri:'/logout'},(err,response,body) => {
            if (err)  return errorHandler(err);

            document.getElementById('top').innerHTML = "";
            document.getElementById('app').innerHTML = "";

            let loginComponent = loginComponentConstructor(obj);
            loginComponent.init();

        })

    };

    return logoutHandler;
};

module.exports = logoutHandlerConstructor;