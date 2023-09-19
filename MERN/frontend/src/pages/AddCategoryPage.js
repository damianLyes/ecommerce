import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddCategoryPage(props){
    const [name, setName] = useState("");


    const submmitHandler = async(event) => {
        event.preventDefault();
        if(!name){
            Swal.fire("Error", "Field Cannot Be Empty", "warning");
            return;
        }

        const {data} = await axios.post("http://localhost:5000/api/categories", {name});
        if(data.success){
            Swal.fire("Done", data.success, "success")
            .then(() => {
                props.history.push("/admin-categories");
                window.location.reload();
            })
        }
    };


    return (
        <>
        <div className="container">
            <br />
            <div className="row">
                <center>
                <form onSubmit={submmitHandler}>
                    <fieldset>
                        <h1 className="d-flex justify-content-center"> Add Category</h1>
                        <div className="mb-3 col-md-6">
                            {/* <label for="exampleFormControlInput1" className="form-label">Category Name</label> */}
                            <input type="text" className="form-control justify-content-center" id="exampleFormControlInput1" placeholder="Enter Category Name" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        
                        
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary chuks">Add</button>
                            <a href="/admin-categories" className="btn btn-danger chuks">Cancel</a>
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