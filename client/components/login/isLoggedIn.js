let isLoggedInConstructor = (obj) => {
    let {usersComponentConstructor,navigationComponentConstructor} =obj;
    let isLoggedIn = () => {

        document.getElementById('app').innerHTML = "";

        let navigationComponent = navigationComponentConstructor(obj);
        navigationComponent.init();

        let usersComponent = usersComponentConstructor(obj);
        usersComponent.update(usersComponent.init());

    };
    return isLoggedIn;
};

module.exports = isLoggedInConstructor;