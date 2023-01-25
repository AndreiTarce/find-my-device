import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Homepage from "./pages/homepage/Homepage";
import Account from "./pages/account/Account";
import { AuthContextProvider } from "./context/AuthContextProvider";
import Protected from "./components/Protected";
import Dashboard from "./pages/dashboard/Dashboard";
import LoggedInRouter from "./components/LoggedInRouter";
import History from "./pages/history/History";

function App() {
    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    <Route path="" element={<LoggedInRouter />} />
                    <Route path="/" element={<LoggedInRouter />} />
                    <Route path="/home" element={<Homepage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Protected>
                                <Dashboard />
                            </Protected>
                        }
                    />
                    <Route
                        path="/account"
                        element={
                            <Protected>
                                <Account />
                            </Protected>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <Protected>
                                <History />
                            </Protected>
                        }
                    />
                    <Route path="*" element={<LoggedInRouter />} />
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
