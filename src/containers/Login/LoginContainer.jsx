import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Login from "../../components/Login/Login";
import { loginApiCaller } from "../../utils/network-request/login-api-call";
import { GlobalDataContext } from "../../App.js";

import { toast } from "react-toastify";

function LoginContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setClientModal } = useContext(GlobalDataContext);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setClientModal("loader");
    const { response, error } = await loginApiCaller.login({
      reqBody: { username, password },
    });
    setClientModal("");

    if (error) {
      toast.error(response.msg || JSON.stringify(response));
    } else {
      setIsLoggedIn(true);
      history.push("/orders");
    }
  };

  return (
    <div>
      <Login
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default LoginContainer;
