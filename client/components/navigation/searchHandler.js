let searchHandlerConstructor = (obj) => {

    let {search,dependencies} = obj;
    let {searchComponentConstructor,errorHandler,validator} = dependencies;

    let searchHandler = () => {

        if(validator.isEmpty(search())) {
            errorHandler({err:'empty field'});
            return;
        }

        document.getElementById('app').innerHTML = "";

        let searchComponent = searchComponentConstructor({search:search(),dependencies});
        searchComponent.update(searchComponent.init());
    };

    return searchHandler;
};

module.exports = searchHandlerConstructor;