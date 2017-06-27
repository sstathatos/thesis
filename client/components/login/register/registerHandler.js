let registerHandlerConstructor = (obj) => {
    let {username,password,email,name,dependencies}= obj;
    let {post,loginComponentConstructor,errorHandler,validator} = dependencies;

    let registerHandler = () => {

        let errors = [username,password,email,name].map((field) => {
            if(validator.isEmpty(field())) {
                return 'error';
            }
        });

        if(errors.includes('error')) {
            errorHandler({err:'empty fields'});
            return;
        }

        else if(!validator.isEmail(email())) {
            errorHandler({err:'invalid email'});
            return;
        }

        post({uri:`/register/?username=${username()}&password=${password()}&email=${email()}&name=${name()}`}, (err,response,body) => {

            if(errorHandler({err,response})) {
                return;
            }

            document.getElementById('top').innerHTML = "";
            let loginComponent = loginComponentConstructor(dependencies);
            loginComponent.init();

        })
    };

    return registerHandler;
};

module.exports =registerHandlerConstructor;