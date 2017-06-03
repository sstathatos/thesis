
let submitDatasetButtonHandlerConstructor = (obj) => {

    let {name,data,post,submitDataset} =obj;

    let submitDatasetButtonHandler = (e) => {
        let formData = new FormData();
        formData.append('data',data());
        post({uri:`/datasets/?name=${name()}&inproject=5932a79e92e05018ccfc246e`,body:formData},(err,response,body) => {
            console.log(body);
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