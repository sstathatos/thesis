let navigationComponentConstructor = (obj) => {

    let {top,html,homeHandlerConstructor,searchHandlerConstructor,
        logoutHandlerConstructor,backProjectHandlerConstructor,css} =obj;

    let init = () => {

        let navigation_div = html.create('div',{className:'pt2 pl4 pr4 bg-white'});

        let home_button = html.create('button',{textContent:'Home',className:css.button});

        let logout_button =  html.create('button',{textContent:'Logout',className:css.button});

        let backproject_button = html.create('button',{textContent:'Back to Project',id:'BackToProjectButton',className:`${css.button}`});
        backproject_button.style.display = 'none';

        let search_input =  html.create('input',{className:css.input});
        search_input.style.cssFloat ="right";

        let search_button = html.create('button',{textContent:'Search User!',className:css.button});
        search_button.style.cssFloat ="right";


        let searchHandler =  searchHandlerConstructor({
            search: () =>search_input.value,
            dependencies: obj
        });
        let addListenerToSearch =  html.addListenerTo(search_button);
        addListenerToSearch('click',searchHandler);
        let addListenerToInput =  html.addListenerTo(search_input);
        addListenerToInput('keypress',(e) => {if (e.keyCode === 13)  searchHandler() });


        let addListenerToHome = html.addListenerTo(home_button);
        let homeHandler = homeHandlerConstructor(obj);
        addListenerToHome('click',homeHandler);

        let addListenerToLogout = html.addListenerTo(logout_button);
        let logoutHandler = logoutHandlerConstructor(obj);
        addListenerToLogout('click',logoutHandler);

        let addListenerToProjectBack = html.addListenerTo(backproject_button);
        let backProjectHandler = backProjectHandlerConstructor(obj);
        addListenerToProjectBack('click',backProjectHandler);

        let mountToDiv = html.mountTo(navigation_div);
        [home_button,logout_button,backproject_button,search_button,search_input].map((el)=> {
            mountToDiv(el);
        });

        html.mountTo(top)(navigation_div);

        return {static:[navigation_div,home_button,logout_button,backproject_button],dynamic:[]}

    };

    return {init};

};
module.exports= navigationComponentConstructor;