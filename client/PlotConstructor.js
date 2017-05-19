let c3 = require('c3');

let PlotConstructor = () => {

    let generateChart = (arr) => {
        let chart=c3.generate({
            bindto: '#app',
            data: {
                x: arr[0][0],
                columns: arr
            },
            zoom: {
                enabled: true
            },
            axis: {
                x: {
                    tick: {
                        culling: {
                            max: 26
                        }
                    }
                }
            }
        });
        return chart;
    };

    let updateChart = (chart,arr) => {
        chart.load({
            columns:arr,
            unload: arr
        })
    };

    let zoomListener = (element=document,cb) => {
        let points = element.getElementsByClassName("c3-event-rect");
        let waiting;

        for(let point=0; point<points.length; point++) {

            points[point].addEventListener("mouseup",() => {
                waiting(point,cb);
            });
            points[point].addEventListener("mousedown",() => {
                waiting = getPair(point);
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

    let getPair = (first) => {

        return (second,cb) => {

            if(second < first) {
                let temp = first;
                first=second;
                second=temp;
            }
            cb(null,first,second);
        }
    };

    return {
        generateChart,zoomListener,updateChart,zoomOutListener
    }
};

module.exports=PlotConstructor();