let loginHandlerConstructor  = (obj) => {
    let {username,password,post,isLoggedIn}= obj;

    let loginHandler = () => {
        post({uri:`/login/?username=${username()}&password=${password()}`}, (err,response,body) => {
            console.log(err,response,body);
            if (err) return isLoggedIn(new Error(err));
            let user = JSON.parse(body).data;
            store.setItem('username',user.username);
            store.setItem('user_id',user._id);
            return isLoggedIn(null,user._id);
        })
    };

    return loginHandler;
};

module.exports = loginHandlerConstructor;