import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthGlobalContext } from '../../context/authContext/AuthGlobalContext';
import { GlobalContext } from '../../context/userContext/GlobalContext';

const AdminUserForm = () => {
  const { currentUser } = useContext(AuthGlobalContext);
  const { state, loadUser, ModifyUser } = useContext(GlobalContext);
  const { oneUser } = state;

  const { _id } = useParams();


  const [localOneUser, setLocalOneUser] = useState<any>(oneUser);


  useEffect(() => {

    loadUser(String(_id));
  }, [_id, loadUser]);


    useEffect(() => {
      setLocalOneUser(oneUser);
      window.localStorage.removeItem("userData");
    }, [oneUser]);

   const { username, email, active } = localOneUser || {};

  const userFromLocalStorage = localStorage.getItem("userData");
  if ( userFromLocalStorage && !localOneUser  ) {  
    setLocalOneUser(JSON.parse(userFromLocalStorage));
  };




  function handleChange(event: any) {
    setLocalOneUser({
      ...localOneUser,
      [event.target.name]: event.target.value,
    });
          window.localStorage.removeItem("userData");
     localStorage.setItem("userData", JSON.stringify(localOneUser));
  };

//
function handleSubmit(event: any) {
 event.preventDefault();

 if(currentUser.isAdmin  && currentUser.id !== _id){

   ModifyUser(_id, localOneUser);
   alert("Info User modified!");
    window.location.reload();
 }else{
  alert("You can not modify your data in this section")
 };

 console.log({ localOneUser });
 console.log( localOneUser._id );
};




    return (
      <>
        <h1>Admin Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="">
              <label htmlFor="username">Username client:&nbsp; </label> <br />
              <input
                value={username || ""}
                onChange={handleChange}
                type="text"
                name="username"
                required
              />{" "}
            <br /> <br />
            
              <label htmlFor="email">Email client: </label> <br />
              <input
                value={email || ""}
                onChange={handleChange}
                type="email"
                name="email"
                required
              />
       
            <br /> <br />
            <div className='divSelect'>
            <label htmlFor="active">status account: </label> <br />
            <select
              value={active || ""}
              onChange={handleChange}
              name="active"
              required
              id="active"
            >
              <option>- -</option>
              <option value="true">actived</option>
              <option value="false">deactivated</option>
            </select>{" "}
            <span>
              &nbsp; actual status:{" "}
              <span className={`text-${active ? "success" : "danger"}`}>
                {" "}
                {active ? "active" : "deactivate"}
              </span>
            </span>
            </div>
            < br/> <br />
             </div >
          <button className="btn-sm bg-secondary text-warning" type="submit">
            <b>Submit</b>
          </button>
        </form>
      </>
    );
}

export default AdminUserForm;