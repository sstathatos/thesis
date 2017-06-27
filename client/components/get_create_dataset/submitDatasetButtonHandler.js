
let submitDatasetButtonHandlerConstructor = (obj) => {

    let {dependencies,name,data} = obj;
    let {post,getProjectComponentConstructor,validator,
        errorHandler,createDatasetComponentConstructor} =dependencies;

    let submitDatasetButtonHandler = () => {

        if(validator.isEmpty(name())) {
            errorHandler({err:'empty field'});
            return;
        }

        if(!data()) {
            errorHandler({err:'empty file'});
            return;
        }

        let formData = new FormData();
        formData.append('data',data());
        post({uri:`/datasets/?name=${name()}&inproject=${store.getItem('project_id')}&creator=${store.getItem('user_id')}`,body:formData},(err,response,body) => {

            if(errorHandler({err,response})) {
                return;
            }

            else {
                document.getElementById('app').innerHTML = '';
                let getProjectComponent = getProjectComponentConstructor({
                    id:store.getItem('project_id'),dependencies});
                return getProjectComponent.update(getProjectComponent.init());
            }

        })
    };

    return submitDatasetButtonHandler;
};
module.exports = submitDatasetButtonHandlerConstructor;
