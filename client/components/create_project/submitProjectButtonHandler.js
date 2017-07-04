
let submitProjectButtonHandlerConstructor = (obj) => {

    let {name,description,dependencies} =obj;
    let {errorHandler,getProjectComponentConstructor,post,validator} =  dependencies;
    let submitProjectButtonHandler = () => {

        if(validator.isEmpty(name()) || validator.isEmpty(description())) {
            errorHandler({err:'empty fields'});
            return;
        }
        post({uri:`/projects/?name=${name()}&description=${description()}`},(err,response,body) => {
            if(errorHandler({err,response})) {
                return;
            }
            let {data} =  JSON.parse(body);
            document.getElementById('app').innerHTML = '';
            let getProjectComponent = getProjectComponentConstructor({id:data._id,dependencies});
            getProjectComponent.update(getProjectComponent.init());

        })
    };
    return submitProjectButtonHandler;
};
module.exports = submitProjectButtonHandlerConstructor;