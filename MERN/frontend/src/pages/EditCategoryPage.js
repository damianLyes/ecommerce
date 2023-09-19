import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function EditCategoryPage(props){
    const catId = props.match.params.id;
    //const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true)
    

    const getCategory = async() => {
        const {data} = await axios.get(`http://localhost:5000/api/categories/${catId}`);
        setName(data.name);
        setLoading(false);
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        if(!name){
            Swal.fire("Error", "Field Cannot Be Empty", "error");
            return;
        }

        const {data} = await axios.put(`http://localhost:5000/api/categories/${catId}`, {name});
        if(data.success){
            Swal.fire("Done", data.success, "success")
            // getCategory();
            .then(() => {
                props.history.push("/admin-categories");
                window.location.reload();
            });
        }
    }

    useEffect(() => {
        getCategory();
    },[]);

    return (
        <>
        <div className="container">
            <br />
            <div className="row">
                <center>
                <form onSubmit={submitHandler}>
                    <fieldset>
                        <h1 className="d-flex justify-content-center"> Edit Category</h1>
                        {loading ? <div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div> : name ?
                            <>
                                <div className="mb-3 col-md-6">
                                    {/* <label for="exampleFormControlInput1" className="form-label">Category Name</label> */}
                                    <input type="text" className="form-control justify-content-center" id="exampleFormControlInput1" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                
                                
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn purples chuks">Edit</button>
                                    <a href="/admin-categories" className="btn btn-danger chuks">Cancel</a>
                                </div>
                            </>
                            : <p>Error Fetching Info. Try Again Later</p>
                        }
                    </fieldset>
                </form>
                </center>
            </div>
            <br />
        </div>
        </>
    );
}