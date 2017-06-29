let searchComponent = (obj) => {
    let {dependencies,search} = obj;
    let {searchGetDataConstructor,searchResultsComponentConstructor} = dependencies;

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

            if (data === 'empty') {
                console.log('EMPTY');
                return;
            }

            else if (data === 'too many results') {
                console.log('too many results');
                return;
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