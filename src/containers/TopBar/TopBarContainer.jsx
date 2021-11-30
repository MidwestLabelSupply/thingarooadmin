import { logoutApiCaller } from "../../utils/network-request/logout-api-call";
import { GlobalDataContext } from "../../App.js";
import { useContext } from "react";

import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
function TopBarContainer() {
  const { setIsLoggedIn, setClientModal } = useContext(GlobalDataContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientModal("loader");

    const { response, error } = await logoutApiCaller.logout({
      reqBody: {},
    });
    setClientModal("");

    if (error) {
      toast.error(response.msg || JSON.stringify(response));
    } else {
      setIsLoggedIn(false);
      toast.success(response.msg);
      history.push("/login");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 16,
        marginBottom: 30
      }}
    >
      <div style={{fontSize: 24, fontWeight: 600, color: "#495662"}}>Hello Admin</div>
      <div>
        <Button
          onClick={handleSubmit}
          style={{
            color: "#0E91A0",
            borderColor: "#0E91A0",
          }}
          variant="outlined"
          size="medium"
        >
          LOGOUT
        </Button>
      </div>
    </div>
  );
}

export default TopBarContainer;
