
let usersConstructor = (obj) => {
    let {errorHandler,
        usersInfoComponentConstructor,
        usersMatrixComponentConstructor,
        usersBttnCreateComponentConstructor,usersGetDataComponentConstructor} = obj;

    let id= store.getItem('user_id');
    document.getElementById('BackToProjectButton').style.display='none';


    let usersInfoComponent = usersInfoComponentConstructor(obj);
    let usersMatrixComponent = usersMatrixComponentConstructor(obj);
    let usersBttnCreateComponent = usersBttnCreateComponentConstructor(obj);
    let usersGetDataComponent=usersGetDataComponentConstructor(id,obj);

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