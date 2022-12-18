import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/appOutput.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Homepage from "./components/homepage";
import CreatePoll from "./components/createPoll";
import LeaderboardPage from "./components/leaderboardPage";
import NoPage from "./components/noPage";

import { Provider } from "react-redux";
import store from "./features/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
               
                        <Route
                            exact
                            activeClassName="active"
                            path="/"
                            element={<App />}
                        />
                        <Route
                            activeClassName="active"
                            path="polls"
                            element={<Homepage onLogin />}
                        />
                        <Route
                            activeClassName="active"
                            path="/add"
                            element={<CreatePoll />}
                        />
                        <Route
                            activeClassName="active"
                            path="/leaderboard"
                            element={<LeaderboardPage />}
                        />
                        <Route path="*" element={<NoPage />} />
                    
                </Routes>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
