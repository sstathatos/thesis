let createPostSaveButtonHandlerConstructor = (obj) =>{
    let {formEls,dependencies,row_array,plots,parent_post_id} = obj;
    let {post,errorHandler,getProjectComponentConstructor,validator,
        app,getPostComponentConstructor} = dependencies;
    let createPostSaveButtonHandler = () => {

        if(validator.isEmpty(formEls['static'][1].value) || validator.isEmpty(formEls['static'][2].value)) {
            errorHandler({err:'empty fields'});
            return;
        }

        let post_str = `/posts/?title=${formEls['static'][1].value}&`+
            `description=${formEls['static'][2].value}&`+
            `inproject=${store.getItem('project_id')}&`
            +`dset_link=${store.getItem('create_post_dataset_id' )}`;
        if (parent_post_id) {
            post_str = `${post_str}&inpost=${parent_post_id}`;
        }
        post({uri:post_str}, (err, response, body) => {
            if(errorHandler({err,response})) {
                return;
            }
            let new_post = JSON.parse(body).data;
            let req_cnt =0;
            if(plots.length === 0) {

                document.getElementById('app').innerHTML = '';

                if (parent_post_id) {
                    let getPostComponent = getPostComponentConstructor({
                        dependencies,id:parent_post_id});
                    return getPostComponent.update(getPostComponent.init());
                }

                else{
                    let getProjectComponent = getProjectComponentConstructor({
                        id:store.getItem('project_id'),dependencies});
                    return getProjectComponent.update(getProjectComponent.init());
                }

            }
            plots.map((plot) => {
                let my_url =`/plots/?title=${plot.title}` +
                `&description=${plot.description}&inpost=${new_post._id}` +
                `&array_path_saved=${plot.array['path']}&dim1=${plot.dim1item}&`
                +`dim2=${plot.dim2}&dim2Value=${plot.dim2Value}&plot_type=${plot.plot_type}`;

                if (plot.dim3Value) my_url = `${my_url}&dim3Value=${plot.dim3Value}`;

                post({uri:my_url}, (err, response, body) => {
                    if (err) return errorHandler({err:new Error(err),response});
                    if(req_cnt === plots.length-1) {
                        app.innerHTML = '';

                        document.getElementById('app').innerHTML = '';

                        if (parent_post_id) {
                            let getPostComponent = getPostComponentConstructor({
                                dependencies,id:parent_post_id});
                            return getPostComponent.update(getPostComponent.init());
                        }

                        else {
                            let getProjectComponent = getProjectComponentConstructor({
                                id:store.getItem('project_id'),dependencies});
                            return getProjectComponent.update(getProjectComponent.init());
                        }
                    }
                    req_cnt++;
                })
            })
        });
    };
    return createPostSaveButtonHandler;
};
module.exports =createPostSaveButtonHandlerConstructor;