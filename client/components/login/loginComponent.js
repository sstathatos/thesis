let loginComponentConstructor = (obj) => {
    let {app,html,loginHandlerConstructor,css,isLoggedInConstructor,registerComponentConstructor} = obj;

    let registerComponent = registerComponentConstructor(obj);

    let isLoggedIn = isLoggedInConstructor(obj);

    let init = () => {
        store.setItem('current','login');

        let login = html.create('div',{className:'db h-auto pt3 pl4'});

        let usernameInput = html.create('input',{placeholder : 'Username',className: css.input});
        let passwordInput = html.create('input',{placeholder : 'Password',type : 'password',className: `${css.input} green`});

        let loginHandler = loginHandlerConstructor({
            username: () => usernameInput.value,
            password: () => passwordInput.value,
            dependencies:obj,
            isLoggedIn
        });

        let loginButton = html.create('button',{'textContent' : 'Login',className:css.button});
        let addListenerToLoginButton = html.addListenerTo(loginButton);
        addListenerToLoginButton('click',loginHandler);
        let addListenerToPasswordInput = html.addListenerTo(passwordInput);
        addListenerToPasswordInput('keypress',(e) => {if (e.keyCode === 13)  loginHandler() });
        let addListenerToUsernameInput = html.addListenerTo(usernameInput);
        addListenerToUsernameInput('keypress',(e) => {if (e.keyCode === 13)  loginHandler() });

        let mountToLogin = html.mountTo(login);

        [usernameInput, passwordInput, loginButton].map((element) => mountToLogin(element));

        html.mountTo(app)(login);

        let registerEls = registerComponent.init();


        return {static:[login,loginButton,usernameInput,passwordInput,registerEls],dynamic:[]};
    };

    return {
        init
    }

};

module.exports = loginComponentConstructor;


