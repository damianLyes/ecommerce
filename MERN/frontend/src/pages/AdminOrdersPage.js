import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react'

export default function AdminOrdersPage() {
    //const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getOrders() {
        setLoading(true);
        const {data} = await axios.get(`http://localhost:5000/api/orders`)
        setOrders(data);
        setLoading(false);
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
        <div className="container">
        <br />
        <div className="d-flex flex-row bd-highlight justify-content-center">
          <div className="p-2 bd-highlight">
            <h1 className="">Admin Orders </h1>
          </div>
        </div>
        <div className="row">
            {loading ? <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div> : orders.length > 0 ? 
            <>
          <table className="table table-bordered">
            <thead className="thead-dark ">
              <tr className="table-dark" style={{ textAlign: "center" }}>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Total Price (NGN)</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="">
                {orders.map((order, n) => {
                    return (               
                        <tr>
                            <td className="">
                                <div className="d-flex justify-content-center">{n+1}</div>
                            </td>
                            <td>
                                <div className="d-flex justify-content-center">
                                {order.createdAt.slice(0, 10)}
                            </div>
                            </td>
                            <td className="">
                                <div className="d-flex justify-content-center">
                                {order.totalPrice.toLocaleString()}
                                </div>
                            </td>
                            <td>
                                <div className="d-flex justify-content-center">{order.status ? order.status : "-"}</div>
                            </td>
                        
                            <td>
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-around">
                                        <a href={`/order/${order._id}`} ><i class="fa fa-solid fa fa-info action-color"></i></a>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    );
                })
                
                }
            </tbody>
          </table>
          </>
            :<h4>No Orders at this time</h4>
            }
        </div>
        <br />
      </div>
        </>
    );
}