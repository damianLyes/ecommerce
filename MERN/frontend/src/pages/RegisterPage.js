import "./registerPage.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";

//export default function RegisterPage(){
const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ;
  useEffect(() => {
    userInfo && props.history.push("/");
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    //checking if any fields is empty
    if (!email || !username || !password) {
      // Swal.fire("Error", "Please Fill Out All Fields", "error");   //designed alert message
      setError("Please fill all fields");
      return;
    }

    //check if email is valid
    if (!validator.isEmail(email)) {
      setError("Email is invalid");
      return;
    }

    //check for alphaumeric username
    if (!validator.isAlphanumeric(username)) {
      setError("Username can only contain alphabets and numbers");
      return;
    }

    //check if password is of length greater (>=) than 4
    if (password.length < 4) {
      setError("Password must be atleast 4 characters long");
      return;
    }

    //validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const {data} = await axios.post("http://localhost:5000/api/users/register", {email, username, password});
    if(data.error){
      setError(data.error);
    }
    if(data.success){
      //Swal.fire("Done", data.success, "success");
      Swal.fire("Registeration Successful", `${data.user.username}, welcome to SWIFT RIDES`, "success")
      .then(() => {
        props.history.push("/login");
        window.location.reload();  
      });   //push to login page after account creation
    }

  };

  return (
    <>
    {/* <h1>{email}</h1>
    <h1>{username}</h1>
    <h1>{password}</h1>
    <h1>{confirmPassword}</h1> */}
      <div class="d-flex justify-content-center">
        <form action="" onSubmit={submitHandler} style={{width: "500px"}}>
          <h4>Create An Account</h4>
          {error && <div className="alert alert-danger p-2">{error}</div>}
          <span class="p">Email Address</span>
          <input
            type="email"
            className="form-control m-2"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span class="p">Username</span>
          <input
            type="text"
            name=""
            className="form-control m-2"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <span class="p">Password</span>
          <input
            type="password"
            name=""
            className="form-control m-2"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span class="p">Confirm Password</span>
          <input
            type="password"
            name=""
            className="form-control m-2"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="form-control m-2 logbtn btn btn-dark">
            Register
          </button>
          <br />
          <center>
            <p class="la">
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </center>
        </form>
      </div>
      {/* <hr /> */}
    </>
  );
};
export default RegisterPage;
//}
