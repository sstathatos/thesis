let html =require('../../../html');

let gotContentsConstructor = (obj) => {
    let {errorHandler} =obj;
    let gotContents = (err,contents) => {
        console.log(contents);
        let {data,caller} = contents;
        if (err) return errorHandler(new Error(err));

        let contents_div = html.create('div',{textContent:data});
        let mountToCaller = html.mountTo(caller);
        mountToCaller(contents_div);
    };
    return gotContents;
};

module.exports = gotContentsConstructor;