
let init = (dependencies) => {

    let {get,navigationComponentConstructor,errorHandler,
        usersComponentConstructor,loginComponentConstructor} = dependencies;

    get({uri: '/isauthenticated'}, (err, response, body) => {

        if(errorHandler({err,response})) {
            return;
        }

        let perm = JSON.parse(body);

        if (perm) {
            let navigationComponent = navigationComponentConstructor(dependencies);
            navigationComponent.init();

            let usersComponent = usersComponentConstructor(dependencies);
            usersComponent.update(usersComponent.init());
        }

        else {
            let loginComponent = loginComponentConstructor(dependencies);
            loginComponent.init();
        }

    });

    return init;

};

module.exports = init;

