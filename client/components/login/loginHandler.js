let loginHandlerConstructor  = (obj) => {
    let {username,password,post,isLoggedIn}= obj;

    let loginHandler = () => {
        post({uri:`/login/?username=${username()}&password=${password()}`}, (err,response,body) => {
            console.log(err,response,body);
            if (err) return isLoggedIn(new Error(err));
            return isLoggedIn(null,true);
        })
    };

    return loginHandler;
};

module.exports = loginHandlerConstructor;