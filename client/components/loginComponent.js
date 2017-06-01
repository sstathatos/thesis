let html = require('./html');



let loginHandlerConstructor  = (obj) => {
    let {username,password,post}= obj;

    let loginHandler = () => {
        post({uri:`/login/?username=${username()}&password=${password()}`}, (err,response,body) => {
            console.log({err,response,body});
        })
    };

    return loginHandler;
};

let loginComponentConstructor = (obj) => {
    let {app, post} = obj;

    let init = () => {
        let login = html.create('div');

        let usernameInput = html.create('input',{placeholder : 'Username'});
        let passwordInput = html.create('input',{placeholder : 'Password',type : 'password'});

        let loginHandler = loginHandlerConstructor({
            username: () => usernameInput.value,
            password: () => passwordInput.value,
            post
        });

        let loginButton = html.create('button',{'textContent' : 'Login'});
        let addListenerToLoginButton = html.addListenerTo(loginButton);
        addListenerToLoginButton('click',loginHandler);

        let mountToLogin = html.mountTo(login);

        [usernameInput, passwordInput, loginButton].map((element) => mountToLogin(element));

        html.mountTo(app)(login);

        return {login,loginButton,usernameInput,passwordInput};
    };

    return {
        init
    }

};

module.exports = loginComponentConstructor;


