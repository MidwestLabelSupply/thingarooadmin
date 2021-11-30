import { Modal } from "@mui/material";
import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Loader from "./components/Modals/Loader";
import LoginContainer from "./containers/Login/LoginContainer";
import OrdersContainer from "./containers/Orders/OrdersContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetailsContainer from "./containers/OrderDetails/OrderDetailsContainer";

export const GlobalDataContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [clientModal, setClientModal] = useState("");

  return (
    <div className="App">
      <GlobalDataContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          clientModal,
          setClientModal,
        }}
      >
        <Router>
          {!isLoggedIn && <Redirect to="/login" />}

          <Route path="/login" exact component={LoginContainer} />
          {isLoggedIn && (
            <Switch>
              <Route path="/orders" exact component={OrdersContainer} />
              <Route
                path="/orders/:orderId"
                component={OrderDetailsContainer}
              />
              <Redirect to="/orders" />
            </Switch>
          )}
        </Router>
      </GlobalDataContext.Provider>
      <Modal
        open={clientModal !== ""}
        // onClose={() => {

        // }}
        aria-labelledby="clientModal"
        aria-describedby="clientModal-description"
      >
        <Loader />
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default App;
