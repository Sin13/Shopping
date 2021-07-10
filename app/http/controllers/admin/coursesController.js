const controller = require('app/http/controllers/controller');
const Course = require('app/models/course');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');

class coursesController extends controller {

    index(req, res) {
        res.render('admin/courses/index');
    }

    showForm(req, res) {
        res.render('admin/courses/create');
    }


    async create(req, res) {
        let status = await this.validationData(req);
        
        if(! status) {
            if(req.file) 
                fs.unlink(req.file.path ,(err) => {});
            return this.back(req,res);
        }

        // create course
        let images = this.imageResize(req.file);
        let { title , body , type , price , tags} = req.body;

        let newCourse = new Course({
            user : req.user._id,
            title,
            slug : this.slug(title),
            body,
            type,
            price,
            images : JSON.stringify(images),
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
                .resize(size , null) 
                .toFile(`${image.destination}/${imageName}`);
        }

        [1080 , 720 , 480].map(resize);

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