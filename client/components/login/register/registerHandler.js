let registerHandlerConstructor = (obj) => {
    let {username,password,email,name,post}= obj;

    let registerHandler = () => {

        post({uri:`/register/?username=${username()}&password=${password()}&email=${email()}&name=${name()}`}, (err,response,body) => {
            console.log({err,response,body});
        })
    };

    return registerHandler;
};

module.exports =registerHandlerConstructor;