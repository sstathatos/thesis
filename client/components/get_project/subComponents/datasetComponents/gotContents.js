let html =require('../../../html');

let gotContentsConstructor = (obj) => {
    let {errorHandler,caller} =obj;
    let gotContents = (err,contents) => {
        console.log(contents);
        // if (err) return errorHandler(new Error(err));
        // let mountToCaller = html.mountTo(caller);
        //
        //
        // mountToCaller()
    };
    return gotContents;
};

module.exports = gotContentsConstructor;