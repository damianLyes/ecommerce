import { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {}, [])  --- default function
  //if a user is logged in, go to homepage
 const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ;
  useEffect(() => {
    userInfo && props.history.push("/");
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields");
      return;
    }

    if (!validator.isEmail(email)) {
      setError("Email is invalid");
      return;
    }

    const {data} = await axios.post("http://localhost:5000/api/users/login", {email, password});
    if(data.error){
        setError(data.error);
      }
      if(data.success){
        console.log(data.user)
        localStorage.setItem("userInfo", JSON.stringify(data.user));    //session start
        Swal.fire("Login Successful", `${data.user.username}, Welcome to SWIFT RIDES`, "success")
        .then(() => {
          if(data.user.isAdmin){
            props.history.push("/admin-dashboard");
            window.location.reload();
          }else{
            props.history.push("/");
            window.location.reload(); 
          }
        });
      }

  };

  return (
    <>
      <div class="body">
        <form action="" onSubmit={submitHandler}>
          <h4>Sign In To Your Account</h4>
          {error && <div className="alert alert-danger p-2">{error}</div>}
          <span className="p">Email Address</span>
          <input
            type="email"
            name=""
            className="form-control m-2"
            id=""
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="p">Password</span>
          <input
            type="password"
            name=""
            className="form-control m-2"
            id=""
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            className="form-control m-2 btn btn-dark"
            value="Sign in"
          />
          <center>
            <p className="la">
              Don't have an account?{" "}
              <a href="/register">Create An Account</a>
            </p>
          </center>
        </form>
      </div>
    </>
  );
}
