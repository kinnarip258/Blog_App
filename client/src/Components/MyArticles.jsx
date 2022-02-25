//========================== Import Modules Start ===========================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteArticle, userProfile } from '../Actions/actions';
//========================== Import Modules End =============================


//============================= My Articles Component Start =============================
const MyArticles = () => {

    const User = useSelector(state => state.User);
    const Toggle = useSelector(state => state.Toggle);

    const dispatch = useDispatch();

    const handleDelete = (id) => {
        if(window.confirm('Are You Sure!')){
            dispatch(deleteArticle(id))
        }
    }
    
    useEffect(() => {
        dispatch(userProfile());
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
                User &&  User.Articles && User.Articles.map((article) => {                 
                    return(
                        <>
                            <div class="profile" key={article._id}>
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
                                <NavLink to = {`/EditArticle/:?id=${article._id}`}><button>Edit</button></NavLink>
                                <button onClick={() => handleDelete(article._id)}>Delete</button>
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