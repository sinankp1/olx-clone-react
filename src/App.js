import React, { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import { authContext, firebaseContext } from "./store/firebaseContext";
import Post from "./store/postContext";

function App() {
  const { setUser } = useContext(authContext);
  const { firebase } = useContext(firebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Post>
        <Router>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/viewPost/:id">
            <View />
          </Route>
        </Router>
      </Post>
    </div>
  );
}

export default App;
