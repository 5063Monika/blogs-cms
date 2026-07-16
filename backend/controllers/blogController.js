const Blog=require('../models/Blog');
exports.createBlog=async(req,res)=>{
try{
const{title,content,category,authorName,publishDate,featuredImageUrl,readingTime,status,tags}=req.body;
const blog=new Blog({
title,
content,
category,
authorName,
publishDate,
featuredImageUrl,
readingTime,
status:status||'draft',
tags:Array.isArray(tags)?tags:tags?tags.split(',').map(t=>t.trim()):[],
createdBy:req.user.id
});
await blog.save();
res.status(201).json({message:'Blog created successfully',blog});
}catch(err){
res.status(500).json({message:err.message});
}
};
exports.getBlogs=async(req,res)=>{
try{
const blogs=await Blog.find()
.populate('createdBy','name email')
.sort({publishDate:-1});

res.json(blogs);
}catch(err){
res.status(500).json({message:err.message});
}
};
exports.getBlogById=async(req,res)=>{
try{
const blog=await Blog.findById(req.params.id).populate('createdBy','name email');
if(!blog)return res.status(404).json({message:'Blog not found'});
res.json(blog);
}catch(err){
res.status(500).json({message:err.message});
}
};
exports.updateBlog=async(req,res)=>{
try{
const blog=await Blog.findById(req.params.id);
if(!blog)return res.status(404).json({message:'Blog not found'});
if(blog.createdBy.toString()!==req.user.id)
return res.status(403).json({message:'Not allowed'});
const{title,content,category,authorName,publishDate,featuredImageUrl,readingTime,status,tags}=req.body;
blog.title=title;
blog.content=content;
blog.category=category;
blog.authorName=authorName;
blog.publishDate=publishDate;
blog.featuredImageUrl=featuredImageUrl;
blog.readingTime=readingTime;
blog.status=status||blog.status;
blog.tags=Array.isArray(tags)?tags:tags?tags.split(',').map(t=>t.trim()):[];
await blog.save();
res.json({message:'Blog updated successfully',blog});
}catch(err){
res.status(500).json({message:err.message});
}
};
exports.deleteBlog=async(req,res)=>{
try{
const blog=await Blog.findById(req.params.id);
if(!blog)return res.status(404).json({message:'Blog not found'});
if(blog.createdBy.toString()!==req.user.id)
return res.status(403).json({message:'Not allowed'});
await blog.deleteOne();
res.json({message:'Blog deleted successfully'});
}catch(err){
res.status(500).json({message:err.message});
}
};
exports.getPublishedBlogs=async(req,res)=>{
try{
const blogs=await Blog.find({status:'published'}).sort({publishDate:-1});
res.json(blogs);
}catch(err){
res.status(500).json({message:err.message});
}
};

