import { Button } from "@mui/material";

export default function DeleteOrder({ setOrderModal, modalData, deleteOrder }) {
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
          fontSize: 18,
          fontWeight: 600,
          color: "#495662",
          marginBottom: 30,
        }}
      >
        Do you really want to delete this Order?
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
              color: "#0e91a0",
              border: "2px solid #0e91a0",
              padding: "6px 16px",
            }}
          >
            CLOSE
          </Button>
        </div>
        <div>
          <Button
            onClick={() => deleteOrder(modalData?.id)}
            sx={{
              color: "#ff2c2c",
              border: "2px solid #ff2c2c",
              padding: "6px 16px",
            }}
          >
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
}
