let hdf5 = require('hdf5').hdf5;
var h5lt = require('hdf5').h5lt;
let Access = require('hdf5/lib/globals').Access;
let fs = require('fs');

let Busboy = require('busboy');
let my_file = fs.createWriteStream('./saved_data.h5');
function send_data(req, cb) {
    let busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        if (!filename.includes('.h5')) cb('This file extension is not supported.', null);

        // file.fileRead=[];
        // var size=0;
        file.on('data', function (chunk) {
            my_file.write(chunk);
            // size+=chunk.length;
            // file.fileRead.push(chunk);
            // //console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function () {
            h5_converter();
            // var data= Buffer.concat(file.fileRead,size);
            console.log(data);
            //console.log('File [' + fieldname + '] Finished');
        });
        file.on('limit', function () {
            console.log("notified");
        });
    });
    busboy.on('finish', function () {
        console.log('Done parsing form!');
    });
    busboy.on('error', function () {
        console.log("got some error");
    });

    req.pipe(busboy);
}

function h5_converter() {
    var filen = new hdf5.File('./saved_data.h5', Access.ACC_RDONLY);
//var fil= new h5lt.readDataset(filen,'get');
//console.log(fil);

}

module.exports = {
    send_data: send_data
};

