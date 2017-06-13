let createPostSaveButtonHandlerConstructor = (obj) =>{
    let {formEls,dependencies,row_array,plots} = obj;
    let {post,errorHandler,getProjectComponentConstructor} = dependencies;
    let createPostSaveButtonHandler = () => {
        console.log(formEls['static'][1].value, formEls['static'][2].value, row_array, plots);
        post({uri: `/posts/?title=${formEls['static'][1].value}&description=${formEls['static'][2].value}&inproject=${store.getItem('project_id')}&dset_link=${store.getItem('create_post_dataset_id')}`}, (err, response, body) => {
            if (err) return errorHandler(err);
            let new_post = JSON.parse(body).data;
            console.log(new_post);
            let req_cnt =0;
            plots.map((plot) => {
                let my_url =`/plots/?title=${plot.title}` +
                `&description=${plot.description}&inpost=${new_post._id}` +
                `&array_path_saved=${plot.array['path']}&dim1=${plot.dim1item}&`
                +`dim2=${plot.dim2}&dim2Value=${plot.dim2Value}&plot_type=${plot.plot_type}`;

                if (plot.dim3Value) my_url = `${my_url}&dim3Value=${plot.dim3Value}`;

                post({uri:my_url}, (err, response, body) => {
                    if (err) return errorHandler(err);
                    let new_plot = JSON.parse(body).data;
                    console.log(new_plot);
                    if(req_cnt === plots.length-1) {
                        console.log('all Plots created');
                        let getProjectComponent = getProjectComponentConstructor({id:store.getItem('project_id'),dependencies});
                        getProjectComponent.update(getProjectComponent.init());
                    }
                    req_cnt++;
                })
            })
        });
    };
    return createPostSaveButtonHandler;
};
module.exports =createPostSaveButtonHandlerConstructor;