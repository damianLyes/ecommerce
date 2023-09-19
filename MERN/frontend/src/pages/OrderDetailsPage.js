import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function OrderDetailsPage(props) {
    const id = props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  
    const getOrderDetails = async() => {
        setLoading(true);
        const {data} = await axios.get(`http://localhost:5000/api/orders/${id}`);
        setOrder(data);
        setLoading(false);
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        const {data} = await axios.put(`http://localhost:5000/api/orders/${id}`, {status});
        if(data.success){
            Swal.fire("Done", data.success, "success");
            getOrderDetails();
        }
    }

    useEffect(() => {
     id &&   getOrderDetails();
    },[]);

    return (
        <>
        {loading ? <h3>Getting Order Details...</h3> : 
        <div className="order-details">
        <div className="info">
            <div className="items box">
                <h3>Order Items</h3>
                {order.items.map(item => {
                    return (
                        <div className="item">
                            <img src={item.image} alt="" />
                            {" "}
                            <span>{item.name}</span> <span>{item.qty} x NGN {item.price.toLocaleString()} = NGN {(item.qty * item.price).toLocaleString()}</span>
                        </div>
                    );
                })}
                
                
            </div>
            <div className="delivery box">
                <h3>Delivery Information</h3>
                <div><strong>Name: </strong>{order.name} </div>
                <div><strong>Address: </strong> {order.address}</div>
                <div><strong>Phone Number: </strong> {order.number}</div>
                <div><strong>Delivery Status: </strong> {order.status}</div>
                <br /><br />
                
                {userInfo.isAdmin &&
                    <>
                        <h5>Update Status</h5>
                        <form action="" onSubmit={submitHandler}>
                            <input type="radio" className="ms-4" name="status" value="Pending" onChange={e => setStatus(e.target.value)}/> Pending
                            {/* checked={order.status === "Pending"} */}
                            <input type="radio" className="ms-3" name="status" value="Enroute" onChange={e => setStatus(e.target.value)}/> Enroute
                            <input type="radio" className="ms-3" name="status" value="Delivered" onChange={e => setStatus(e.target.value)}/> Delivered
                            <button type="submit" className="btn-sm btn-primary ms-3">Update</button>
                        </form>
                    </>
                }
            </div>
        </div>
        <div className="summary box">
            <h3>Order Summary</h3>
            <div><strong>Total Items: </strong> {order.items.length}</div>
            <div><strong>Total Price: </strong> {"NGN " +(order.totalPrice).toLocaleString()}</div>
            
        </div>
    </div>
        }
        
        </>
    );
}