import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { GlobalDataContext } from "../../App";
import { orderDetailsApiCaller } from "../../utils/network-request/orderDetails-api-call";

export default function UpdateOrderDetail({ modalData, setOrderModal }) {
  const { setIsLoggedIn, setClientModal } = useContext(GlobalDataContext);

  const [firstName, setFirstName] = useState(modalData?.row?.firstName || "");
  const [lastName, setLastName] = useState(modalData?.row?.lastName || "");
  const [email, setEmail] = useState(modalData?.row?.email || null);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const [validEmail, setValidEmail] = useState(
    validateEmail(modalData?.row?.email) || false
  );

  const changeEmail = val => {
    setValidEmail(validateEmail(val));
    setEmail(val);
  }

  const editOrderDetail = async (e) => {
    e.preventDefault();

    setClientModal("loader");
    const { response, error, unauthorized } =
      await orderDetailsApiCaller.editOrderDetail({
        reqBody: {
          _id: modalData?.row?.id,
          url: modalData?.row?.url,
          unit: modalData?.row?.unit,
          opted: modalData?.row?.opted,
          firstName,
          lastName,
          email,
        },
      });
    setClientModal("");

    if (unauthorized) setIsLoggedIn(false);
    else if (error) {
      toast.error(response.msg || JSON.stringify(response));
    } else {
      toast.success(response.msg);
      setOrderModal("");
      setTimeout(() => window.location.reload(), 2000);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        width: 350,
      }}
      id="orderModal"
      className="modal-center"
    >
      <div
        style={{
          marginBottom: 16,
          fontWeight: 700,
          color: "#495662",
          fontSize: 22,
        }}
      >
        Update Order Detail
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField
          id="first-input"
          error={!firstName}
          value={firstName}
          sx={{ width: "100%" }}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name*"
          variant="standard"
          helperText={!firstName ? "First Name is Mandatory." : ""}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField
          id="last-input"
          value={lastName}
          sx={{ width: "100%" }}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name(optional)"
          variant="standard"
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <TextField
          id="email-input"
          error={!validEmail}
          value={email}
          sx={{ width: "100%" }}
          onChange={(e) => changeEmail(e.target.value)}
          label="Email ID(optional)"
          variant="standard"
          helperText={validEmail ? "" : "Please enter a valid email id."}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            onClick={() => setOrderModal("")}
            sx={{
              color: "#ff2c2c",
              border: "2px solid #ff2c2c",
              padding: "8px 24px",
            }}
          >
            CLOSE
          </Button>
        </div>
        <div>
          <Button
            onClick={editOrderDetail}
            style={{
              color: "#0e91a0",
              border: "2px solid #0e91a0",
              padding: "8px 20px",
            }}
            disabled={!firstName || (email && !validEmail)}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
