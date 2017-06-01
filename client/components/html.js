let create = (...args) => {
    let tag,rest;
    [tag,rest] = args;

    let element = document.createElement(tag);

    for (let key in rest) {
        element[key]=rest[key]; //it could generate bugs (setattribute)
    }

    return element ;
};

let mount = (obj) => {
    let {node,el} = obj;
    node.appendChild(el);

    return {node,el};
};

let mountTo = (node) => {
    return (el) => {
        mount({node,el});
        return {node,el};
    }
};

let addListener = (obj) => {
    let {el,cb,event} = obj;
    el.addEventListener(event, cb, true);
    return obj;
};

let addListenerTo = (el) => {
    return (event,cb) => {
        addListener({el,cb,event});
        return {el,cb,event};
    }
};

let removeListener = (obj) => {
    let {el,event,cb} = obj;
    el.removeEventListener(event,cb,true);
    return obj;
};

let removeListenerTo = (el) => {
    return (event,cb) => {
        removeListener({el,cb,event});
        return {el,cb,event};
    }
};


let html ={create,mountTo,addListenerTo,removeListenerTo};
module.exports = html;