let createPostComponentConstructor = (dependencies,parent_post_id) => {

    let {createPostFormComponentConstructor,createPostListComponentConstructor,
        createPostGetDatasetListConstructor,html, app} = dependencies;
    document.getElementById('BackToProjectButton').style.display='initial';

    let id = store.getItem('project_id');
    let createPostFormComponent = createPostFormComponentConstructor(dependencies);
    let createPostListComponent = createPostListComponentConstructor(dependencies);
    let createPostGetDatasetListComponent = createPostGetDatasetListConstructor(id,dependencies);

    let init = () => {

        let post_div = html.create('div');
        let formEls=createPostFormComponent.init(post_div);
        let listEls=createPostListComponent.init(post_div);
        // let mountToDiv =  html.mountTo(post_div);
        // [formEls['static'][0],listEls['static'][0]].map((el)=> {
        //     mountToDiv(el);
        // });
        html.mountTo(app)(post_div);

        return {formEls,listEls,post_div};
    };

    let update = (obj) => {
        let {listEls,formEls,post_div} =obj;
        createPostGetDatasetListComponent.getData((err,data) => {
            createPostListComponent.update({data,listEls,formEls,post_div,parent_post_id});
        });
    };

    return {init,update};
};
module.exports = createPostComponentConstructor;