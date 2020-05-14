const mongoose = require("mongoose");
// const slugify =  require("slugify");
// const marked = require('marked');
// const createDomPurify = require("dompurify");
// const {JSDOM} = require("jsdom");

// const domputifiyer = createDomPurify(new JSDOM().window);

const articelSchema = new mongoose.Schema({
    title:{type:String,
            required:true,
            default: () => ""
        },
    description:{
        type:String,
        required:true,
        default: () => ""
    },
    markdown: {
        type:String,
        required:true,
        default: () => ""
    },
    createdAt:{
        type:Date,
        default : Date.now

    },
    email:{
        type:String
    }

})

const Article = mongoose.model("article", articelSchema)

module.exports = Article
