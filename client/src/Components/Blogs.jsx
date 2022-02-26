//========================== Import Modules Start ===========================
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commentArticle, getBlogs, getCommentArticles, getLikeArticles, likeArticle } from '../Actions/actions';
import debounce from "lodash.debounce";
//========================== Import Modules End =============================

//============================= All Blogs Component Start =============================
const Blogs = () => {

  const dispatch = useDispatch();

  const Blogs = useSelector(state => state.Blogs);
  const Like = useSelector(state => state.Like);
  const Comment = useSelector(state => state.Comment);
  const Toggle = useSelector(state => state.Toggle);
  const User = useSelector(state => state.User);
 console.log("Like",Like); 
 console.log("Comment",Comment); 

  const userId = User._id;
  const username = User.username;
  
  console.log("Blogs", Blogs);
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState("");
  const [showLikedUser, setShowLikedUser] = useState("Likes");
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleLike = (ArticlesId) => {
    console.log(ArticlesId, userId, username);
    dispatch(likeArticle(ArticlesId, userId, username));
  }

  const handleComment = (ArticlesId) => {
    dispatch(commentArticle(comment, ArticlesId, userId, username));
  }
  //============================= Optimise Search Employee =============================
  const optimiseVersion = debounce(handleSearch, [500])

  useEffect(() => {
    setComment("");
    dispatch(getBlogs(search));
    dispatch(getLikeArticles());
    dispatch(getCommentArticles());
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
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}/>
                                   </div>
                                   {
                                      Like && Like.map((ele) => {
                                        return (
                                          <>
                                            {
                                              blog.Articles._id === ele.articleId ?
                                                (
                                                  <>
                                                    {showLikedUser === "Likes" ? (
                                                      <div className='likes'>
                                                        <h2 onClick={() => setShowLikedUser("users")}>{`${ele.Users.length} Likes`}</h2>
                                                      </div>
                                                    ) : null}
                                                  </>
                                                )
                                              : null
                                            }
                                            {
                                              blog.Articles._id === ele.articleId ? 
                                                (
                                                  ele.Users.map(user => {
                                                    return (
                                                      <>
                                                        {showLikedUser === "users" ? (
                                                          <div className='likesUser'>
                                                            <h4 onClick={() => setShowLikedUser("Likes")}>{`${user.username}`}</h4>
                                                          </div>
                                                        ) : null}
                                                        <h4></h4>
                                                      </>
                                                    )
                                                  })
                                                )
                                              : null
                                            }
                                          </>
                                        )
                                      })
                                    }
                                    <button onClick={() => handleLike(blog.Articles._id)}>Like</button>
                                    <button onClick={() => handleComment(blog.Articles._id)}>Comment</button>
                                
                                    {
                                      Comment && Comment.map((ele) => {
                                        return (
                                          <>
                                            {
                                              blog.Articles._id === ele.articleId ? 
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
      </div>
    </>
  )
}

//============================= Export Default Start =============================

export default Blogs;

//============================= Export Default End =============================