let addHandlerConstructor = (obj) => {

    let {dependencies,id} =  obj;
    let {get,errorHandler,usersComponentConstructor} =  dependencies;
    let addHandler = () => {

        get({uri:`/join/?_id=${id}`},(err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            document.getElementById('app').innerHTML = "";

            let usersComponent = usersComponentConstructor(dependencies);
            usersComponent.update(usersComponent.init());
        })

    };

    return addHandler;
};

module.exports = addHandlerConstructor;