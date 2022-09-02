import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Heart from "../../assets/Heart";
import { firebaseContext } from "../../store/firebaseContext";
import { postContext } from "../../store/postContext";
import "./Post.css";

function Posts() {
  const { firebase } = useContext(firebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(postContext);
  const history = useHistory();
  useEffect(() => {
    firebase
      .firestore()
      .collection("products")
      .get()
      .then((snapshot) => {
        const allPosts = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPosts);
      });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => {
            return (
              <Link
                to={`/viewPost/${product.id}`}
                style={{ color:'black'}}
              >
                <div
                  key={product.id}
                  className="card"

                  // onClick={async () => {
                  //   history.push(`/viewPost/${product.id}`);
                  // }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.url} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
