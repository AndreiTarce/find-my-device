import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin/SignIn";
import Homepage from "./pages/homepage/Homepage";
import Account from "./pages/account/Account";
import { AuthContextProvider } from "./context/AuthContextProvider";
import Protected from "./components/Protected";

function App() {
    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signin" element={<SignIn />} />
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
