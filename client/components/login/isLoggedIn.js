let isLoggedInConstructor = (obj) => {
    let {errorHandler} =obj;
    let isLoggedIn = (err) => {
        if (err) return errorHandler(new Error(err));

    };
    return isLoggedIn;
};

module.exports = isLoggedInConstructor;