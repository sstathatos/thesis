let c3 = require('c3');

let PlotConstructor = () => {
    let pivot = undefined;

    let generateChart = (mount_point) => {
            return c3.generate({
                bindto: mount_point,
                data: {
                    x: 'x',
                    columns: [],
                    type: 'line',
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
                            }
                        }
                    }
                },
                zoom: {
                    enabled: true
                }
            });
    };

    let updateChart = (chart,arr) => {
        console.log(arr);
        chart.load({
            columns: arr,
            unload: true
        })
    };

    let zoomListener = (element=document,cb) => {
        let points = element.getElementsByClassName("c3-event-rect");

        for(let point=0; point<points.length; point++) {

            points[point].addEventListener("mouseup",() => {
                if (pivot !== point) {
                    if (point < pivot) {
                        cb(null, point, pivot);
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

    let zoomOutListener = (cb) => {
        let element=document.getElementsByClassName('c3-event-rects c3-event-rects-single');
        console.log(element);
        app.addEventListener("dblclick",() => {
            cb();
        })
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

module.exports=PlotConstructor();