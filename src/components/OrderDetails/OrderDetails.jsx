import { DataGrid } from "@mui/x-data-grid";
import { useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function OrderDetails({ rows, order, setModalData, setOrderModal }) {
  const editOrder = (row) => {
    const _id = window.location.pathname.split("/")[2];
    if (row) row.id = _id;
    setOrderModal("editOrder");
    setModalData({ modalName: "editOrder", row });
  };
  const columns = useMemo(() => {
    return [
      {
        field: "firstName",
        headerName: "First Name",
        headerClassName: "orders-header",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "lastName",
        headerName: "Last Name",
        headerClassName: "orders-header",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "email",
        headerName: "Email",
        headerClassName: "orders-header",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "unit",
        headerName: "Unit No.",
        headerClassName: "orders-header",
        width: 120,
      },
      {
        field: "opted",
        headerName: "Opted",
        headerClassName: "orders-header",
        valueGetter: (data) => {
          return data.row.opted ? "Yes" : "No";
        },
        width: 100,
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
              <a
                href={
                  "https://qr-dan-verify-vivekkm897.vercel.app/" +
                  encodeURIComponent(order?.companyName) +
                  "/" +
                  data?.row?.url
                }
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
    ];
  }, [order]);

  return order && !order.limitedEdition ? (
    <div></div>
  ) : (
    <div style={{ height: 700, marginTop: 30 }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1, backgroundColor: "white" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
