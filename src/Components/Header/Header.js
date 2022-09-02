import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext, firebaseContext } from "../../store/firebaseContext";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

function Header() {
  const { user } = useContext(authContext);
  const { firebase } = useContext(firebaseContext);
  const history = useHistory();
  const handleLogout = async (e) => {
    await firebase.auth().signOut();
    history.push("/");
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>{
          history.push("/");
        }}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName : <span onClick={()=>{
            history.push("/login");
          }}>Login</span>}</span>
          <hr />
        </div>
        <div className="LogoutBtn">
          {user && <span onClick={handleLogout}>Logout</span>}
          <hr />
        </div>

        <div className="sellMenu" onClick={()=>{
          history.push("/create");
        }}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
