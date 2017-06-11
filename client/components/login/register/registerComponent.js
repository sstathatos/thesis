let registerComponentConstructor  = (obj) => {

    let {app,post,registerHandlerConstructor,html} = obj;

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

        return {static:[register,registerButton,usernameInput,
            passwordInput,emailInput,nameInput],dynamic:[]};

    };

    return  {
        init
    }
};

module.exports =  registerComponentConstructor;