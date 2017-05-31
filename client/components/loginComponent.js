
let loginComponentConstructor = (obj) => {
    let {app,post} = obj;

    let instances = {};
    let loginHandler = (e) => {
        let {usernameInput,passwordInput} = instances;

        console.log(usernameInput.value,passwordInput.value);
        post({uri:`/login/?username=${usernameInput.value}&password=${passwordInput.value}`}, (err,response,body) => {

            console.log({err,response,body});
        })
    };

    let mount = () => {
        let login = document.createElement('div');

        let usernameInput = document.createElement('input');
        usernameInput.placeholder = 'Username';

        let passwordInput = document.createElement('input');
        passwordInput.placeholder = 'Password';
        passwordInput.type = 'password';

        let loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.addEventListener('click',loginHandler,true);

        login.appendChild(usernameInput);
        login.appendChild(passwordInput);
        login.appendChild(loginButton);

        app.appendChild(login);
        instances.login = login;
        instances.loginButton = loginButton;
        instances.usernameInput = usernameInput;
        instances.passwordInput = passwordInput;
    };

    let unmount = () => {
        instances.loginButton.removeListener('click',loginHandler,true);
        app.removeChild(instances.login);

    };

    return {
        mount,unmount
    }

};

module.exports = loginComponentConstructor;


