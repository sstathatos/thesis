
let DataTransformConstructor = () => {

    let transformData = (whole_data) => {
        let arr= whole_data['arr'];
        let xaxis= whole_data['xaxis'];
        // x_axis=x_axis.filter(function(item, pos, ary) {
        //     if(!pos || item !== ary[pos - 1]) {
        //         pos_arr.push(pos);
        //         return item !== ary[pos - 1];
        //     }
        // });
        //
        // for(let i=0;i<arr.length;i++) {
        //     for(let j=0;j<arr[i].length;j++)
        //     {
        //         if(!pos_arr.includes(j)) {
        //             arr[i].splice(j, 1);
        //         }
        //     }
        // }
        // x_axis.splice(0, 0, dim_names[0]);
        // let arr2 =arr;
        for(let i=0;i<arr.length;i++)
        {
            arr[i].splice(0, 0, `y${i}`);
        }

        xaxis.splice(0, 0, `x`);
        arr.splice(0,0,xaxis);
        console.log(arr);

        return arr;
    };

    return {
        transformData
    }
};

module.exports=DataTransformConstructor;