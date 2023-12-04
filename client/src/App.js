import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LoginRoute from "./components/LoginRoute";
import Register from "./pages/Register";
import SelectBoard from "./pages/SelectBoard"
import Board from "./pages/Board"


function App() {
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    // Make a request to the server
    axios
      .get("/test")
      .then((response) => {
        // Set the response message to state
        setServerMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error connecting to the server:", error);
      });
  }, []);

  // Log the server message
if (serverMessage) {
  console.log("Server says: " + serverMessage);
}

  return (
    <div>
    <BrowserRouter>
        <Routes>
            <Route path="/" Component={LandingPage}/>
            <Route path="/login" element={
              <LoginRoute>
                <Login />
              </LoginRoute>
              } />
            <Route path="/register" Component={Register}/>
            {/* Check if the user is logged in. If so, able to access SelectBoard. Else, Redirect to Login Page. (Same for other private pages) */}
            <Route path="/select" element={
                        <PrivateRoute>
                            <SelectBoard/>
                        </PrivateRoute>
                    }/>
                    <Route path="/board/:boardId" element={
                        <PrivateRoute>
                            <Board/>
                        </PrivateRoute>
                    }/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
