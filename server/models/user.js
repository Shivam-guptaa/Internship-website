const mongoose = require("mongoose");

const usersch = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        unique : true,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

const user = mongoose.model("User",usersch);

module.exports = user;