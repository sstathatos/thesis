let navigationComponentConstructor = (obj) => {

    let {top,html,homeHandlerConstructor,logoutHandlerConstructor} =obj;

    let init = () => {

        let navigation_div = html.create('div');

        let home_button = html.create('button',{textContent:'Home'});
        let logout_button =  html.create('button',{textContent:'Logout'});

        let addListenerToHome = html.addListenerTo(home_button);
        let homeHandler = homeHandlerConstructor(obj);
        addListenerToHome('click',homeHandler);

        let addListenerToLogout = html.addListenerTo(logout_button);
        let logoutHandler = logoutHandlerConstructor(obj);
        addListenerToLogout('click',logoutHandler);

        let mountToDiv = html.mountTo(navigation_div);
        [home_button,logout_button].map((el)=> {
            mountToDiv(el);
        });

        html.mountTo(top)(navigation_div);

        return {static:[navigation_div,home_button,logout_button],dynamic:[]}

    };

    return {init};

};
module.exports= navigationComponentConstructor;