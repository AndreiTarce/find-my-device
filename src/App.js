import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Homepage from "./pages/homepage/Homepage";
import Account from "./pages/account/Account";
import { AuthContextProvider } from "./context/AuthContextProvider";
import Protected from "./components/Protected";
import Dashboard from "./pages/dashboard/Dashboard";
import IsLoggedIn from "./components/IsLoggedIn";

function App() {
    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <IsLoggedIn>
                                <Homepage />
                            </IsLoggedIn>
                        }
                    />
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
                </Routes>
            </AuthContextProvider>
        </div>
    );
}

export default App;
