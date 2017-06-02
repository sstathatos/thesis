let html = require('../html');

let loginComponentConstructor = (obj) => {
    let {app,post,loginHandlerConstructor,errorHandler,isLoggedIn} = obj;

    let init = () => {
        let login = html.create('div');

        let usernameInput = html.create('input',{placeholder : 'Username'});
        let passwordInput = html.create('input',{placeholder : 'Password',type : 'password'});

        let loginHandler = loginHandlerConstructor({
            username: () => usernameInput.value,
            password: () => passwordInput.value,
            post,
            isLoggedIn
        });

        let loginButton = html.create('button',{'textContent' : 'Login'});
        let addListenerToLoginButton = html.addListenerTo(loginButton);
        addListenerToLoginButton('click',loginHandler);

        let mountToLogin = html.mountTo(login);

        [usernameInput, passwordInput, loginButton].map((element) => mountToLogin(element));

        html.mountTo(app)(login);

        return {static:[login,loginButton,usernameInput,passwordInput],dynamic:[]};
    };

    return {
        init
    }

};

module.exports = loginComponentConstructor;


