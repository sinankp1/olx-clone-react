import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";
import { authContext, firebaseContext } from "../../store/firebaseContext";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState('');
  const [image, setImage] = useState();
  const { firebase } = useContext(firebaseContext);
  const { user } = useContext(authContext);
  const history = useHistory();
  const date = new Date();
  const handleSubmit = (e) => {
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase.firestore().collection("products").add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdAt: date.toDateString()
          });
          history.push('/')
        });
      });
  };
  return (
    <Fragment>
      <Header />
      
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          <img
            style={{ display: image ? "" : "none" }}
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
     
    </Fragment>
  );
};

export default Create;
