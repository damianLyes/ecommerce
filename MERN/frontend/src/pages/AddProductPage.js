import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function AddProductPage(props){
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    //const [error, setError] = useState("");

    async function fileInputHandler(e) {
        setUploading(true);
        const file = e.target.files[0]; //targets the first file selected when more than one files are selected

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "swiftrides");
        data.append("cloud_name", "pd-media-library");

        axios.post("https://api.cloudinary.com/v1_1/pd-media-library/image/upload", data)
        .then(response => {
            setImage(response.data.url);
            // console.log(data);
            setUploading(false);
            setUploaded(true);
        })
        .catch(error => {
            Swal.fire("Error", "Error Uploading Image", "error");
            setUploading(false);
        })
        // const {responseData} = await axios.post("https://api.cloudinary.com/v1_1/pd-media-library/image/upload", data);        
        // if(responseData){
        //     setImage(responseData.url);
        //     setUploading(false)
        // }
        // else{
        //     Swal.fire("Error", "Image Upload Failed, Try Again", "error");
        //     setUploading(false);
        // }

    }
    
    const submitHandler = async(event) => {
        event.preventDefault();
        const {data} = await axios.post("http://localhost:5000/api/products", {name, category, price, description, image});     
        //data as an object {data}
        //axios.post('route-to-send-object-to', {object to send})
        if(data.success){
            Swal.fire("DONE", "Product Saved Successfully", "success")
            .then(() => {
                props.history.push("/admin-products");
                window.location.reload();
            });
        }
    }

    const getCategories = async() => {
        const {data} = await axios.get("http://localhost:5000/api/categories");
        setCategories(data);
    }

    useEffect(() => {
        getCategories();
    },[]);

    return (
        <>
        <div className="container">
            <br />
            <div className="row">
                <center>
                <form method="" action="" onSubmit={submitHandler} >
                    <fieldset>
                        <h1 className="d-flex justify-content-center">Add New Product</h1>
                        <div className="mb-3 col-md-6">
                            {/* <label for="formFile" className="form-label">Image</label> */}
                            <input className="form-control" type="file" placeholder="Product Image" id="formFile" 
                             onChange={fileInputHandler}
                             accept="image/*"
                            />
                        </div>
                        {uploading && <div>Uploading...</div>}
                        {uploaded && <div>Successfully Uploaded</div>}
                        <div className="mb-3 col-md-6" hidden>
                            {/* <label for="formFile" className="form-label">Image</label> */}
                            <input className="form-control" type="text" placeholder="Product Image" id="formFile" 
                             value={image}
                            />
                        </div>
                        <div className="mb-3 col-md-6">
                            {/* {error && <div className="alert alert-danger p-2">{error}</div>} */}
                            {/* <label for="exampleFormControlInput1" className="form-label">Product Name</label> */}
                            <input type="text" className="form-control justify-content-center" id="exampleFormControlInput1" placeholder="Enter Product Name" onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="mb-3 col-md-6">
                            {/* <label for="exampleFormControlInput2" className="form-label">Category</label> */}
                            <select class="form-select" aria-label="Default select" onChange={(event) => setCategory(event.target.value)}>
                                <option selected disabled>---Choose Category---</option>
                                {categories.length > 0 ? categories.map(category => {
                                    return (
                                        <>
                                        <option value={category._id}>{category.name}</option>
                                        </>
                                        );
                                })
                                : <h2 disabled={categories.length === 0} selected={categories.length === 0}>No categories. Add a Category</h2>
                            }
                                
                            </select>
                        </div>
                        <div className="mb-3 col-md-6">
                            {/* <label for="exampleFormControlInput3" className="form-label">Price</label> */}
                            <input type="number" className="form-control" id="exampleFormControlInput3" placeholder="Product Price" onChange={(event) => setPrice(event.target.value)}/>
                        </div>
                        <div className="mb-3 col-md-6">
                            {/* <label for="exampleFormControlTextarea1" className="form-label">Description</label> */}
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Description" onChange={(event) => setDescription(event.target.value)}></textarea>
                        </div>
                        
                        
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn purples chuks" disabled={uploading}>Add</button>
                            <a href="/admin-products" className="btn btn-danger chuks">Cancel</a>
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