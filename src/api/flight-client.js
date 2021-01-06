import axios from "axios";

// Base URL for flight requests
const flightClient = ({ query, countryName, localCurrency, locale }) => {
  const API_KEY = process.env.REACT_APP_FLIGHT_KEY;
  const options = {
    method: "GET",
    url:
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${UK}/${GBP}/${en-GB}/`,
    params: {
      query: 'London',
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
