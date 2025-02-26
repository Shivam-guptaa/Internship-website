const mongoose = require("mongoose");

const opportunities = mongoose.Schema({
    userid : {
        type : String,
        require :true
    },
    id : {
        type : Number,
        require :true
    },
    profile_name : {
        type : String,
        require :true
    },
    stipend : {
        type : String,
        require :true
    },
    company_name : {
        type : String,
        require :true
    },
    duration : {
        type : String,
        require :true
    }
    
})

const applied = mongoose.model("Listapplied",opportunities);

module.exports = applied ;