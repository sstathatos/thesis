let registerComponentConstructor  = (obj) => {

    let {app,registerHandlerConstructor,css,html} = obj;

    let init = () => {
        let register = html.create('div',{className:'pt6 h-auto pl4'});

        let subregister_div = html.create('div',{className:' fl w-third'});
        let register_title =  html.create('h2',{textContent:'Register to PlotNet:',className:"ph3 mb2 pv2 db f3"});


        let usernameInput = html.create('input',{placeholder:'Username' ,className:`${css.input} db mv2`});

        let nameInput = html.create('input',{placeholder : 'Name',className:`${css.input} db mv2`});

        let emailInput = html.create('input',{placeholder : 'Email',className:`${css.input} db mv2`});

        let passwordInput = html.create('input',{placeholder : 'Password',type : 'password',className:`${css.input} db mv2`});

        let registerHandler = registerHandlerConstructor({
            username: () => usernameInput.value,
            password: () => passwordInput.value,
            email: () => emailInput.value,
            name: () => nameInput.value,
            dependencies:obj
        });

        let registerButton = html.create('button',{textContent : 'Register',className:css.button});
        let addListenerToRegisterButton = html.addListenerTo(registerButton);
        addListenerToRegisterButton('click',registerHandler);
        let addListenerToPasswordInput = html.addListenerTo(passwordInput);
        addListenerToPasswordInput('keypress',(e) => {if (e.keyCode === 13)  registerHandler() });


        let mountToSubRegister = html.mountTo(subregister_div);
        [register_title,usernameInput,nameInput,emailInput,passwordInput,registerButton].map((el) => {
            mountToSubRegister(el);
        });


        let subregister_div2 = html.create('div',{className:' fl w-two-thirds vh-80 mw6'});
        let h1_text = html.create('h1',{textContent:'Welcome to PlotNet.',className:'f1 light-yellow'});
        let h3_text = html.create('h3',{textContent:'An efficient user friendly interface for plotting multidimentional datasets.',className:'f3 narrow'});

        let mountToSubregister2 = html.mountTo(subregister_div2);
        [h1_text,h3_text].map((el)=> {
            mountToSubregister2(el);
        });

        let mountToRegister = html.mountTo(register);
        [subregister_div,subregister_div2].map((el) => {
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