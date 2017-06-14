
let submitDatasetButtonHandlerConstructor = (obj) => {

    let {dependencies,name,data} = obj;
    let {post,getProjectComponentConstructor} =dependencies;

    let submitDatasetButtonHandler = (e) => {
        let formData = new FormData();
        formData.append('data',data());
        post({uri:`/datasets/?name=${name()}&inproject=${store.getItem('project_id')}&creator=${store.getItem('user_id')}`,body:formData},(err,response,body) => {
            console.log(body);
            document.getElementById('app').innerHTML = '';
            let getProjectComponent = getProjectComponentConstructor({
                id:store.getItem('project_id'),dependencies});
            return getProjectComponent.update(getProjectComponent.init());
        })
    };

    return submitDatasetButtonHandler;
};
module.exports = submitDatasetButtonHandlerConstructor;


//        let reader= new FileReader();
// reader.readAsArrayBuffer(data());
// reader.onloadend = (event) => {
//     console.log(event.target.result);
//     let xhr = new XMLHttpRequest;
//     xhr.open("POST",'/upload',false);
// xhr.onreadystatechange = function ( response ) {
//     console.log(response);
// };
//
// xhr.send(formData);