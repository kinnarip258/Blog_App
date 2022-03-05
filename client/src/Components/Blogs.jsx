//========================== Import Modules Start ===========================
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commentArticle, getBlogs, likeArticle, likeUser, unlikeArticle, userProfile } from '../Actions/actions';
import debounce from "lodash.debounce";

//========================== Import Modules End =============================

//============================= All Blogs Component Start =============================
const Blogs = () => {

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  //============================= Redux States =============================
  const Blogs = useSelector(state => state.Blogs); 
  const Toggle = useSelector(state => state.Toggle);
  const User = useSelector(state => state.User);
  const Like = useSelector(state => state.Like);
  console.log("Like", Like);
  //============================= Get User Id and Username =============================
  const userId = User._id;
  const username = User.username;

  //============================= UseStates =============================
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");
  const [showLikedUser, setShowLikedUser] = useState("Likes");

  //============================= Handle Search =============================
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  //============================= Handle Like =============================
  const handleLike = (ArticlesId) => {
    dispatch(likeArticle(ArticlesId, userId, username));
  }

  //============================= Handle UnLike =============================
  const handleUnlike = (ArticlesId) => {
    dispatch(unlikeArticle(ArticlesId, userId, username));
  }

  //============================= Handle Comment =============================
  const handleComment = (ArticlesId) => {
    dispatch(commentArticle(comment, ArticlesId, userId, username));
  }

  //============================= Optimise Search Employee =============================
  const optimiseVersion = debounce(handleSearch, [500])

  //============================= useEffect For Get Blogs, Likes, Comments =============================
  useEffect(() => {
    dispatch(userProfile());
    dispatch(getBlogs(search));
    dispatch(likeUser());
  }, [dispatch, search, Toggle]);
  
  return (
    <>
      <div className="header_div">
        <h1> Blogs </h1>
      </div>
      
      <div className='search'>
        <input name='search' placeholder='Search Blogs...' onKeyUp={optimiseVersion}/>
      </div>
      <div>
        {
          Blogs && Blogs.map(blog => {
                return (
                  <> 
                    <div class="blog" key={blog._id}>
                            <div className='blog_header'>
                              <h2>Author : {blog.username}</h2>
                            </div>
                            {
                              blog.Articles && (
                                <>
                                    <div className='subDiv'>
                                      <label>Title </label>
                                      <p>{blog.Articles.title}</p>
                                      <label>Category </label>
                                      <p>{blog.Articles.category}</p>
                                      <label>Tags </label>
                                      <p>{blog.Articles.tags}</p>
                                      <label>Description </label>
                                      <p>{blog.Articles.description}</p>
                                    </div>
                                    <div className='banner'>
                                      <img src={blog.Articles.banner} alt='Articles banner'/>
                                    </div>
                                     
                                  <div className='comment'>
                                    <input  
                                    placeholder='Write Comments...'
                                    onChange={(e) => setComment(e.target.value)}/>
                                   </div>
                                  
                                  {
                                    blog.Articles.Likes.length > 0 ? 
                                    (
                                      <>
                                        {showLikedUser === "Likes" ? (
                                          <div className='likes'>
                                            <h2 onClick={() => setShowLikedUser("users")}>{`${blog.Articles.Likes.length} Likes`}</h2>
                                          </div>
                                          ) : null
                                        }
                                      </>
                                    ) : null
                                  }
                                  {
                                    Like && Like.map((ele => {
                                      return (
                                        <>
                                          {showLikedUser === "users" ? (
                                            <div className='likesUser'>
                                            {
                                              blog.Articles.Likes.map(user => {
                                                <h2>user: {user}</h2>
                                                return (
                                                  <>
                                                    {
                                                      user === ele._id ? (
                                                        <>
                                                          <h2 onClick={() => setShowLikedUser("Likes")}>{`${ele.username}`}</h2>
                                                        </>
                                                      ) :null
                                                    }
                                                  </>
                                                )
                                              })
                                            }
                                              
                                            </div>
                                            ) : null
                                          }
                                        </>
                                      )
                                    }))   
                                  }
                                  {
                                    blog.Articles.Likes.includes(userId) ? (
                                      <>
                                        <button onClick={() => handleUnlike(blog.Articles._id)}>UnLike</button>
                                      </>
                                    ) : (
                                      <>
                                        <button onClick={() => handleLike(blog.Articles._id)}>Like</button>
                                      </>
                                    )
                                  }
                                  <button onClick={() => handleComment(blog.Articles._id)}>Comment</button>
                                
                                    <h2 style={{ margin: 0 , textAlign: "left" }}>Comments</h2>
                                    {
                                      blog.Articles.Comment.map(user => {
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
                            }
                    </div>  
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