const blogModel = require('../models/blogModels');
const userModel = require('../models/userModels')
const mongoose = require("mongoose");

//GETTING ALL BLOGS
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find()
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "no blocks found"
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "all blogs",
            blogs,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while getting blogs",
            error
        })
    }
};

exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image/*, user*/ } = req.body;
        //VALIDATION
        if (!title || !description || !image /*|| !user*/) {
            return res.status(400).send({
                success: false,
                message: "pliss fil all fields"
            });
        }
        /*const existingUser = await userModel.findById(user)
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'Unable to find user'
            })
        }*/
        const newBlog = new blogModel({ title, description, image/*, user*/ })
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session })
        /*exisitingUser.blogs.push(newBlog);*/
        /*await exisitingUser.save({ session });*/
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message: "blog Created!!!",
            newBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "incorrect info",
            error
        })
    }
}

exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this ID ${id}"
            })
        }
        return res.status(200).send({
            success: true,
            message: "fetch single blog",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.ststs(400).send({
            success: false,
            message: "error while finding",
            error
        })
    }
};

exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel
            .findByIdAndDelete(req.params.id)
            .populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while Deleting",
            error
        })
    }
}

exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true })
        return res.status(200).send({
            success: true,
            message: 'blog updated',
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'error while updating',
            error
        })
    }
}

exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("user")
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with id"
            });
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in user blog",
            error
        })
    };
}
