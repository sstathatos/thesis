let html = require('./html');

let registerHandlerConstructor = (obj) => {
    let {username,password,email,name,post}= obj;

    let registerHandler = () => {

        post({uri:`/register/?username=${username()}&password=${password()}&email=${email()}&name=${name()}`}, (err,response,body) => {
            console.log({err,response,body});
        })
    };

    return registerHandler;
};

let registerComponentConstructor  = (obj) => {

    let {app,post} = obj;

    let init = () => {
        let register = html.create('div');

        let usernameInput = html.create('input',{placeholder : 'Username'});
        let nameInput = html.create('input',{placeholder : 'Name'});
        let emailInput = html.create('input',{placeholder : 'Email'});
        let passwordInput = html.create('input',{placeholder : 'Password',type : 'password'});
        let confirmInput = html.create('input',{placeholder : 'Confirm Password',type : 'password'});

        let registerHandler = registerHandlerConstructor({
            username: () => usernameInput.value,
            password: () => passwordInput.value,
            email: () => emailInput.value,
            name: () => nameInput.value,
            post
        });

        let registerButton = html.create('button',{textContent : 'Register'});
        let addListenerToRegisterButton = html.addListenerTo(registerButton);
        addListenerToRegisterButton('click',registerHandler);

        let mountToRegister = html.mountTo(register);

        [usernameInput,nameInput,emailInput,passwordInput,registerButton].map((el) => {
            mountToRegister(el);
        });

        html.mountTo(app)(register);

        return {register,registerButton,usernameInput,
            passwordInput,emailInput,nameInput};

    };

    return  {
        init
    }
};

module.exports =  registerComponentConstructor;