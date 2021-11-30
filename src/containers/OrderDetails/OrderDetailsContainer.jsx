import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { toast } from "react-toastify";
import { GlobalDataContext } from "../../App.js";
import { useContext, useState } from "react";
import TopBarContainer from "../TopBar/TopBarContainer";
import { useEffect } from "react";
import { orderDetailsApiCaller } from "../../utils/network-request/orderDetails-api-call";
import { Modal } from "@mui/material";
import { ordersApiCaller } from "../../utils/network-request/orders-api-call";
import UpdateOrderDetail from "../../components/Modals/UpdateOrderDetail";
import Editor from "../Editor/Editor";

export default function OrderDetailsContainer() {
  const { setIsLoggedIn, setClientModal } = useContext(GlobalDataContext);
  const [orderModal, setOrderModal] = useState("");
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState({});
  const [modalData, setModalData] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const _id = window.location.pathname.split("/")[2];
    const reqBody = { _id };
    setClientModal("loader");
    ordersApiCaller
      .getOrder({ reqBody })
      .then(({ response, error, unauthorized }) => {
        if (unauthorized) setIsLoggedIn(false);
        else if (error) {
          setClientModal("");
          toast.error(response.msg || JSON.stringify(response));
        } else {
          setOrder(response.order);
          setLoad(true);
          orderDetailsApiCaller
            .getOrderDetails({ reqBody })
            .then(({ response, error, unauthorized }) => {
              setClientModal("");
              if (unauthorized) setIsLoggedIn(false);
              else if (error) {
                toast.error(response.msg || JSON.stringify(response));
              } else {
                const rows = response?.orderDetail?.urls?.length
                  ? response.orderDetail.urls.map((val) => {
                      const {
                        _id,
                        unit,
                        url,
                        customer: { firstName, lastName, email, opted },
                      } = val;
                      return {
                        id: _id,
                        unit,
                        url,
                        firstName,
                        lastName,
                        email,
                        opted,
                      };
                    })
                  : [];
                setRows(rows);
              }
            });
        }
      });
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1600,
        margin: "auto",
        padding: "0 24px 24px",
      }}
    >
      <TopBarContainer />

      <OrderDetails
        rows={rows}
        order={order}
        setModalData={setModalData}
        setOrderModal={setOrderModal}
      />
      {load && <Editor order={order} />}
      <Modal
        open={orderModal !== ""}
        onClose={() => {
          setOrderModal("");
        }}
        aria-labelledby="orderModal"
        aria-describedby="orderModal-description"
      >
        {orderModal === "editOrder" ? (
          <UpdateOrderDetail
            modalData={modalData}
            setOrderModal={setOrderModal}
          />
        ) : (
          <div id="orderModal">{null}</div>
        )}
      </Modal>
    </div>
  );
}
