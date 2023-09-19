import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditProductPage(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const id = props.match.params.id;
  // get id of item to be edited. .id comes from App.js edit page routing

  const getProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    setName(data.name);
    setPrice(data.price);
    setDescription(data.description);
    setImage(data.image);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.put(
      `http://localhost:5000/api/products/${id}`,
      { name, category, price, description, image }
    ); //put() request uses both parameter and the body.
    if (data.success) {
      Swal.fire("DONE", "Product Edited Successfully", "success");
      getProduct();
    }
  };

  const getCategories = async() => {
    const {data} = await axios.get("http://localhost:5000/api/categories");
    setCategories(data);
}

  useEffect(() => {
    getCategories();
    //alert(id);
    getProduct();
  }, []);

  return (
    <>
      <div className="container">
        <br />
        <div className="row">
          <center>
            <form method="" action="" onSubmit={submitHandler}>
              <fieldset>
                <h1 className="d-flex justify-content-center">Edit Product</h1>
                <div className="mb-3 col-md-6">
                  {/* <label for="exampleFormControlInput1" className="form-label">Product Name</label> */}
                  <input
                    type="text"
                    className="form-control justify-content-center"
                    id="exampleFormControlInput1"
                    placeholder="Product Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                            {/* <label for="exampleFormControlInput2" className="form-label">Category</label> */}
                            <select class="form-select" aria-label="Default select" onChange={(event) => setCategory(event.target.value)}>
                                <option disabled></option>
                                {categories.length > 0 ? categories.map(category => {
                                    return (
                                        <>
                                        <option value={category._id}>{category.name}</option>
                                        </>
                                    );
                                })
                                : <p>Try again later...</p>
                            }
                                
                            </select>
                        </div>
                <div className="mb-3 col-md-6">
                  {/* <label for="exampleFormControlInput3" className="form-label">Price</label> */}
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput3"
                    placeholder="Product Price"
                    onChange={(event) => setPrice(event.target.value)}
                    value={price}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  {/* <label for="exampleFormControlTextarea1" className="form-label">Description</label> */}
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Description"
                    onChange={(event) => setDescription(event.target.value)}
                    value={description}
                  ></textarea>
                </div>
                <div className="mb-3 col-md-6">
                  {/* <label for="formFile" className="form-label">Image</label> */}
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Product Image"
                    id="formFile"
                    onChange={(event) => setImage(event.target.value)}
                    value={image}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn purples chuks">
                    Edit
                  </button>
                  <a href="/admin-products" className="btn bg-dark chuks">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-left-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                      />
                    </svg>
                  </a>
                </div>
              </fieldset>
            </form>
          </center>
        </div>
        <br />
      </div>
    </>
  );
}
