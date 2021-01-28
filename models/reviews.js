const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const reviewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    review: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanit: {
        type: String,
        required: true
    }
})

reviewsSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if (this.review) {
        this.sanit = dompurify.sanitize(marked(this.review))
    }
    next()
})

module.exports = mongoose.model('Reviews', reviewsSchema )