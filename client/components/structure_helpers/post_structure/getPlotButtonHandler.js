
let getPlotButtonHandlerConstructor = (obj) => {

    let {dependencies,plot_id} =obj;
    let {getPlotComponentConstructor} = dependencies;

    let getPlotButtonHandler = () => {
        document.getElementById('app').innerHTML = '';
        let getPlotComponent = getPlotComponentConstructor({dependencies,id:plot_id});
        getPlotComponent.update(getPlotComponent.init());
    };
    return getPlotButtonHandler;
};
module.exports = getPlotButtonHandlerConstructor;