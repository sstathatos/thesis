let logoutHandlerConstructor = (obj) => {

    let {get,errorHandler,loginComponentConstructor} =  obj;
    let logoutHandler = () => {
        document.getElementById('BackToProjectButton').style.display='none';

        get({uri:'/logout'},(err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }

            document.getElementById('top').innerHTML = "";
            document.getElementById('app').innerHTML = "";


            let loginComponent = loginComponentConstructor(obj);
            loginComponent.init();

        })

    };

    return logoutHandler;
};

module.exports = logoutHandlerConstructor;