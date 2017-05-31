let mount = (node) => {
    return (...args) => {
        let tag,rest;
        [tag,rest] = args;

        let element = document.createElement(tag);

        for (let key in rest) {
            element.setAttribute(key,  rest[key]);
        }

        node.appendChild(element);
        return element ;
    };
};

let remove = (...args) => {
    let tag,rest;

};

let html ={mount};
module.exports = html;