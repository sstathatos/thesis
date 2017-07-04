
let init = (dependencies) => {

    let {get,navigationComponentConstructor,errorHandler,html,
        usersComponentConstructor,loginComponentConstructor,app} = dependencies;

    document.getElementById('app').className = 'pa5 h-auto bg-dark-green ';
    document.body.style.cursor = 'default';

    let message_div = html.create('div',{id:'messagediv',className:'pa2 grow bg-light-red ba b--solid bw2 b--light-red br2'});
    message_div.style.position = 'fixed';
    message_div.style.top = '70px';
    message_div.style.right = '50px';
    message_div.style.opacity = '1.0';

    html.mountTo(document.getElementById('top'))(message_div);


    let message_el =  html.create('span',{id:'message',className:' f5 b pa2 '});
    html.mountTo(message_div)(message_el);

    message_div.style.display = 'none';

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

