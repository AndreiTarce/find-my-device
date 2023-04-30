import axios from "axios";
import { apiUrl } from "./config";

export const deleteTrips = (userId) => {
    axios.post(`${apiUrl}/delete_trips`, { userId });
};
