let loginHandlerConstructor  = (obj) => {
    let {username,password,dependencies,isLoggedIn}= obj;
    let {post,errorHandler,validator} = dependencies;
    let loginHandler = () => {

        if(validator.isEmpty(username()) || validator.isEmpty(password())) {
            errorHandler({err:'empty fields'});
            return;
        }

        if(!validator.isAscii(password()) || !validator.isAscii(username()) ) {
            errorHandler({err:'invalid login'});
            return;
        }

        post({uri:`/login/?username=${username()}&password=${password()}`}, (err,response,body) => {

            if(errorHandler({err,response})) {
                return;
            }

            let user = JSON.parse(body).data;
            store.setItem('username',user.username);
            store.setItem('user_id',user._id);
            return isLoggedIn();
        })
    };

    return loginHandler;
};

module.exports = loginHandlerConstructor;