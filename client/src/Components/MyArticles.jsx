//========================== Import Modules Start ===========================
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteArticle, getLikeArticles, userProfile } from '../Actions/actions';
//========================== Import Modules End =============================


//============================= My Articles Component Start =============================
const MyArticles = () => {

    //============================= redux States =============================
    const User = useSelector(state => state.User);
    const Toggle = useSelector(state => state.Toggle);
    const MyArticles = useSelector(state => state.MyArticles);
    const Like = useSelector(state => state.Like);
    const Comment = useSelector(state => state.Comment);

    console.log("Like", Like);
    //============================= dispatch Api Request =============================
    const dispatch = useDispatch();

    //============================= useStates =============================
    const [showLikedUser, setShowLikedUser] = useState("Likes");

    //============================= Handle Delete =============================
    const handleDelete = (id) => {
        if(window.confirm('Are You Sure!')){
            dispatch(deleteArticle(id))
        }
    }
    
    //============================= UseEffect For User Profile =============================
    useEffect(() => {
        dispatch(userProfile());
        dispatch(getLikeArticles());
    }, [dispatch, Toggle]);

  return (
    <>
        <div className="header_div">
            <h1>My Articles</h1>
        </div>

        <div className='Add_Article'>
            <NavLink to='/addArticle'><button> Add Article </button></NavLink>
        </div>
        <div className='main_div'>
            {
                MyArticles &&  MyArticles.map(article => {
                    return(
                        <>
                            <div class="profile" key={article._id}>
                                <div className='subDiv'>                               
                                    <label>Title </label>
                                    <p>{article.Articles.title}</p>
                                    <label>Category </label>
                                    <p>{article.Articles.category}</p>
                                    <label>Tags </label>
                                    <p>{article.Articles.tags}</p>
                                    <label>Description </label>
                                    <p>{article.Articles.description}</p>
                                </div>
                                <div className='banner'>
                                    <img src={article.Articles.banner} alt='article banner'/>
                                </div>
                                {
                                    Like && Like.map((ele) => {
                                        return (
                                          <>
                                            {
                                                article.Articles._id === ele.articleId ? (
                                                    <>
                                                        {showLikedUser === "Likes" ? (
                                                            <div className='ArticalLikes'>
                                                                <h2 onClick={() => setShowLikedUser("users")}>{`${ele.Users.length} Likes`}</h2>
                                                            </div>
                                                        ) : null}
                                                    </>
                                                    )
                                                : null
                                            }
                                            {
                                                article.Articles._id === ele.articleId ? (
                                                    ele.Users.map(user => {
                                                        return (
                                                            <>
                                                                {showLikedUser === "users" ? (
                                                                <div className='likesUser'>
                                                                    <h2 onClick={() => setShowLikedUser("Likes")}>{`${user.username}`}</h2>
                                                                </div>
                                                                ) : null}
                                                            </>
                                                        )
                                                    })
                                                ) : null
                                            }
                                            </>
                                        )
                                    })
                                }
                                {
                                      Comment && Comment.map((ele) => {
                                        return (
                                          <>
                                            {
                                                article.Articles._id === ele.articleId ? 
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
                                <NavLink to = {`/EditArticle/:?id=${article.Articles._id}`}><button>Edit</button></NavLink>
                                <button onClick={() => handleDelete(article.Articles._id)}>Delete</button>
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

export default MyArticles;

//============================= Export Default End =============================