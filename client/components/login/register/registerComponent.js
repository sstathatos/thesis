let registerComponentConstructor  = (obj) => {

    let {top,registerHandlerConstructor,html} = obj;

    let init = () => {
        let register = html.create('div');

        let usernameInput = html.create('input',{placeholder : 'Username'});
        let nameInput = html.create('input',{placeholder : 'Name'});
        let emailInput = html.create('input',{placeholder : 'Email'});
        let passwordInput = html.create('input',{placeholder : 'Password',type : 'password'});

        let registerHandler = registerHandlerConstructor({
            username: () => usernameInput.value,
            password: () => passwordInput.value,
            email: () => emailInput.value,
            name: () => nameInput.value,
            dependencies:obj
        });

        let registerButton = html.create('button',{textContent : 'Register'});
        let addListenerToRegisterButton = html.addListenerTo(registerButton);
        addListenerToRegisterButton('click',registerHandler);

        let mountToRegister = html.mountTo(register);

        [usernameInput,nameInput,emailInput,passwordInput,registerButton].map((el) => {
            mountToRegister(el);
        });

        html.mountTo(top)(register);

        return {static:[register,registerButton,usernameInput,
            passwordInput,emailInput,nameInput],dynamic:[]};

    };

    return  {
        init
    }
};

module.exports =  registerComponentConstructor;