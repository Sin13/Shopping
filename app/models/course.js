const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const CourseSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
    body: { type: String, required: true },
    price: { type: String, required: true },
    images: { type: Object, required: true },
    tags: { type: String, required: true },
    time: { type: String, default: '00:00:00' },
    viewCount: { type: Number, default: 0 },
    commentCount: { type: String, default: 0 },
}, { timestamps: true });

CourseSchema.plugin(mongoosePaginate);

CourseSchema.method('typeToPersian', function (type) {
    switch (type) {
        case 'vip':
            return 'اعضای ویژه'
            break;
        case 'cash':
            return 'نقدی'
            break;
        case 'free':
            return 'رایگان'
            break;
        default:
            return 'رایگان'
            break;
    }
})

module.exports = mongoose.model('Course', CourseSchema);