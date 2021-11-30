import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useMemo } from "react";
import "./Orders.css";

function Orders({
  rows,
  setModalData,
  setOrderModal,
  generateUrls,
  getCustomers,
  deleteOrder,
}) {
  const editOrder = (row) => {
    setOrderModal("editOrder");
    setModalData({ modalName: "editOrder", row });
  };

  const columns = useMemo(() => {
    return [
      {
        field: "companyName",
        headerName: "Company Name",
        headerClassName: "orders-header",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "productName",
        headerName: "Product Name",
        headerClassName: "orders-header",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        headerClassName: "orders-header",
        width: 120,
      },
      {
        field: "limitedEdition",
        headerName: "Limited Edition",
        headerClassName: "orders-header",
        valueGetter: (data) => {
          return data.row.limitedEdition ? "Yes" : "No";
        },
        width: 140,
      },
      {
        field: "action",
        headerName: "Action",
        headerClassName: "orders-header",
        renderCell: (data) => {
          return (
            <div style={{ display: "flex" }}>
              <div
                onClick={(e) => editOrder(data?.row)}
                style={{ cursor: "pointer", padding: 2, marginTop: 12 }}
              >
                <EditIcon />
              </div>
              <div
                onClick={(e) => deleteOrder(data?.id)}
                style={{ cursor: "pointer", padding: 2, marginTop: 12 }}
              >
                <DeleteIcon />
              </div>
              <a
                href={window.location.origin + "/orders/" + data?.id}
                target="_blank"
              >
                <div style={{ padding: 2, marginTop: 12, color: "black" }}>
                  <OpenInNewIcon />
                </div>
              </a>
            </div>
          );
        },
        width: 120,
      },
      {
        field: "downloadUrls",
        headerName: "Download URLs",
        headerClassName: "orders-header",
        renderCell: (data) => {
          return (
            <div
              onClick={(e) =>
                generateUrls(
                  data?.id,
                  data?.row?.productName,
                  data?.row?.companyName
                )
              }
              style={{ cursor: "pointer", padding: 2, marginTop: 12 }}
            >
              <DownloadIcon />
            </div>
          );
        },
        width: 130,
      },
      {
        field: "downloadCustomers",
        headerName: "Customers",
        headerClassName: "orders-header",
        renderCell: (data) => {
          return (
            <div
              onClick={(e) =>
                getCustomers(
                  data?.id,
                  data?.row?.productName,
                  data?.row?.companyName
                )
              }
              style={{ cursor: "pointer", padding: 2, marginTop: 12 }}
            >
              <DownloadIcon />
            </div>
          );
        },
        width: 130,
      },
    ];
  }, []);

  return (
    <div style={{ height: 700, marginTop: 30 }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1, backgroundColor: "white" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default Orders;
