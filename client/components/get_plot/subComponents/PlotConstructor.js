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
        });
    };

    let updateChart = (chart,arr,metadata,cb) => {
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

    return {
        generateChart,zoomListener,updateChart
    }
};

module.exports=PlotConstructor;