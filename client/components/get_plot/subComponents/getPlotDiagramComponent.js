let getPlotDiagramComponentConstructor = (obj) => {
    let {dependencies,id} = obj;
    let {app,html,css,getPlotDataComponentConstructor,
        DataTransformConstructor,PlotConstructor} = dependencies;
    let getPlotDataComponent = getPlotDataComponentConstructor({id,dependencies});

    let {transformData} = DataTransformConstructor();
    let {generateChart,zoomListener,updateChart} = PlotConstructor();

    let state =[0,0,0,0];

    let init = () => {
        let getplot_diagram_div_el = html.create('div',{className:''});
        html.mountTo(app)(getplot_diagram_div_el);

        let plot_div = html.create('div',{className:''});

        html.mountTo(getplot_diagram_div_el)(plot_div);

        let getplot_diagram_el = generateChart(plot_div);

        // console.log(getplot_diagram_el);
        // getplot_diagram_el.className += 'bg-white';
        document.getElementsByClassName('c3')[0].className += ' bg-white black';

        let option_buttons_div = html.create('div',{className:'pt3'});


        let reset_button = html.create('button',{textContent:'Reset',className:css.button});
        let mountToDiv = html.mountTo(option_buttons_div);

        let listenerFunc = ()=> {
            let init_obj = {direction:'init',currystart:0,curryend:0,zoomstart:0,zoomend:0};
            state[2] = 0;
            state[3] = 0;
            getPlotDataComponent.getData(init_obj)((err,body) => {
                let {data,plot_metadata} = body;
                update({data,plot_metadata,diagramEls:{static:[],
                    dynamic:[getplot_diagram_div_el,getplot_diagram_el,up_button,down_button]}});
            });
        };

        let addListenerToReset = html.addListenerTo(reset_button);
        addListenerToReset('click',listenerFunc);

        let up_button = html.create('button',{textContent:'Up',className:css.button});
        let down_button = html.create('button',{textContent:'Down',className:css.button});


        let upListener = () => {
            let my_obj = {direction:'up',currystart:state[0],
                curryend:state[1],zoomstart:state[2],zoomend:state[3]};

            getPlotDataComponent.getData(my_obj)((err,body) => {

                let {data,plot_metadata} = body;

                update({data,plot_metadata,diagramEls:{static:[],
                    dynamic:[getplot_diagram_div_el,getplot_diagram_el,up_button,down_button]}});
            });
        };

        let downListener = () => {
            let my_obj = {direction:'down',currystart:state[0],
                curryend:state[1],zoomstart:state[2],zoomend:state[3]};

            getPlotDataComponent.getData(my_obj)((err,body) => {

                let {data,plot_metadata} = body;

                update({data,plot_metadata,diagramEls:{static:[],
                    dynamic:[getplot_diagram_div_el,getplot_diagram_el,up_button,down_button]}});
            });
        };

        let addListenerToUp = html.addListenerTo(up_button);
        addListenerToUp('click',upListener);

        let addListenerToDown = html.addListenerTo(down_button);
        addListenerToDown('click',downListener);


        [reset_button,up_button,down_button].map((el) => {
            mountToDiv(el);
        });
        html.mountTo(getplot_diagram_div_el)(option_buttons_div);

        return {static:[],dynamic:[getplot_diagram_div_el,getplot_diagram_el,up_button,down_button]};
    };

    let update = (obj) => {
        let {data,plot_metadata,diagramEls} = obj;

        state[0] =data['arr_y_limits'][0];
        state[1] =data['arr_y_limits'][1];

        if(Number(state[0]) <= 0) diagramEls['dynamic'][3].disabled =  true;
        else diagramEls['dynamic'][3].disabled =  false;

        if(Number(state[1]) >= data['2d_arr_dims'][1]-1) diagramEls['dynamic'][2].disabled =  true;
        else diagramEls['dynamic'][2].disabled =  false;

        let arr=transformData(data);
        // let arr = data['arr'];
        // let xaxis =  data['xaxis'];
        updateChart(diagramEls['dynamic'][1],arr,plot_metadata,()=>{

            zoomListener(document,(err,point,pivot) => {
                    console.log(arr[0][point+1],arr[0][pivot+1]);

                    state[2] = parseFloat(arr[0][point+1]);
                    state[3] = parseFloat(arr[0][pivot+1]);
                    let my_obj = {direction:'static',currystart:state[0],
                        curryend:state[1],zoomstart:state[2],zoomend:state[3]};

                    getPlotDataComponent.getData(my_obj)((err,body) => {
                        let {data,plot_metadata} = body;

                        update({data,plot_metadata,diagramEls});
                    });
            });

        });

    };

    return {init,update};

};
module.exports = getPlotDiagramComponentConstructor;