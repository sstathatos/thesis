let isLoggedInConstructor = (obj) => {
    let {errorHandler,usersComponentConstructor,app,get} =obj;
    let isLoggedIn = (err,id) => {
        if (err) return errorHandler(new Error(err));
        let usersComponent = usersComponentConstructor(obj);
        usersComponent.update(usersComponent.init());
    };
    return isLoggedIn;
};

module.exports = isLoggedInConstructor;