import { useContext, useState } from "react";

import QuillEditor from "./QuillEditor";
import { Button } from "@mui/material";
import { GlobalDataContext } from "../../App";
import { ordersApiCaller } from "../../utils/network-request/orders-api-call";
import { toast } from "react-toastify";

function Editor({ order }) {
  const { setIsLoggedIn, setClientModal } = useContext(GlobalDataContext);
  const [content, setContent] = useState(order?.content || "");
  const onSubmit = async (e) => {
    e.preventDefault();

    setClientModal("loader");
    const { response, error, unauthorized } =
      await ordersApiCaller.editOrder({
        reqBody: {
          _id: order._id,
          companyName: order.companyName,
          content,
        },
      });
    setClientModal("");

    if (unauthorized) setIsLoggedIn(false);
    else if (error) {
      toast.error(response.msg || JSON.stringify(response));
    } else {
      toast.success(response.msg);
    }
  };

  return (
    <div
      style={{ width: "100%", maxWidth: 800, margin: "50px auto" }}
      className="content-editor"
    >
      <QuillEditor
        placeholder="Start updating the content..."
        content={content}
        setContent={setContent}
        setClientModal={setClientModal}
        setIsLoggedIn={setIsLoggedIn}
      />
      <form onSubmit={onSubmit}>
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <Button
            style={{ color: "#0e91a0", border: "2px solid #0e91a0" }}
            size="large"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Editor;
