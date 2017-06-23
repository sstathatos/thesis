let searchHandlerConstructor = (obj) => {

    let {search,dependencies} = obj;
    let {searchComponentConstructor} = dependencies;

    let searchHandler = () => {

        document.getElementById('app').innerHTML = "";

        let searchComponent = searchComponentConstructor({search:search(),dependencies});
        searchComponent.update(searchComponent.init());
    };

    return searchHandler;
};

module.exports = searchHandlerConstructor;