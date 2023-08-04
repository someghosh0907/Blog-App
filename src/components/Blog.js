import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard'
import './blog.css'

const Blog = () => {
  const [blogs,setBlogs] = useState([])
  const getAllBlogs= async()=>{
    try{
      const {data} =await axios.get("/api/v1/blog/all-blog")  //works 
      if(data?.success){
        setBlogs(data?.blogs)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllBlogs()
  },[])
  return (
    <div className='blogclass'>
      {blogs && blogs.length>0 ?(blogs.map((blog)=> (
      <BlogCard
      id={blog?._id}
      //isUser={localStorage.getItem("userId")=== blog?.user?._id}
      title={blog?.title}
      description={blog.description}
      image={blog?.image}
      username={blog?.user?.username}
      time={blog.createdAt}
      />))):(<h1>Insert some data</h1>)
      }
    </div>
  )
}

export default Blog