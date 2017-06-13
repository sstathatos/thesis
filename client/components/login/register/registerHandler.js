let registerHandlerConstructor = (obj) => {
    let {username,password,email,name,dependencies}= obj;
    let {post,loginComponentConstructor} = dependencies;

    let registerHandler = () => {

        post({uri:`/register/?username=${username()}&password=${password()}&email=${email()}&name=${name()}`}, (err,response,body) => {

            document.getElementById('top').innerHTML = "";
            let loginComponent = loginComponentConstructor(dependencies);
            loginComponent.init();

        })
    };

    return registerHandler;
};

module.exports =registerHandlerConstructor;