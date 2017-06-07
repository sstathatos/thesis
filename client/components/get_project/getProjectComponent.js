let getProjectInfoComponentConstructor = require('./subComponents/getProjectInfoComponent');
let getProjectDataComponentConstructor = require('./getProjectDataComponent');
let getProjectDatasetComponentConstructor = require('./subComponents/datasetComponents/getProjectDatasetComponent');
let getDatasetContentsHandlerConstructor =  require('./subComponents/datasetComponents/getDatasetContentsHandler');
let gotContentsConstructor = require('./subComponents/datasetComponents/gotContents');
let getProjectPostComponentConstructor = require('./subComponents/postComponents/getProjectPostComponent');
let fullPostButtonHandlerConstructor = require('./subComponents/postComponents/fullPostButtonHandler');

let getProjectComponentConstructor = (obj) => {
    let {app,get,post,id,postStructurer,errorHandler} = obj;

    let getProjectInfoComponent = getProjectInfoComponentConstructor({app});
    let getProjectDataComponent = getProjectDataComponentConstructor(id,get);

    let gotContents = gotContentsConstructor({
        errorHandler,
        caller:{}

    });
    let getProjectDatasetComponent = getProjectDatasetComponentConstructor({app,get,
        post,getDatasetContentsHandlerConstructor,gotContents});

    let getProjectPostComponent = getProjectPostComponentConstructor({app,get,post,postStructurer,fullPostButtonHandlerConstructor});


    let init = () => {
        return {
            infoEls:getProjectInfoComponent.init(),
            datasetEls:getProjectDatasetComponent.init(),
            postEls: getProjectPostComponent.init()
        }
    };

    let update = (obj) => {
        let {infoEls,datasetEls,postEls} =obj;
        getProjectDataComponent.getData((err,body) => {
            console.log(body);
            let {name,description,date,dsets,post_parents} = body;
            getProjectInfoComponent.update({name,description,date,infoEls});
            getProjectDatasetComponent.update({dsets,datasetEls});

            getProjectPostComponent.update({post_parents,postEls});

        });
    };

    return {init,update};

};
module.exports = getProjectComponentConstructor;