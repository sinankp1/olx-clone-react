import React, { useContext, useState, useEffect } from "react";
import { firebaseContext } from "../../store/firebaseContext";
import useTrait from "../../Customhooks/syncState";

import "./View.css";
function View(props) {
  const [userDetails, setUserDetails] = useState();
  const postDetails = useTrait(null)
  // const [postDetails, setPostDetails] = useState();
  // const { postDetails } = useContext(postContext);
  const { firebase } = useContext(firebaseContext);
  const productId = props.id
  useEffect(() => {
    console.log(productId, "alsdjflj");
    firebase
      .firestore()
      .collection("products")
      .where('__name__','==',productId)
      .get()
      .then((response) => {
        response.docs.forEach((doc) => {
          console.log(doc.data());
          console.log(doc.id)
          postDetails.set(doc.data());
        });
        console.log(postDetails.get(),'aksdhfkashdf')
        const {userId} = postDetails.get()
        firebase
          .firestore()
          .collection("users")
          .where("id", "==", userId)
          .get()
          .then((res) => {
            res.forEach((doc) => {
              console.log(doc.data());
              setUserDetails(doc.data());
            });
          })
          .catch((err) => {
            console.log(err);
          });
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);
  return (
    <div className="viewParentDiv">
      {postDetails.get() ? (
        <div className="viewChildDiv">
          <div className="imageShowDiv">
            <span className="helper"></span>
            <img src={postDetails.get() ? postDetails.get().url : ""} alt="" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9; {postDetails.get().price} </p>
              <span>{postDetails.get().name} </span>
              <p>{postDetails.get().catagory}</p>
              <span>{postDetails.get().createdAt}</span>
            </div>
            {userDetails && (
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{userDetails.username}</p>
                <p>{userDetails.phone}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default View;
