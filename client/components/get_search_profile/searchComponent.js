let searchComponent = (obj) => {
    let {dependencies,search} = obj;
    let {app,get,errorHandler,searchGetDataConstructor,
        usersComponentConstructor,searchResultsComponentConstructor} = dependencies;

    document.getElementById('BackToProjectButton').style.display='none';

    let searchGetData = searchGetDataConstructor(search,get);
    let searchResultsComponent =  searchResultsComponentConstructor(dependencies);

    let init = () => {
        return {
            searchResultsEl : searchResultsComponent.init()
        }
    };

    let update = (obj) => {

        let {searchResultsEl} = obj;

        searchGetData.getData((err, data) => {
            if (err) return errorHandler(err);

            if (data === 'empty') {
                console.log('EMPTY');
                document.getElementById('app').innerHTML = "";

                let usersComponent = usersComponentConstructor(dependencies);
                usersComponent.update(usersComponent.init());
            }

            else if (data === 'too many results') {
                console.log('too many results')
                document.getElementById('app').innerHTML = "";

                let usersComponent = usersComponentConstructor(dependencies);
                usersComponent.update(usersComponent.init());
            }

            else {
                let searchEl = searchResultsEl.dynamic;
                searchResultsComponent.update({searchEl,data});
            }

        });
    };

    return {init,update};
};
module.exports = searchComponent;