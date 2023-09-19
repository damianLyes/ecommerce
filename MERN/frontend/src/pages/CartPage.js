import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./cartPage.css";

export default function CartPage(props) {
  const productId = props.match.params.id;
  let cartItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
  // const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const [qty, setQty] = useState(1);
  // const [qty, setQty] = useState(1);


  const addToCart = async (productId, qty) => {
    //get info about the product
    const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
    //spread operator: add value to an object without changing it
    const item = {...data, qty: qty};   //can also be written ad {...data, qty}

    //check if there are items on the cart
    if(!cartItems){
      localStorage.setItem("cartItems", JSON.stringify([item]));
      props.history.push("/cart")
      window.location.reload();
      return;
    }

    //check if item already exists in the cart
    const existingItem = cartItems.find(x => x._id === item._id);
    if(existingItem){
      //update items(quantity)
      cartItems = cartItems.map(x => x._id === existingItem._id ? item : x);
    }else{
      //adding new items to already existing cart
      cartItems = [...cartItems, item];
    }
    
    //add the data to the cart in local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    props.history.push("/cart")
    window.location.reload();
  };

  const arrNums = []
  //array of numbers from 1 - 100???
  for (let i = 1; i <= 100; i++) {
    arrNums.push(i);
  }

  let cartTotal = 0;
  //calculate total price of items added to cart???
  for (let i = 0 ; i < cartItems.length; i++){
    cartTotal = cartTotal + (cartItems[i].qty * cartItems[i].price);
  }

  function deleteItem(id){
    cartItems = cartItems.filter((x) => x._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    window.location.reload();
  }
 
  useEffect(() => {
    productId && addToCart(props.match.params.id, 1); //default quantity of cartItems to 1
    // localStorage.removeItem("cartItems")
  }, []);

  return (
    <>
      <h4 class="c">Cart Items </h4>

      <div class="cart">
        <table>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price(NGN)</th>
            <th>Quantity</th>
            <th></th>
          </tr>

          {cartItems.length > 0 ?
            cartItems.map((item) => {
              return (
                <tr style={{height: "5rem"}}>
                  <td >
                    <img src={item.image} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()}</td>
                  <td>
                    <select value={item.qty} onChange={e => addToCart(item._id, Number(e.target.value))}>
                      {arrNums.map(x => {
                        return <option value={x}>{x}</option>
                      })}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteItem(item._id)}><i class="fa fa-trash-alt" aria-hidden="true"></i></button>
                  </td>
                </tr>
              );
            })
          : <h2>No items in cart</h2>
          }

        </table>

        <div class="check">
          <h5>Subtotal of {cartItems.length} Product(s)</h5>

          <h3>NGN {cartTotal.toLocaleString()}</h3>
          <a href="/checkout">
          <button type="" disabled={cartItems.length === 0} className="btn btn-primary w-100">Checkout</button>
          </a>
        </div>
      </div>
    </>
  );
}
