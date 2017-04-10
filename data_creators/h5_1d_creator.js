let hdf5 = require('hdf5').hdf5;
let h5lt = require('hdf5').h5lt;
let Access = require('hdf5/lib/globals').Access;
let H5Type = require('hdf5/lib/globals.js').H5Type;
let math = require('mathjs');

//CREATE A 1D ARRAY
let file = new hdf5.File('./one_dim.h5', Access.ACC_TRUNC);
let group = file.createGroup('example');
let rows = 300;
let buffer = new Float64Array(rows);
buffer.rank = 1;
buffer.rows = rows;


for (let i = 0; i < buffer.rows; i++) {

    buffer[i] = Math.floor(Math.random() * (100));


}
h5lt.makeDataset(group.id, 'dset', buffer);
//
// //READ IT
// let file_read = new hdf5.File('./one_dim.h5', Access.ACC_RDONLY);
// let contents = file_read.getMemberNames();
// if (!contents) console.log('error');
// else { //we have groups
//     // for(let group_name of contents) { //each group
//     let group = file_read.openGroup(contents[0]);
//     let dset_name = group.getMemberNames();
//     let my_array = h5lt.readDataset(group.id, dset_name[0]);
//     console.log(my_array);
//     let dim = group.getDatasetDimensions(dset_name[0]);
//     console.log("Dataset Dimensions: " + dim);
//     group.close();
//     file_read.close();
// }
group.close();
file.close();