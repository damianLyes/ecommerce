import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Header() {
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};  
  //gets logged in user as an object. else userInfo = {} -> empty object
  // const userInfo = JSON.parse(localStorage.getItem(userInfo));
  const [text, setText] = useState("");
  const history = useHistory();

  function submitHandler(e){
    e.preventDefault();
    // props.history.push(`/search/${text}`);
    // window.location.reload();

    history.push(`/search/${text}`);
    window.location.reload();
  }

  //logout function
  function logOut(){
    localStorage.removeItem("userInfo");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            SWIFT RIDES
          </a>
          <div className="header-search">
            <form className="input-group input-group-append" onSubmit={submitHandler}>
              
                <input type="text" className="form-group strg" onChange={e => setText(e.target.value)} placeholder="Search Product" style={{width: "30rem"}} aria-label="Search Product" aria-describedby="basic-addon2"/>
                <button className="btn btn-dark" type="submit" ><i className="fa fa-search"></i></button>
              
            </form>
            
          
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
          
            <ul className="navbar-nav ms-auto">


              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  INVENTORY
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  CART
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* {userInfo && userInfo.username} */}
                  {userInfo.username ? userInfo.username : "User"} 
                  {/* if userInfo.username is defined show username else, show string user */}
                </a>
                  <ul className="dropdown-menu" style={{ width: "5rem" }}>
                  {!userInfo.username &&  
                    <>
                      <li>
                        <a className="dropdown-item" href="/login">
                          Login
                        </a>
                      </li> 
                  
                      <li>
                         <a className="dropdown-item" href="/register">
                         Register
                         </a>                     
                      </li> 
                    </>
                  }
                    
                    {userInfo && userInfo.isAdmin && 
                    <>
                      <li>
                        <a className="dropdown-item" href="/admin-products">
                          Admin Products
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/admin-orders">
                          Admin Orders
                        </a>
                      </li>

                      <li>
                        <a className="dropdown-item" href="/admin-categories">
                          Admin Category 
                        </a>
                      </li>
                      
                      <li>
                        <a className="dropdown-item" href="/" onClick={logOut}>
                          Logout
                        </a>
                      </li>
                    </>
                    }
                    {userInfo.username && !userInfo.isAdmin &&
                    <>
                      <li>
                        <a className="dropdown-item" href="/order-history">
                          Order History
                        </a>
                      </li>

                      <li>
                        <a className="dropdown-item" href="/" onClick={logOut}>
                          Logout
                        </a>
                      </li>
                    </>
                    }
                  </ul>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}