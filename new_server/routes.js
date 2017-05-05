const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json([]);
});

router.get('/users', (req, res) => {
    let users= [
        {
            username : 'stef',
            email : 'stef@stef.com',
            name : 'stef'
        },
        {
            username : 'ken',
            email : 'ken@ken.com',
            name : 'ken'
        }
    ];
    res.status(200).json(users);
});

router.get('/projects', (req, res) => {
    let projects= [
        {
            name : 'project 1 name',
            description : ' project 1 description',
            date:"3/5/2017 at 15:47",
            dsets: [{
                _id:'a',
                name : 'dataset 1 name',
                creator : ' dataset 1 creator',
                date: "3/5/2017 at 15:47"
            },{
                _id:'b',
                name : 'dataset 2 name',
                creator : ' dataset 2 creator',
                date: "3/5/2017 at 15:47",
            }],
            parent_posts: [
                {
                    title : 'post 1 title',
                    description : ' post 1 description',
                    date:"3/5/2017 at 15:47",
                    dset : {
                        _id:'a',
                        name : 'dataset 1 name',
                        creator : ' dataset 1 creator',
                        date: "3/5/2017 at 15:47"
                    },
                    plots_ids: [{_id:'a'},{_id:'b'}]
                },
                {
                    title : 'post 2 title',
                    description : ' post 2 description',
                    date:"3/5/2017 at 15:47",
                    dset : {
                        _id:'a',
                        name : 'dataset 1 name',
                        creator : ' dataset 1 creator',
                        date: "3/5/2017 at 15:47"
                    },
                    plots_ids: [{_id:'a'},{_id:'b'}]
                }]
        },
        {
            name : 'project 2 name',
            description : ' project 2 description',
            date:"3/5/2017 at 15:47",
            datasets_links: [{_id:'a'},{_id:'b'},{_id:'c'},{_id:'d'}],
            posts: [
                {
                    parent_post:{
                        title : 'post 1 title',
                        description : ' post 1 description',
                        date:"3/5/2017 at 15:47",
                        dset_link : {_id:'a'},
                        plots_link: [{_id:'a'},{_id:'b'}]
                    },
                    kids_posts:[
                        {
                            title : 'post 1 title',
                            description : ' post 1 description',
                            date:"3/5/2017 at 15:47",
                            dset_link : {_id:'a'},
                            plots_link: [{_id:'a'},{_id:'b'}]
                        },{
                            title : 'post 1 title',
                            description : ' post 1 description',
                            date:"3/5/2017 at 15:47",
                            dset_link : {_id:'a'},
                            plots_link: [{_id:'a'},{_id:'b'}]
                        }
                    ]
                },
                {
                    parent_post:{
                        title : 'post 1 title',
                        description : ' post 1 description',
                        date:"3/5/2017 at 15:47",
                        dset_link : {_id:'a'},
                        plots_link: [{_id:'a'},{_id:'b'}]
                    },
                    kids_posts:[
                        {
                            title : 'post 1 title',
                            description : ' post 1 description',
                            date:"3/5/2017 at 15:47",
                            dset_link : {_id:'a'},
                            plots_link: [{_id:'a'},{_id:'b'}]
                        },{
                            _id:'a',
                            title : 'post 1 title',
                            description : ' post 1 description',
                            date:"3/5/2017 at 15:47",
                            dset_link : {_id:'a'},
                            plots_link: [{_id:'a'},{_id:'b'}]
                        }
                    ]
                }
            ]
        }
    ];
    res.status(200).json(projects);
});

router.get('/posts', (req, res) => {
    let posts= [
        {
            parent_post:{
                title : 'post 1 title',
                description : ' post 1 description',
                date:"3/5/2017 at 15:47",
                dset : {
                    _id:'a',
                    name : 'dataset 1 name',
                    creator : ' dataset 1 creator',
                    date: "3/5/2017 at 15:47"
                },
                plots_ids: [{_id:'a'},{_id:'b'}]
            },
            kids_posts:[
                {
                    title : 'post 2 title',
                    description : ' post 2 description',
                    date:"3/5/2017 at 15:47",
                    dset : {
                        _id:'a',
                        name : 'dataset 2 name',
                        creator : ' dataset 2 creator',
                        date: "3/5/2017 at 15:47"
                    },
                    plots_ids: [{_id:'a'},{_id:'b'}]
                },{
                    title : 'post 3 title',
                    description : ' post 3 description',
                    date:"3/5/2017 at 15:47",
                    dset : {
                        _id:'a',
                        name : 'dataset 3 name',
                        creator : ' dataset 3 creator',
                        date: "3/5/2017 at 15:47"
                    },
                    plots_ids: [{_id:'a'},{_id:'b'}]
                },
            ]
        },
        {
            parent_post:{
                title : 'post 1 title',
                description : ' post 1 description',
                date:"3/5/2017 at 15:47",
                dset : {
                    _id:'a',
                    name : 'dataset 1 name',
                    creator : ' dataset 1 creator',
                    date: "3/5/2017 at 15:47"
                },
                plots_ids: [{_id:'a'},{_id:'b'}]
            },
            kids_posts:[
                {
                    title : 'post 2 title',
                    description : ' post 2 description',
                    date:"3/5/2017 at 15:47",
                    dset : {
                        _id:'a',
                        name : 'dataset 2 name',
                        creator : ' dataset 2 creator',
                        date: "3/5/2017 at 15:47"
                    },
                    plots_ids: [{_id:'a'},{_id:'b'}]
                },{
                    title : 'post 3 title',
                    description : ' post 3 description',
                    date:"3/5/2017 at 15:47",
                    dset : {
                        _id:'a',
                        name : 'dataset 3 name',
                        creator : ' dataset 3 creator',
                        date: "3/5/2017 at 15:47"
                    },
                    plots_ids: [{_id:'a'},{_id:'b'}]
                },
            ]
        }
    ];
    res.status(200).json(posts);
});

router.get('/datasets', (req, res) => {
    let datasets= [
        {
            name : 'dataset 1 name',
            creator : ' dataset 1 creator',
            date: "3/5/2017 at 15:47",
            data:[{"x":3,"y":6},{"x":4,"y":7},{"x":2,"y":3},{"x":3,"y":5}]
        },
        {
            name : 'dataset 2 name',
            creator : ' dataset 2 creator',
            date: "3/5/2017 at 15:47",
            data:[{"x":3,"y":6},{"x":4,"y":7},{"x":2,"y":3},{"x":3,"y":5}]
        }
    ];
    res.status(200).json(datasets);
});

router.get('/plots', (req, res) => {
    let plots= [
        {
            title : 'plot 1 title',
            description : 'plot 1 description',
            plot_metadata: {
                x_axis_name: "x",
                y_axis_name: "y",
                y: [{name: 'f(x)1', color: "red"},
                    {name: 'f(x)2', color: "blue"}],
                plot_type: 'simple'
            },
            data:[{"x":3,"y":6},{"x":4,"y":7},{"x":2,"y":3},{"x":3,"y":5}]

        },
        {
            title : 'plot 2 title',
            description : 'plot 2 description',
            plot_metadata: {
                x_axis_name: "t",
                y_axis_name: "v",
                y: [{name: 'V1', color: "red"},
                    {name: 'V2', color: "blue"}],
                plot_type: 'simple'
            },
            data:[{"x":3,"y":6},{"x":4,"y":7},{"x":2,"y":3},{"x":3,"y":5}]
        }
    ];
    res.status(200).json(plots);
});


module.exports =router;