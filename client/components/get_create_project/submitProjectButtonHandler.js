
let submitProjectButtonHandlerConstructor = (obj) => {

    let {name,description,post,submitProject} =obj;

    let submitProjectButtonHandler = () => {
        post({uri:`/projects/?name=${name()}&description=${description()}`},(err,response,body) => {
            console.log(err,response,body);
            // if (err) return submitProject(new Error(err));
            // return submitProject(null,true);
        })
    };
    return submitProjectButtonHandler;
};
module.exports = submitProjectButtonHandlerConstructor;