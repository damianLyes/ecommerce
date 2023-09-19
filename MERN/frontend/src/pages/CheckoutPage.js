import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function CheckoutPage(props){
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    let cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

   // console.log({cartItems: cartItems});

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("234");
    //const [error, setError] = useState("");

    const submitHandler = async(event) => {
        event.preventDefault();
        if(!name || !address || !number){
            Swal.fire("Error", "Please Fill All Fields", "error");
            return;
        }

        // let totalPrice = 0;
        // for(let i = 0; i<cartItems.length; i++){
        //     totalPrice = totalPrice + (cartItems[i].price * cartItems[i].qty);
        // }
        
        //console.log(totalPrice)
        
        const {data} = await axios.post("http://localhost:5000/api/orders", {items: cartItems, user: userInfo._id, name, address, number});
        if(data.success){
            Swal.fire(data.success, `Order ID: ${data.orderId}`, "success")
            .then(() =>{
                localStorage.removeItem("cartItems", JSON.stringify("[]"));
                props.history.push("/order-history");
                window.location.reload();
            });
        }
    }

    useEffect(() => {
        //redirect to login page if user is not logged in
        !userInfo && props.history.push("/login")
    },[])

    return (
        <>
        <div className="body">
        <form action="" onSubmit={submitHandler}>
          <h4>Complete Your Order</h4>
         
          <span className="p">Name</span>
          <input
            type="text"
            name=""
            className="form-control m-2"
            id=""
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <span className="p">Delivery Address</span>
          <input
            type="text"
            name=""
            className="form-control m-2"
            id=""
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <span className="p">Mobile Number</span>
          <input
            type="number"
            name=""
            className="form-control m-2"
            id=""
            placeholder="Enter Password"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="submit"
            className="form-control m-2 btn btn-dark"
            value="Checkout"
          />
          
        </form>
        </div>
        </>
    );
}