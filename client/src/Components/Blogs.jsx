//========================== Import Modules Start ===========================
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commentArticle, getBlogs, likeArticle, likeUser, unlikeArticle, userProfile } from '../Actions/actions';
import debounce from "lodash.debounce";
import Checkbox from './Checkbox';

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

  //============================= Get User Id and Username =============================
  const userId = User._id;

  //============================= UseStates =============================
  const [search, setSearch] = useState("");
  const [comment, setComment] = useState([]);
  const [showLikedUser, setShowLikedUser] = useState("Likes");
  const [allTags, setAllTags] = useState([]);
 
  //============================= Handle Search =============================
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setAllTags([...allTags, id]);
    if (!checked) {
      setAllTags(allTags.filter((item) => item !== id));
    }
  }

  const Comments = (e) => {
    setComment({id: e.target.id, value: e.target.value})
  }

  //============================= Handle Like =============================
  const handleLike = (ArticlesId) => {
    dispatch(likeArticle(ArticlesId, userId));
  }

  //============================= Handle UnLike =============================
  const handleUnlike = (ArticlesId) => {
    dispatch(unlikeArticle(ArticlesId, userId));
  }

  //============================= Handle Comment =============================
  const handleComment = (ArticlesId) => {
    dispatch(commentArticle(comment.value, ArticlesId, userId));
  }

  //============================= Optimise Search Employee =============================
  const optimiseVersion = debounce(handleSearch, [500])

  //============================= useEffect For Get Blogs, Likes, Comments =============================
  useEffect(() => {
    setComment("");
    dispatch(userProfile());
    dispatch(getBlogs(search, allTags));
    dispatch(likeUser());
  }, [dispatch, search, Toggle, allTags]);
  
  return (
    <>
      <div className="header_div">
        <h1> Blogs </h1>
      </div>
      
      <div className='search'>
        <input name='search' placeholder='Search Blogs...' onKeyUp={optimiseVersion}/>
      </div>
      <div className="blogtags">
        <Checkbox type='checkbox' id={'#birds'} handleClick = {handleClick} isChecked={allTags.includes('#birds')}/> <label>#birds</label>
        <Checkbox type='checkbox' id={'#nature'} handleClick = {handleClick} isChecked={allTags.includes('#nature')}/>  <label>#nature</label>
        <Checkbox type='checkbox' id={'#business'} handleClick = {handleClick} isChecked={allTags.includes('#business')}/>  <label>#business</label>
        <Checkbox type='checkbox' id={'#fashion'} handleClick = {handleClick} isChecked={allTags.includes('#fashion')}/>  <label>#fashion</label>
        <Checkbox type='checkbox' id={'#beautiful'} handleClick = {handleClick} isChecked={allTags.includes('#beautiful')}/>  <label>#beautiful</label>
        <Checkbox type='checkbox' id={'#southIndian'} handleClick = {handleClick} isChecked={allTags.includes('#southIndian')}/>  <label>#southIndian</label>
        <Checkbox type='checkbox' id={'#sweet'} handleClick = {handleClick} isChecked={allTags.includes('#sweet')}/>  <label>#sweet</label>
        <Checkbox type='checkbox' id={'#food'} handleClick = {handleClick} isChecked={allTags.includes('#food')}/>  <label>#food</label>
        </div>
      <div>
        {
          Blogs && Blogs.map(blog => {
                return (
                  <> 
                    {
                      blog._id !== userId ? (
                        <>
                          {
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
                                      key={blog._id}
                                      id={blog._id}
                                      type='text'
                                      placeholder='Write Comments...'
                                      onChange={Comments} 
                                      value={comment}
                                      />
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
                                    Like && Like.map((ele => {
                                      return (
                                        <>
                                            {
                                              blog.Articles.Comment.map(user => {
                                                return (
                                                  <>
                                                    {
                                                      user.userId === ele._id ? (
                                                        <>
                                                        <div className= 'showcomment'>
                                                          <h2 >{ele.username}</h2>
                                                          <p>{user.comment}</p>
                                                        </div>
                                                        </>
                                                      ) :null
                                                    }
                                                  </>
                                                )
                                              })
                                            } 
                                        </>
                                      )
                                    }))   
                                  }
                                </>
                              )
                            }
                          </div>  
          
                        }
                        </>
                      ) : null
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