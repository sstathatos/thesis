let hdf5 = require('hdf5').hdf5;
let h5lt = require('hdf5').h5lt;
let Access = require('hdf5/lib/globals').Access;
let H5Type = require('hdf5/lib/globals.js').H5Type;
let math = require('mathjs');
//todo vres akri me ta 3 dim, deuteron na upostirizei ola ta dim sizes mexri ta 3, 3on  na ginetai save ws [] me metadata ta dim sizes

//CREATE A 3D ARRAY
let file = new hdf5.File('./three_dim.h5', Access.ACC_TRUNC);
let group = file.createGroup('example');
let sections = 90;
let rows = 30;
let columns = 70;
let buffer = new Float64Array(columns * rows * sections);
buffer.rank = 3;
buffer.sections = sections;
buffer.rows = rows;
buffer.columns = columns;

for (let i = 0; i < buffer.rows; i++) {
//    let cnt=-1;
    for (let j = 0; j < buffer.columns; j++) {
//        cnt++;
        for (let k = 0; k < buffer.sections; k++) {
            buffer[i * buffer.columns * buffer.sections + j * buffer.sections + k] = Math.floor(Math.random() * (100));
        }
    }
}
h5lt.makeDataset(group.id, 'dset', buffer);
group.close();
file.close();

// //READ IT
let file_read = new hdf5.File('./three_dim.h5', Access.ACC_RDWR);
console.log(file_read.getMemberNames());
console.log(file_read.getNumAttrs());
let contents = file_read.getMemberNames();
if (!contents) console.log('error');
else { //we have groups
    // for(let group_name of contents) { //each group
    let group = file_read.openGroup(contents[0]);

    let dset_name = group.getMemberNames();
    let my_array = h5lt.readDataset(group.id, dset_name[0]);
    console.log(my_array);
    let dim = group.getDatasetDimensions(dset_name[0]);
    console.log("Dataset Dimensions: " + dim);
    group.close();
    file_read.close();
}


// let mpla = group.getDatasetDimensions(dset_name[0]);
// console.log(mpla[0]);
// let my_json = [];
// let cnt = 0;
// for (let i = 0; i < dim[0]; i++) {
//     for (let j = 0; j < dim[1]; j++) {
//         for (let k = 0; k < dim[2]; k++) {
//             my_json.push({dim0: i, dim1: j, dim2: k, value: my_array[cnt]});
//             cnt++;
//         }
//     }
//}
//    console.log(my_json);
//console.log(i * buffer.columns * buffer.layers + j * buffer.layers + k);
// if(i===0) {
//     buffer[i * buffer.columns * buffer.sections + j * buffer.sections + k]=cnt;
// }
//else

// function createArray(length) {
//     let arr = new Array(length || 0), i = length;
//     if (arguments.length > 1) {
//         let args = Array.prototype.slice.call(arguments, 1);
//         while(i--) arr[length-1 - i] = createArray.apply(this, args);
//     }
//     return arr;
// }
//
// let table=createArray(rows,columns,layers);
// console.log(table);
// table.columns=columns;
// table.rows=rows;
// table.layers=layers;
// table.rank=3;
//
// for (let i = 0; i <rows; i++) {
//     let cnt=-1;
//     for (let j = 0; j < columns; j++) {
//         cnt++;
//         for (let k = 0; k < layers; k++) {
//             if(i===0) {
//                 table[i][j][k]=cnt;
//             }
//             else table[i][j][k]=Math.floor(Math.random()*(100));
//             //(max - min) + min
//         }
//     }
// }
// console.log(table);
// h5lt.makeDataset(group.id, 'dset', table);
// let group2=file.createGroup('example2');
// h5lt.makeDataset(group2.id, 'dset', table);
//
// }
//buffer.writeDoubleLE(Math.random() * 100, 8 * (i * buffer.rows * buffer.layer + j * buffer.layer + k));


