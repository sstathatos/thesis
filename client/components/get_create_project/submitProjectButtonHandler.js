
let submitProjectButtonHandlerConstructor = (obj) => {

    let {name,description,dependencies} =obj;
    let {errorHandler,getProjectComponentConstructor,post} =  dependencies;
    let submitProjectButtonHandler = () => {
        post({uri:`/projects/?name=${name()}&description=${description()}`},(err,response,body) => {
            if (err) return errorHandler(new Error(err));
            let {data} =  JSON.parse(body);
            document.getElementById('app').innerHTML = '';
            let getProjectComponent = getProjectComponentConstructor({id:data._id,dependencies});
            getProjectComponent.update(getProjectComponent.init());

        })
    };
    return submitProjectButtonHandler;
};
module.exports = submitProjectButtonHandlerConstructor;