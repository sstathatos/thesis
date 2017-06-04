let html = require('../html');
let createPostFormComponentConstructor = require('./subComponents/createPostFormComponent');
let createPostListComponentConstructor = require('./subComponents/createPostListComponent');
let createPostSaveButtonComponentConstructor = require('./subComponents/createPostSaveButtonComponent');
let createPostAddPlotComponentConstructor = require('./subComponents/createPostAddPlotComponent');
let createPostAddPlotButtonHandlerConstructor = require('./subComponents/createPostAddPlotButtonHandler');
let createPostGetDatasetListConstructor = require('./subComponents/createPostGetDatasetListComponent');
let createPostSaveButtonHandlerConstructor = require('./subComponents/createPostSaveButtonHandler');

let createPostComponentConstructor = (obj) => {
    let {app,get,id,post,errorHandler} = obj;

    let createPostFormComponent = createPostFormComponentConstructor({app});
    let createPostListComponent = createPostListComponentConstructor({app,get});
    let createPostAddPlotComponent = createPostAddPlotComponentConstructor({app,createPostAddPlotButtonHandlerConstructor});
    let createPostSaveButtonComponent = createPostSaveButtonComponentConstructor({app,createPostSaveButtonHandlerConstructor});
    let createPostGetDatasetListComponent = createPostGetDatasetListConstructor(id,get);

    let init = () => {
        return {
            formEls:createPostFormComponent.init(),
            listEls:createPostListComponent.init(),
            addPlotEls:createPostAddPlotComponent.init(),
            saveButtonEls:createPostSaveButtonComponent.init()
        }
    };

    let update = (obj) => {
        let {listEls} =obj;
        createPostGetDatasetListComponent.getData((err,data) => {
            if (err) return errorHandler(err);
            createPostListComponent.update({data,listEls});
        });
    };

    return {init,update};
};
module.exports = createPostComponentConstructor;