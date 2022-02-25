//========================== Import Modules Start ===========================
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { commentArticle, getBlogs, getCommentArticles, getLikeArticles, likeArticle } from '../Actions/actions';
import debounce from "lodash.debounce";
//========================== Import Modules End =============================

//============================= All Blogs Component Start =============================
const Blogs = () => {

  const dispatch = useDispatch();

  const Blogs = useSelector(state => state.Blogs);
  const Like = useSelector(state => state.Like);
  const Comment = useSelector(state => state.Comment);
 
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");
  
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleLike = (articleId, userId, username) => {
    dispatch(likeArticle(articleId, userId, username));
  }

  const handleComment = (articleId, userId, username) => {
    dispatch(commentArticle(comment, articleId, userId, username));
    setComment("");
  }
  //============================= Optimise Search Employee =============================
  const optimiseVersion = debounce(handleSearch, [500])

  useEffect(() => {
    dispatch(getBlogs(search));
    dispatch(getLikeArticles());
    dispatch(getCommentArticles());
  }, [dispatch, search]);
  
  return (
    <>
      <div className="header_div">
        <h1> Blogs </h1>
      </div>
      <div className='Add_Article'>
        <NavLink to='/addArticle'><button> Add Article </button></NavLink>
      </div>

      <div className='search'>
        <input name='search' placeholder='Search Blogs...' onKeyUp={optimiseVersion}/>
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
                          <div class="blog" key={blog._id}>
                            <div className='blog_header'>
                              <h2>Author : {blog.username}</h2>
                            </div>
                            {
                              article.lengtht === 0 ? null : (
                                <>
                                    <div className='subDiv'>
                                      <label>Title </label>
                                      <p>{article.title}</p>
                                      <label>Category </label>
                                      <p>{article.category}</p>
                                      <label>Tags </label>
                                      <p>{article.tags}</p>
                                      <label>Description </label>
                                      <p>{article.description}</p>
                                    </div>
                                    <div className='banner'>
                                      <img src={article.banner} alt='article banner'/>
                                    </div>
                                    
                                    
                                  <div className='comment'>
                                    <input  placeholder='Write Comments...' onChange={(e) => setComment(e.target.value)}/>
                                    <button onClick={() => handleComment(article._id, blog._id, blog.username)}>Add Comment</button>
                                   </div>
                                   {
                                      Like && Like.map((ele) => {
                                        return (
                                          <>
                                            {
                                              ele.articleId === article._id ? 
                                                <h4>{`${ele.Users.length} Likes`}</h4>
                                              : null
                                            }
                                          </>
                                        )
                                      })
                                    }
                                    <button onClick={() => handleLike(article._id, blog._id, blog.username)}>Like</button>
                                    <button>Comment</button>
                                
                                    {
                                      Comment && Comment.map((ele) => {
                                        return (
                                          <>
                                            {
                                              ele.articleId === article._id ? 
                                                (
                                                  <>
                                                    <h2 style={{ margin: 0 , textAlign: "left" }}>Comments</h2>
                                                    {
                                                      ele.Users.map((user) => {
                                                        return (
                                                          <>
                                                            <div className= 'showcomment'>
                                                              <h2 >{user.username}</h2>
                                                              <p>{user.comment}</p>
                                                            </div>
                                                          </>
                                                        )
                                                      })
                                                    }
                                                  </>
                                                )
                                              : null
                                            }
                                          </>
                                        )
                                      })
                                    }
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

//============================= Export Default Start =============================

export default Blogs;

//============================= Export Default End =============================