import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchResultPage(props) {
  const [products, setProducts] = useState([]);
  const text = props.match.params.text;

  const getProducts = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/products?text=${text}`);
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <br />
      <div className="">
        <h2>
          <center>Search Result</center>
        </h2>
      </div>
      <section>
        <div>
          <div className="container">
            <div className="row d-flex justify-content-center">
              {products.length > 0 ?
                products.map((product) => {
                  return (
                    <a className="col" href={`/product/${product._id}`}>
                      <div className="card" style={{ width: "18rem" }}>
                        <img
                          src={product.image}
                          className="card-img-top"
                          alt="..."
                          style={{height: "250px"}}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <br />
                          <p className="card-text">₦ {product.price.toLocaleString()}</p>
                          <a href={`/cart/${product._id}`} className="btn btn-dark">
                            Add To Cart
                          </a>
                        </div>
                      </div>
                    </a>
                  );
                })
                : <h1>Loading...</h1>
              }

            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <div>
        <center>
          <h1>Swift Rides</h1>
          <h2>Buy slightly damaged cars from Swift Rides online</h2>
          <h5 className="offers">
            Swift Rides offers a vast selection of used and slightly damaged
            vehicles for immediate purchase. If you live outside of the US and a
            consumer or a car dealer who wants to export a slightly damaged car
            to other countries, Swift Rides is the right choice for you. With
            more than a decade of involvement with the vehicle market, we, at
            the swiftride.netlify.app, have the mastery to get you what you
            need. Our groups of experts give it their 100 % throughout the day,
            consistently to help you in any capacity that we can. We plan to
            provide the entirety of our clients with as much data concerning any
            inquiries or worries that they may have. Check out swift rides
            eshop, our latest inventory, and get in touch with our experts to
            buy the used or salvage car you want.
          </h5>
        </center>
      </div>
      <br />
      <br />
      <br />
    </>
  );
}

export default SearchResultPage;
