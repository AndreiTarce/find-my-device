import axios from "axios";

const url = "https://europe-west1-proiect-licenta-632d6.cloudfunctions.net/senzor";

export const deleteTrips = (userId) => {
    axios.post(`${url}/delete_trips`, { userId });
};
