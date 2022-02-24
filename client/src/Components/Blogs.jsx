import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBlogs } from '../Actions/actions';

const Blogs = () => {

  const dispatch = useDispatch();

  const Blogs = useSelector(state => state.Blogs);
  console.log("Blogs",Blogs);
  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);
  
  return (
    <>
      <div className="header_div">
        <h1> Blogs </h1>
      </div>
      <div className='Add_Article'>
        <NavLink to='/addArticle'><button> Add Article </button></NavLink>
      </div>

      <div>
        {
          Blogs && Blogs.map(blog => {
                return (
                  <>
                    
                    {
                      blog.Articles && blog.Articles.map((article) => {
                        return(
                          <>
                          <div class="blog">
                            <div className='blog_header'>
                              <h2>Author : {blog.username}</h2>
                            </div>
                            {
                              article.lengtht === 0 ? null : (
                                <>
                                    <div className='blog_details'>
                                      <label>Title </label>
                                      <p>{article.title}</p>
                                      <label>Category </label>
                                      <p>{article.category}</p>
                                      <label>Tags </label>
                                      <p>{article.tags}</p>
                                      <label>Description </label>
                                      <p>{article.description}</p>
                                      <button>Like</button>
                                      <button>Comment</button>
                                    </div>
                                </>
                              )
                            }
                          </div>
                          </>
                        )
                      })
                    }
                      
                    
                  </>
                )
              })
        }
      </div>
    </>
  )
}

export default Blogs;