let c3 = require('c3');

let PlotConstructor = () => {
    let pivot = undefined;

    let generateChart = (mount_point) => {
        return c3.generate({
            bindto: mount_point,
            data: {
                x: "x",
                columns: [],
                empty: {
                    label: {
                        text: "No Data"
                    }
                }
            },
            axis: {
                x: {
                    tick: {
                        culling: {
                            max: 26
                        },
                        format:  (d) => {
                            return d;
                        }
                    }
                }
            }
            // zoom: {
            //     enabled: true
            // }
        });
    };

    let updateChart = (chart,arr,metadata,cb) => {
        // let xaxis = arr[0];


        // let xaxis =  data['xaxis'];
        chart.load({
            columns: arr,
            type: metadata['plot_type'],
            unload: true,
            done: cb
        })
    };

    let zoomListener = (element=document,cb) => {
        let points = element.getElementsByClassName("c3-event-rect");
        for(let point=0; point<points.length; point++) {
            points[point].addEventListener("mouseup",() => {
                if (pivot !== point) {
                    if (point < pivot) {
                        cb(null, point-2, pivot-2);
                    } else {
                        cb(null, pivot, point);
                    }
                }
            });

            points[point].addEventListener("mousedown",() => {
                pivot = point;
            });
        }
    };

    let zoomOutListener = (el,cb) => {
        let element=document.getElementsByClassName('c3-event-rects c3-event-rects-single');
        console.log(element);
        el.addEventListener("dblclick",cb,true);
    };


    let init =  (onzoom) => {

        return (initial_arr) => {

            generateChart(initial_arr);
            zoomListener(document,onzoom);
        };
    };

    let update = (onzoom,onzoomout) =>{

    };

    return {
        generateChart,zoomListener,updateChart,zoomOutListener
    }
};

module.exports=PlotConstructor;