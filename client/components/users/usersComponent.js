let html = require('../html');
let usersInfoComponentConstructor = require('./usersInfoComponent');
let usersMatrixComponentConstructor = require('./usersMatrixComponent');
let usersButtonCreateComponentConstructor = require('./usersButtonCreateComponent');
let usersGetDataComponentConstructor = require('./usersGetDataComponent');

let usersConstructor = (obj) => {
    let {app,get,id,errorHandler,usersButtonCreateHandlerConstructor} = obj;

    let usersInfoComponent = usersInfoComponentConstructor({app,get});
    let usersMatrixComponent = usersMatrixComponentConstructor({app});
    let usersButtonCreateComponent = usersButtonCreateComponentConstructor({app,usersButtonCreateHandlerConstructor});
    let usersGetDataComponent=usersGetDataComponentConstructor(id,get);

    let init = () => {
        return {
            usersInfoEl : usersInfoComponent.init(),
            usersMatrixEl : usersMatrixComponent.init(),
            usersButtonEl : usersButtonCreateComponent.init()
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