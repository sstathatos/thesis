let registerComponentConstructor  = (obj) => {

    let {app,post} = obj;

    let instances = {};
    let registerHandler = (e) => {
        let {usernameInput,passwordInput,confirmInput,emailInput,nameInput} = instances;

        console.log(usernameInput.value,passwordInput.value,confirmInput.value,emailInput.value,nameInput.value);

        post({uri:`/register/?username=${usernameInput.value}&password=${passwordInput.value}&email=${emailInput.value}&name=${nameInput.value}`}, (err,response,body) => {
            console.log({err,response,body});
        })
    };


    let mount = () => {
        let register = document.createElement('div');

        let usernameInput = document.createElement('input');
        usernameInput.placeholder = 'Username';
        let nameInput = document.createElement('input');
        nameInput.placeholder = 'Name';
        let emailInput = document.createElement('input');
        emailInput.placeholder = 'Email';
        let passwordInput = document.createElement('input');
        passwordInput.placeholder = 'Password';
        passwordInput.type = 'password';
        let confirmInput = document.createElement('input');
        confirmInput.placeholder = 'Confirm Password';
        confirmInput.type = 'password';

        let registerButton = document.createElement('button');
        registerButton.textContent = 'Register';
        registerButton.addEventListener('click',registerHandler,true);

        register.appendChild(usernameInput);
        register.appendChild(nameInput);
        register.appendChild(emailInput);
        register.appendChild(passwordInput);
        register.appendChild(confirmInput);
        register.appendChild(registerButton);

        app.appendChild(register);

        instances.usernameInput = usernameInput;
        instances.passwordInput = passwordInput;
        instances.confirmInput = confirmInput;
        instances.emailInput = emailInput;
        instances.nameInput = nameInput;
    };

    return  {
        mount
    }
};

module.exports =  registerComponentConstructor;