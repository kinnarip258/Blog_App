import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
//import { deleteUser, userProfile } from '../Actions/actions';

const Profile = () => {

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  //============================= LoginUser Details =============================
  const LoginUser = useSelector(state => state.LoginUser)
  
  // const handleDelete = (email) => {
  //   if(window.confirm("Are You Sure")){
  //     dispatch(deleteUser(email));      
  //   }
    
  // }
  // useEffect(() => {
  //   dispatch(userProfile());
  // }, [dispatch]);

  return (
    <>
      <div class="login-page">
        <div className="header_div">
          <h1>Profile </h1>
        </div>
        <div class="profile">
            {
              LoginUser && (
                <>
                  <p>Name : {LoginUser.name}</p>
                  <p>Email : {LoginUser.email}</p>
                  <p>Phone Number : {LoginUser.phone}</p>
                  <p>UserName : {LoginUser.username}</p>
                </>
              )
            }
            <NavLink to={`/EditProfile/:?id=${LoginUser._id}`}><button>Edit</button></NavLink>
            {/* <button onClick={() => handleDelete(LoginUser.email)}>Delete</button> */}
        </div>
      </div>
    </>
    
  )
}

export default Profile;