let hdf5 = require('hdf5').hdf5;
let h5lt = require('hdf5').h5lt;
let Access = require('hdf5/lib/globals').Access;
let H5Type = require('hdf5/lib/globals.js').H5Type;
let math = require('mathjs');

//CREATE A 2D ARRAY
let file = new hdf5.File('./two_dim.h5', Access.ACC_TRUNC);
let group = file.createGroup('example');
let rows = 30;
let columns = 40;
let buffer = new Float64Array(columns * rows);
buffer.rank = 2;
buffer.rows = rows;
buffer.columns = columns;

for (let i = 0; i < buffer.rows; i++) {
//    let cnt=-1;
    for (let j = 0; j < buffer.columns; j++) {
        buffer[i * buffer.columns + j] = Math.floor(Math.random() * (100));

    }
}
h5lt.makeDataset(group.id, 'dset', buffer);

// let file_read = new hdf5.File('./two_dim.h5', Access.ACC_RDONLY);
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