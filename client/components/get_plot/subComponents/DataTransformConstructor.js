
let DataTransformConstructor = () => {

    let transformData = (whole_data) => {
        let x_axis= whole_data['xaxis'];
        let dim_names=whole_data['dim_names'];
        let arr= whole_data['arr'];
        let arr_dims=whole_data['arr_dims'];
        let y_limits=whole_data['arr_y_limits'];
        let pos_arr=[];
        x_axis=x_axis.filter(function(item, pos, ary) {
            if(!pos || item !== ary[pos - 1]) {
                pos_arr.push(pos);
                return item !== ary[pos - 1];
            }
        });

        for(let i=0;i<arr.length;i++) {
            for(let j=0;j<arr[i].length;j++)
            {
                if(!pos_arr.includes(j)) {
                    arr[i].splice(j, 1);
                }
            }
        }
        x_axis.splice(0, 0, dim_names[0]);
        for(let i=0;i<arr.length;i++)
        {
            arr[i].splice(0, 0, `y${i}`);
        }
        arr.splice(0,0,x_axis);
        return arr;
    };

    return {
        transformData
    }
};

module.exports=DataTransformConstructor();