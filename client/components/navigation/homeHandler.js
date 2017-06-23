let homeHandlerConstructor = (obj) => {

    let {usersComponentConstructor} = obj;

    let homeHandler = () => {

        document.getElementById('app').innerHTML = "";
        document.getElementById('BackToProjectButton').style.display='none';

        let usersComponent = usersComponentConstructor(obj);
        usersComponent.update(usersComponent.init());

    };

    return homeHandler;
};

module.exports = homeHandlerConstructor;