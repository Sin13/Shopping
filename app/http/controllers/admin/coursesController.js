const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');

class coursesController extends controller {

    async index(req, res) {
        const page = req.query.page || 1;
        const courses = await Course.paginate({}, {page ,limit : 3 ,sort: { createdAt: 1 } })
        res.render('admin/courses/index', { courses });
    }

    showForm(req, res) {
        res.render('admin/courses/create');
    }

    async delete(req, res) {
        const course = await Course.findById(req.params.id);

        // delete images 
        Object.values(course.images).forEach(image => {
            fs.unlinkSync(`./public/${image}`);
        });

        // delete course
        course.remove();
        
        return res.redirect('/admin/courses');
    }


    async create(req, res) {
        let status = await this.validationData(req);

        if (!status) {
            if (req.file)
                fs.unlinkSync(req.file.path);
            return this.back(req, res);
        }

        // create course
        let images = this.imageResize(req.file);
        let { title, body, type, price, tags } = req.body;

        let newCourse = new Course({
            user: req.user._id,
            title,
            slug: this.slug(title),
            body,
            type,
            price,
            images: images,
            tags
        });

        await newCourse.save();

        return res.redirect('/admin/courses');
    }

    imageResize(image) {
        const imageInfo = path.parse(image.path);

        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;

            addresImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(size, null)
                .toFile(`${image.destination}/${imageName}`);
        }

        [1080, 720, 480].map(resize);

        return addresImages;
    }

    getUrlImage(dir) {
        return dir.substring(8);
    }


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9A-Z]|-)+/g, "-")
    }
}


module.exports = new coursesController();