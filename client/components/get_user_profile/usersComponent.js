
let usersConstructor = (obj) => {
    let {app,get,errorHandler,store,html,
        usersInfoComponentConstructor,
        usersMatrixComponentConstructor,
        usersBttnCreateComponentConstructor,usersGetDataComponentConstructor} = obj;

    let id= store.getItem('user_id');

    let usersInfoComponent = usersInfoComponentConstructor(obj);
    let usersMatrixComponent = usersMatrixComponentConstructor(obj);
    let usersBttnCreateComponent = usersBttnCreateComponentConstructor(obj);
    let usersGetDataComponent=usersGetDataComponentConstructor(id,get,html);

    let init = () => {
        return {
            usersInfoEl : usersInfoComponent.init(),
            usersMatrixEl : usersMatrixComponent.init(),
            usersButtonEl : usersBttnCreateComponent.init()
        }
    };

    let update = (obj) => {
        let {usersInfoEl,usersMatrixEl} = obj;
        usersGetDataComponent.getData((err,data) => {
            if (err) return errorHandler(err);

            let {username,email,name,projects} = data;

            let infoEl = usersInfoEl.dynamic;
            usersInfoComponent.update({username,email,name,infoEl});

            let {dynamic} =usersMatrixEl;
            usersMatrixComponent.update({projects,dynamic});
        })

    };

    return {init,update};
};
module.exports = usersConstructor;