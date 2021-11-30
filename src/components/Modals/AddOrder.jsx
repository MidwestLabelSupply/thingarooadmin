import { Button, Checkbox, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { GlobalDataContext } from "../../App";
import { ordersApiCaller } from "../../utils/network-request/orders-api-call";

export default function AddOrder({ setOrderModal }) {
  const { setIsLoggedIn, setClientModal } = useContext(GlobalDataContext);

  const [companyName, setCompanyName] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [limitedEdition, setLimitedEdition] = useState(false);

  const addOrder = async (e) => {
    e.preventDefault();

    setClientModal("loader");
    const { response, error, unauthorized } = await ordersApiCaller.addOrder({
      reqBody: { companyName, productName, quantity, limitedEdition },
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
        Add An Order
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField
          id="company-input"
          error={!companyName}
          value={companyName}
          sx={{ width: "100%" }}
          onChange={(e) => setCompanyName(e.target.value)}
          label="Company Name*"
          variant="standard"
          helperText={!companyName ? "Company Name is Mandatory." : ""}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <TextField
          id="product-input"
          value={productName}
          sx={{ width: "100%" }}
          onChange={(e) => setProductName(e.target.value)}
          label="Product Name"
          variant="standard"
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <TextField
          id="quantity-input"
          error={quantity ? isNaN(quantity) : false}
          value={quantity}
          sx={{ width: "100%" }}
          onChange={(e) => setQuantity(e.target.value)}
          label="Quantity"
          variant="standard"
          helperText={
            quantity && isNaN(quantity)
              ? "Quantity should be a valid number"
              : ""
          }
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
          marginLeft: -10,
        }}
      >
        <Checkbox
          checked={limitedEdition}
          onChange={() => setLimitedEdition(!limitedEdition)}
          inputProps={{ "aria-label": "controlled" }}
          style={{ margin: "2px 0 0 0", color: "#0E91A0" }}
        />

        <div style={{ fontWeight: 500, color: "#495662" }}>Limited Edition</div>
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
            style={{
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
            onClick={addOrder}
            style={{
              color: "#0e91a0",
              border: "2px solid #0e91a0",
              padding: "8px 30px",
            }}
            disabled={!companyName || (quantity && isNaN(quantity))}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
