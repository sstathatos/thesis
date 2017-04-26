// let hdf5 = require('hdf5').hdf5;
// const h5lt = require('hdf5').h5lt;
// let Access = require('hdf5/lib/globals').Access;
let fs = require('fs');
let tmp = require('tmp');
let Busboy = require('busboy');
let math = require('mathjs');

function send_data(req, cb) {
    let busboy = new Busboy({headers: req.headers});
    console.log();
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        if (!filename.includes('.h5')) cb('This file extension is not supported.', null);
        else {
            file.fileRead = []; //collect al8l chunks
            let size = 0; //count size of chunks
            file.on('data', function (chunk) {
                console.log(chunk.length);
                size += chunk.length;
                file.fileRead.push(chunk);
            });
            file.on('end', function () {
                console.log(file.fileRead);
                console.log(size);
                // concatenate(file.fileRead,(err,data)=> {
                let data = Buffer.concat(file.fileRead, size);//concat all chunks
                // setTimeout( ()=> {
                console.log(data);
                tmp.file({postfix: '.h5'}, function _tempFileCreated(err, path, fd, cleanupCallback) {//create tmp file
                    if (err) throw err;
                    let my_file = fs.createWriteStream(path);
                    my_file.on('open', () => {
                        my_file.write(data, () => {
                            console.log("File: ", path);
                            h5_converter(path, (err, result) => { //call my converter
                                if (err) cb(err, null);
                                else {

                                    cleanupCallback();// we are done, delete tmp file
                                    cb(null, result);
                                }
                            });
                        });//save combined chunks to my_file


                    })
                });
                // }, 12000);

                //})
            });
            file.on('limit', function () {
                console.log("notified");
            });
        }
    });
    busboy.on('finish', function () {
        console.log('Done parsing form!');
    });
    busboy.on('error', function () {
        console.log("got some error");
    });

    req.pipe(busboy);
}

function h5_converter(path, cb) {
    /*
     * Here we convert h5 data to json and return. Before that we must ensure our h5 contains datasets.
     *
     * */

    let file_read = new hdf5.File(path, Access.ACC_RDWR);
    let contents = file_read.getMemberNames();
    console.log(contents);
    if (contents === []) {
        file_read.close();
        cb('File doesnt contain dsets.', null);
    }
    else {
        let group = file_read.openGroup(contents[0]);
        console.log(group.getMemberNames());
        console.log(group.getNumAttrs());
        let dset_name = group.getMemberNames();
        let my_array = h5lt.readDataset(group.id, dset_name[0]);
        let dim = group.getDatasetDimensions(dset_name[0]);
        console.log("Dataset Dimensions: " + dim);
        delete my_array.rank;
        delete my_array.sections;
        delete my_array.rows;
        delete my_array.columns;
        console.log(my_array);

        // let my_json=[];
        // let cnt=0;
        // for (let i = 0; i <dim[0]; i++) {
        //     for (let j = 0; j < dim[1]; j++) {
        //         for (let k = 0; k < dim[2]; k++) {
        //             my_json.push({dim0:i,dim1:j,dim2:k,value:my_array[cnt]});
        //             cnt++;
        //         }
        //     }
        // }
        group.close();
        file_read.close();
        cb(null, Array.from(my_array));
    }
}

module.exports = {
    send_data: send_data
};

