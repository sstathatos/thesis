let homeHandlerConstructor = (obj) => {

    let {usersComponentConstructor} = obj;

    let homeHandler = () => {

        document.getElementById('app').innerHTML = "";
        let usersComponent = usersComponentConstructor(obj);
        usersComponent.update(usersComponent.init());

    };

    return homeHandler;
};

module.exports = homeHandlerConstructor;