let isLoggedInConstructor = (obj) => {
    let {errorHandler,usersComponentConstructor,app,get,navigationComponentConstructor} =obj;
    let isLoggedIn = (err,id) => {
        if (err) return errorHandler(new Error(err));

        document.getElementById('top').innerHTML = "";

        let navigationComponent = navigationComponentConstructor(obj);
        navigationComponent.init();

        let usersComponent = usersComponentConstructor(obj);
        usersComponent.update(usersComponent.init());

    };
    return isLoggedIn;
};

module.exports = isLoggedInConstructor;