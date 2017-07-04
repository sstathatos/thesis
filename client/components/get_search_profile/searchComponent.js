let searchComponent = (obj) => {
    let {dependencies,search} = obj;
    let {searchGetDataConstructor,errorHandler,searchResultsComponentConstructor,usersComponentConstructor} = dependencies;

    document.getElementById('BackToProjectButton').style.display='none';

    let searchGetData = searchGetDataConstructor(search,dependencies);
    let searchResultsComponent =  searchResultsComponentConstructor(dependencies);

    let init = () => {
        return {
            searchResultsEl : searchResultsComponent.init()
        }
    };

    let update = (obj) => {

        let {searchResultsEl} = obj;

        searchGetData.getData((err, data) => {

            if (data === 'empty' || data === 'too many results') {
                let response = {
                    statusCode:422,
                    body: 'No result'
                };

                if(errorHandler({response,err:null})) {
                    document.getElementById('app').innerHTML = "";
                    let usersComponent = usersComponentConstructor(dependencies);
                    usersComponent.update(usersComponent.init());
                }
            }

            else {
                let searchEl = searchResultsEl.dynamic;
                let whole_div = searchResultsEl.static[0];
                searchResultsComponent.update({searchEl,data,whole_div});
            }

        });
    };

    return {init,update};
};
module.exports = searchComponent;