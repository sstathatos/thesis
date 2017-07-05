
let DataTransformConstructor = () => {

    let transformData = (whole_data) => {
        let arr= whole_data['arr'];
        let xaxis= whole_data['xaxis'];
        for(let i=0;i<arr.length;i++)
        {
            arr[i].splice(0, 0, `y${i}`);
        }

        xaxis.splice(0, 0, `x`);
        arr.splice(0,0,xaxis);

        return arr;
    };

    return {
        transformData
    }
};

module.exports=DataTransformConstructor;