const dbHost = 'mongodb://localhost/daotest';
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbHost, {});

//General CRUD functions for Entities
let DAOConstructor = (obj) => {
    let {model} = obj;

    let createItem = (data, cb) => {
        let obj = new model(data);
        obj.save((err, result) => {
            if (err) return cb(new Error(err));
            cb(null, result);
        })
    };

    let readItems = (query, cb) => {
        model.find(query, (err, result) => {
            if (err) return cb(new Error(err));
            cb(null, result);
        })
    };

    let updateItem = (query, newdata, cb) => {
        model.update(query, newdata, {new: true}, (err, result) => {
            if (err) return cb(new Error(err));
            cb(null, result);
        });
    };

    let deleteItem = (query, cb) => {
        model.findOneAndRemove(query, (err, result) => {
            if (err) return cb(new Error(err));
            cb(null, result);
        });
    };

    let search = (query) => {
        return model.find(query);
    };

    return {
        createItem, readItems, updateItem, deleteItem, search
    };
};

module.exports = DAOConstructor;