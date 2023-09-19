import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const AdminCategoriesPage = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);


    const getCategories = async() => {
      // setLoading()
      const {data} = await axios.get("http://localhost:5000/api/categories");
      setCategories(data);
      setLoading(false);
    }

    const deleteHandler = async(id) => {
      const {data} = await axios.delete(`http://localhost:5000/api/categories/${id}`);
      if(data.success){
        Swal.fire("DONE", data.success, "info")
        .then(() => {
          window.location.reload();
        })
      }
    }

    useEffect(() => {
      getCategories();
    },[]);
    
    return (
        <>
        <div className="container">
        <br />
        <div className="d-flex flex-row bd-highlight mivb">
          <div className="p-2 bd-highlight">
            <h1>Admin Categories</h1>
          </div>
          <div className="d-flex flex-row-reverse ">
            <div className="p-2 bd-highlight">
              <a href="/add-category" className="btn btn-primary">
                Add Category
              </a>
            </div>
          </div>
          
        </div>
        <div className="row">
          {loading ? <div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div> :  categories.length > 0 ? 
          <>
            <table className="table table-bordered">
              <thead className="thead-dark ">
                <tr className="table-dark" style={{ textAlign: "center" }}>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="">
              {categories.map((category, n) => {
                return(
                  <>
                        <tr>
                        <td className="">
                          <div className="d-flex justify-content-center">{n+1}</div>
                        </td>
                        <td className="">
                          <div className="d-flex justify-content-center">
                          {category.name}
                          </div>
                        </td>
                        
                        <td>
                          {/* edit &amp; delete */}
                          <div className="d-flex justify-content-center">
                            <div className="d-flex justify-content-around">
                              <a href={`/edit-category/${category._id}`} className="btn btn-info chuks">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                  </svg>
                              </a>
                              <button className="btn btn-danger chuks" onClick={() => deleteHandler(category._id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                );
                })}
              </tbody>
            </table>
          </>     
          : <h3 className="d-flex justify-content-center">No Categories</h3>
          }
        </div>
        <br />
      </div>
        </>
    );
}

export default AdminCategoriesPage