let schemaConstructor = (mongoose) => {
    let UserSchema = {
        username: {
            type: String,
            index: true,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    };

    let ProjectSchema = {
        name: {
            type: String,
            index: true,
            required: true
        },
        date: {
            type: Date
        },
        description: {
            type: String,
            required: true
        },
        acl: {
            read: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            update: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            create: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            delete: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            }
        }
    };

    let DatasetSchema = {
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId, ref: UserSchema,
            required: true
        },
        path_saved: {
            type: String,
            required: true
        },
        inproject: {
            type: mongoose.Schema.Types.ObjectId, ref: ProjectSchema,
            required: true
        },
        acl: {
            read: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            update: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            create: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            delete: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            }
        },
    };

    let PostSchema = {
        title: {
            type: String,
            index: true,
            required: true
        },
        date: {
            type: Date
        },
        description: {
            type: String,
            required: true
        },
        acl: {
            read: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            update: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            create: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            },
            delete: {
                allow: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
                ,
                deny: [{type: mongoose.Schema.Types.ObjectId, ref: UserSchema}]
            }
        },
        inpost: {type: mongoose.Schema.Types.ObjectId, ref: 'posts'},
        inproject: {
            type: mongoose.Schema.Types.ObjectId, ref: ProjectSchema,
            required: true
        },
        dset_link: {
            type:mongoose.Schema.Types.ObjectId,ref :DatasetSchema,
            required: true
        }
    };

    let PlotSchema = {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        array_path_saved: {
            type: String
        },
        inpost: {
            type: mongoose.Schema.Types.ObjectId, ref: PostSchema
        },
        plot_metadata: {
            x_axis_name: {type: String},
            y_axis_name: {type: String},
            y: [{name: {type: String}, color: {type: String}}],
            dim1: {type: Number},
            dim2: {type: Number},
            dim3Value:{type: Number},
            dim2Value: {type: Number},
            plot_type: {type: String}
        }
    };

    return {
        UserSchema, ProjectSchema, DatasetSchema, PostSchema, PlotSchema
    }
};

module.exports = schemaConstructor;

