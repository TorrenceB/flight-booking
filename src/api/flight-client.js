import axios from "axios";

// Base URL for flight requests
const flightClient = ({ query, params }) => {
  const API_KEY = process.env.REACT_APP_FLIGHT_KEY;
  const baseUrl =
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices";
  const endPoints = {
    listPlaces: "/autosuggest/v1.0/US/USD/en-US/",
    browseQuotes: "/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2019-09-01",
  };
  const options = {
    method: "GET",
    url: `${baseUrl}${endPoints.listPlaces}`,
    params: {
      query: query,
    },
    headers: {
      "x-rapidapi-key": `${API_KEY}`,
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  };
  const instance = axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      Error(error);
    });
  console.log("Instance:", instance);
};

export default flightClient;
