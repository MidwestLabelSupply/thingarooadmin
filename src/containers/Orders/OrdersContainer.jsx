import Orders from "../../components/Orders/Orders";
import { toast } from "react-toastify";
import { GlobalDataContext } from "../../App.js";
import { useContext, useState } from "react";
import TopBarContainer from "../TopBar/TopBarContainer";
import { useEffect } from "react";
import { ordersApiCaller } from "../../utils/network-request/orders-api-call";
import { Button, Modal } from "@mui/material";
import AddOrder from "../../components/Modals/AddOrder";
import UpdateOrder from "../../components/Modals/UpdateOrder";
import { ExportToCsv } from "export-to-csv";
import { orderDetailsApiCaller } from "../../utils/network-request/orderDetails-api-call";

export default function OrdersContainer() {
  const { setIsLoggedIn, setClientModal } = useContext(GlobalDataContext);
  const [orderModal, setOrderModal] = useState("");
  const [rows, setRows] = useState([]);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    setClientModal("loader");
    ordersApiCaller.getOrders().then(({ response, error, unauthorized }) => {
      setClientModal("");
      if (unauthorized) setIsLoggedIn(false);
      else if (error) {
        toast.error(response.msg || JSON.stringify(response));
      } else {
        const rows = response.orders.map((val) => {
          const { _id, ...value } = val;
          return {
            id: _id,
            ...value,
          };
        });
        setRows(rows);
      }
    });
  }, []);

  const generateUrls = async (_id, productName, companyName) => {
    setClientModal("loader");
    const { response, error, unauthorized } =
      await ordersApiCaller.generateUrls({
        reqBody: { _id },
      });
    setClientModal("");

    if (unauthorized) setIsLoggedIn(false);
    else if (error) {
      toast.error(response.msg || JSON.stringify(response));
    } else {
      toast.success(response.msg);
      const generatedUrls = response.result.urls?.map((val) => {
        return {
          url:
            "https://verify.thingaroo.com/" +
            encodeURIComponent(companyName) +
            "/" +
            val.url,
        };
      });
      if (generatedUrls?.length === 0) generatedUrls.push({ url: "" });

      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        // showTitle: true,
        // title: 'My Awesome CSV',
        filename: productName || "file",
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };
      const csvExporter = new ExportToCsv(options);

      if (generatedUrls?.length !== 0) csvExporter.generateCsv(generatedUrls);
    }
  };

  const getCustomers = async (_id, productName, companyName) => {
    setClientModal("loader");
    const { response, error, unauthorized } =
      await orderDetailsApiCaller.getOrderDetails({ reqBody: { _id } });
    setClientModal("");

    if (unauthorized) setIsLoggedIn(false);
    else if (error) {
      toast.error(response.msg || JSON.stringify(response));
    } else {
      const rows = response?.orderDetail?.urls?.length
        ? response.orderDetail.urls.map((val) => {
            const {
              unit,
              url,
              customer: { firstName, lastName, email, opted },
            } = val;
            return {
              unit,
              url:
                "https://verify.thingaroo.com/" +
                encodeURIComponent(companyName) +
                "/" +
                url,
              firstName,
              lastName,
              email,
              opted: opted ? "Yes" : "No",
            };
          })
        : [
            {
              unit: "",
              url: "",
              firstName: "",
              lastName: "",
              email: "",
              opted: "",
            },
          ];

      const options = {
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        filename: productName ? productName + "-customers" : "file",
        useBom: true,
        headers: [
          "Unit No.",
          "URL",
          "First Name",
          "Last Email",
          "Email ID",
          "Opted",
        ],
      };
      const csvExporter = new ExportToCsv(options);

      if (rows?.length !== 0) csvExporter.generateCsv(rows);
    }
  };

  const deleteOrder = async (_id) => {
    setClientModal("loader");
    console.log("sa", _id);
    const { response, error, unauthorized } = await ordersApiCaller.deleteOrder(
      {
        reqBody: { _id },
      }
    );
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
        width: "100%",
        maxWidth: 1600,
        margin: "auto",
        padding: "0 24px 24px",
      }}
    >
      <TopBarContainer />

      <Button
        onClick={() => setOrderModal("addOrder")}
        style={{ color: "#0e91a0", border: "2px solid #0e91a0" }}
        size="large"
      >
        ADD AN ORDER
      </Button>
      <Orders
        rows={rows}
        setModalData={setModalData}
        setOrderModal={setOrderModal}
        generateUrls={generateUrls}
        getCustomers={getCustomers}
        deleteOrder={deleteOrder}
      />
      <Modal
        open={orderModal !== ""}
        onClose={() => {
          setOrderModal("");
        }}
        aria-labelledby="orderModal"
        aria-describedby="orderModal-description"
      >
        {orderModal === "addOrder" ? (
          <AddOrder setOrderModal={setOrderModal} />
        ) : orderModal === "editOrder" ? (
          <UpdateOrder modalData={modalData} setOrderModal={setOrderModal} />
        ) : (
          <div id="orderModal">{null}</div>
        )}
      </Modal>
    </div>
  );
}
