let html = require('../../html');
let {transformData}= require('./DataTransformConstructor');
let {generateChart,zoomListener,updateChart,zoomOutListener}= require('./PlotConstructor');


let getPlotDiagramComponentConstructor = (obj) => {

    let {app} = obj;
    let init = () => {
        let getplot_diagram_div_el = html.create('div');
        html.mountTo(app)(getplot_diagram_div_el);

        let getplot_diagram_el = generateChart(getplot_diagram_div_el);
        return {static:[],dynamic:[getplot_diagram_div_el,getplot_diagram_el]};
    };

    let update = (obj) => {
        let {data,plot_metadata,diagramEls} = obj;
        let arr=transformData(data);
        updateChart(diagramEls['dynamic'][1],arr);
        //let chart= update(arr,diagramEls["dynamic"][0]);
        // let mountToDiv =html.mountTo(diagramEls["dynamic"][0]);
        // mountToDiv(chart);
    };

    return {init,update};

};
module.exports = getPlotDiagramComponentConstructor;