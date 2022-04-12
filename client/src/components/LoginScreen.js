import { Link } from "react-router-dom";
import { useState } from "react";

function Login(props) {
  const [username, setUsername] = useState("");

  return (
    <div id="loginscreen">
      <div class="wrapper">
        <input
          class="form-control"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          name="userName"
          id="userName"
          placeholder="Username"
        />
      </div>
      <Link to={`/chat/${username}`}>
        <button class="btn btn-primary mt-3">Login</button>
      </Link>
    </div>
  );
}

export default Login;
