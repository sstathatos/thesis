
let init = (dependencies) => {

    let {get,navigationComponentConstructor,errorHandler,
        usersComponentConstructor,loginComponentConstructor,app} = dependencies;

    document.getElementById('app').className = 'pa2 h-auto light-gray bg-dark-green';
    document.body.style.cursor = 'default';


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

