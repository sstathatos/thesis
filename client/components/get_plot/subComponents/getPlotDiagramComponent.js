let {transformData}= require('./DataTransformConstructor');
let {generateChart,zoomListener,updateChart,zoomOutListener}= require('./PlotConstructor');


let getPlotDiagramComponentConstructor = (obj) => {
    let {dependencies,id} = obj;
    let {app,html,getPlotDataComponentConstructor} = dependencies;
    let getPlotDataComponent = getPlotDataComponentConstructor({id,dependencies});



    let init = () => {
        let getplot_diagram_div_el = html.create('div');
        html.mountTo(app)(getplot_diagram_div_el);

        let getplot_diagram_el = generateChart(getplot_diagram_div_el);
        return {static:[],dynamic:[getplot_diagram_div_el,getplot_diagram_el]};
    };

    let update = (obj) => {
        let {data,plot_metadata,diagramEls} = obj;

        let arr=transformData(data);
        updateChart(diagramEls['dynamic'][1],arr,plot_metadata,()=>{

            zoomListener(document,(err,point,pivot) => {
                console.log(arr[0][point+1],arr[0][pivot+1],data);
                let my_obj = {direction:'static',currystart:data['arr_y_limits'][0],
                    curryend:data['arr_y_limits'][1],zoomstart:arr[0][point+1],zoomend:arr[0][pivot+1]};

                getPlotDataComponent.getData(my_obj)((err,body) => {
                    let {title,description,data,plot_metadata} = body;

                    update({data,plot_metadata,diagramEls});
                });
            });

            let listenerFunc = ()=> {
                let init_obj = {direction:'init',currystart:0,curryend:0,zoomstart:0,zoomend:0};
                getPlotDataComponent.getData(init_obj)((err,body) => {
                    let {title,description,data,plot_metadata} = body;

                    update({data,plot_metadata,diagramEls});
                });
            };

            zoomOutListener(document,listenerFunc);
        });
        //console.log(data);

        // let up_button = html.create('button',{textContent:'Up'});
        // let down_button = html.create('button',{textContent:'Down'});
        //
        // let mountToDiv = html.mountTo(diagramEls['dynamic'][0]);
        // [up_button,down_button].map((el) => {
        //     mountToDiv(el);
        // });

        //diagramEls['dynamic'][1]


    };

    return {init,update};

};
module.exports = getPlotDiagramComponentConstructor;