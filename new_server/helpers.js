let APIConstructor=require('../API/index');
let {readObjs}=APIConstructor;
let Busboy = require('busboy');
let {spawn}=require('child_process');
let fs = require('fs');
let shortid = require('shortid');

/*
 * A collection of helper functions used by routes
 * */

let helperConstructor = () => {

    let getUserProjects =(id,cb)=>{
        let projects=[];
        let qpath="acl.read.allow";
        readObjs('projects',{[qpath]:id})((err,projs) => {
            if (err) cb(new Error(err));
            projects.push(projs.map((obj)=>{return {"name":obj.name,
                "description":obj.description,"date":obj.date.toISOString().slice(0, 10)}}));
            cb(null,projects);
        });
    };

    let getHDFPlot = (path_saved,obj,cb) =>{
        let {path,direction,dim2Value,currystart,curryend,zoomstart,dim1,dim2,dim3Value,zoomend}=obj;
        let sp_child;
        sp_child= spawn('python3',[__dirname+"/python_files/getHDFPlot.py",path_saved,path,
            dim1,dim2,dim3Value,dim2Value,currystart,curryend,zoomstart,zoomend,direction]);

        sp_child.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        sp_child.stdout.on('data', function (data) {
            let exp=/'/g ;
            let arr = JSON.parse(data.toString().replace(exp,"\""));
            cb(null,arr)
        });
    };

    let getHDFArray = (path_saved,obj,cb) =>{
        let {path,direction,xstart,xend,ystart,yend,dim1,dim2,dim3Value}=obj;
        let sp_child;
        if(dim1 && dim2 && dim3Value) {
            sp_child= spawn('python3',[__dirname+"/python_files/getHDFArray.py",path_saved,path,
                direction,xstart,xend,ystart,yend,dim1,dim2,dim3Value]);
        }
        else {
            sp_child= spawn('python3',[__dirname+"/python_files/getHDFArray.py",path_saved,path,
                direction,xstart,xend,ystart,yend]);
        }

        sp_child.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        sp_child.stdout.on('data', function (data) {
            let exp=/'/g ;
            let arr = JSON.parse(data.toString().replace(exp,"\""));
            cb(null,arr)
        });
    };

    let getHDFContentsForView = (path,cb) =>{
        let sp_child= spawn('python3',[__dirname+"/python_files/getHDFContent.py",path]);

        sp_child.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        sp_child.stdout.on('data', function (data) {
            let arr = data.toString();
            cb(null,arr)
            //var array = JSON.parse(arr); //parse data into JSON form
        });
    };

    let save_data = (req, cb) =>{
        let busboy = new Busboy({headers: req.headers});
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            if (!filename.includes('.h5')) cb('This file extension is not supported.', null);
            else {
                file.fileRead = []; //collect al8l chunks
                let size = 0; //count size of chunks
                file.on('data', function (chunk) {
                    size += chunk.length;
                    file.fileRead.push(chunk);
                });
                file.on('end', function () {
                    console.log(size);
                    let data = Buffer.concat(file.fileRead, size);//concat all chunks
                    let new_name=__dirname+'/hdf_saved_files/'+shortid.generate()+'.h5';
                    fs.writeFile(new_name, data, (err) => {
                        if (err) throw err;
                        console.log('The file has been saved!');
                        cb(null,new_name);
                    });
                });
                file.on('limit', function () {
                    console.log("limit!!");
                });
            }
        });
        busboy.on('finish', function () {
            console.log('Done parsing form!');
        });
        busboy.on('error', function (err) {
            cb(new Error(err));
        });
        req.pipe(busboy);
    };

    let searchRelatedPosts = (query,cb) => {
        readObjs('posts',{_id:query._id})((err,posts) => {
            if (err) return cb(new Error(err));
            if(posts[0].inpost) return searchRelatedPosts({_id:posts[0].inpost},cb);
            else {
                let whole_post = {kids:[]};
                let cnt=0;
                readObjs('posts',{$or :[{_id:query._id},{inpost:query._id}]})((err,posts) => {
                    if (err) return cb(new Error(err));
                    for(let i in posts){

                        if (JSON.stringify(posts[i]._id)===JSON.stringify(query._id)) { //parent
                            confPost(posts[i],(err,post) => {
                                if (err) return cb(new Error(err));
                                whole_post['parent']=post;
                                if(cnt ===posts.length -1) return cb(null,whole_post);
                                cnt++;
                            })
                        }
                        else { //kid
                            confPost(posts[i],(err,post) => {
                                if (err) return cb(new Error(err));
                                whole_post.kids.push(post);
                                if(cnt ===posts.length -1) return cb(null,whole_post);
                                cnt++;
                            })
                        }
                    }
                });
            }
        });
    };

    let confProject = (proj,cb) =>{
        let obj ={};
        let cnt =0;
        obj['name'] = proj.name;
        obj['description'] = proj.description;
        obj['date'] = proj.date.toISOString().slice(0, 10);
        obj.post_parents=[];

        confDsets({inproject:proj._id},(err,dsets) => {
            obj['dsets']=dsets;
            readObjs('posts',{$and:[{inproject:proj._id},{inpost:{$exists:false}}]})((err,posts)=> {
                if(err) return cb(new Error(err));
                if(posts.length===0) return cb(null,{});
                else {
                    for(let j in posts) {
                        confPost(posts[j],(err,post) => {
                            obj['post_parents'].push(post);
                            if(cnt === posts.length-1) {
                                return cb(null,obj);
                            }
                            cnt++;
                        })
                    }
                }
            })
        });
    };

    let confPost = (post,cb) =>{
        let obj={};
        obj['title']=post.title;
        obj['_id']=post._id;
        obj['description']=post.description;
        obj['date'] = post.date.toISOString().slice(0, 10);
        if(post.inpost) obj['inpost']=post.inpost;
        confDsets({_id:post.dset_link},(err,dset) => { //only one
            if (err) return cb (new Error(err));
            obj['dset']=dset[0];
            readObjs('plots',{inpost:post._id})((err,plots) => { //only one
                if (err) return cb (new Error(err));
                obj['plots_ids']=plots.map((obj)=> {return {title:obj.title,_id:obj._id}});
                return cb(null,obj);
            })
        })
    };

    let confDsets = (query,cb) =>{
        let new_dsets = [];
        readObjs('datasets',query)((err,dsets) => {
            if (err) return cb(new Error(err));
            if(dsets.length===0) return cb(err,[]);
            let cnt=0;
            for(let i=0;i<dsets.length;i++) {
                let obj={};
                obj['name']=dsets[i].name;
                obj['_id']=dsets[i]._id;
                obj['creator']=dsets[i].creator;//use search function
                obj['date'] = dsets[i].date.toISOString().slice(0, 10);

                readObjs('users',dsets[i].creator)((err,user) => {
                    if (err) throw err;
                    obj['creator_username']=user[0].username;
                    new_dsets.push(obj);
                    if(cnt === dsets.length-1) {
                        return cb(null,new_dsets);
                    }
                    cnt++;
                });

            }
        })
    };

    let getDataFromPlotID = (req,cb) =>{
        let new_plot = [];
        let {_id,direction,currystart,curryend,zoomstart,zoomend}=req.query;
        readObjs('plots',{_id:_id})((err,plot) => {
            if (err) throw err;
            readObjs('posts',{_id:plot[0].inpost})((err,post) => {
                if (err) cb(new Error(err));
                let {dim1,dim2,dim3Value,dim2Value}=plot[0].plot_metadata;

                readObjs('datasets',{_id:post[0].dset_link})((err,dset) => {
                    if (err) cb(new Error(err));
                    let obj={direction:direction,currystart:currystart,curryend:curryend,zoomstart:zoomstart,
                        zoomend:zoomend,dim1:dim1,dim2:dim2,dim3Value:dim3Value,
                        dim2Value:dim2Value,path:plot[0].array_path_saved};

                    getHDFPlot(dset[0].path_saved,obj,(err,data) => {
                        if (err) cb(new Error(err));
                        new_plot=plot.map((obj)=>{return {"title":obj.title,"description":obj.description,
                            "plot_metadata":obj.plot_metadata,"data":data}});
                        cb(null,new_plot);
                    });
                });
            });
        })
    };

    return {
        getUserProjects,getHDFPlot,getHDFArray,getHDFContentsForView,confPost,
        confProject,confDsets,searchRelatedPosts,save_data,getDataFromPlotID,confDsets
    }
};

module.exports=helperConstructor();

