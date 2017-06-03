let html = require('../html');
let usersInfoComponentConstructor = require('./usersSubComponents/usersInfoComponent');
let usersMatrixComponentConstructor = require('./usersSubComponents/usersMatrixComponent');
let usersBttnCreateComponentConstructor = require('./usersSubComponents/usersBttnCreateComponent');
let usersGetDataComponentConstructor = require('./usersSubComponents/usersGetDataComponent');
let usersBttnCreateHandlerConstructor = require('./usersSubComponents/usersBttnCreateHandler');


let usersConstructor = (obj) => {
    let {app,get,id,errorHandler} = obj;

    let usersInfoComponent = usersInfoComponentConstructor({app,get});
    let usersMatrixComponent = usersMatrixComponentConstructor({app});
    let usersBttnCreateComponent = usersBttnCreateComponentConstructor({app,usersBttnCreateHandlerConstructor});
    let usersGetDataComponent=usersGetDataComponentConstructor(id,get);

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