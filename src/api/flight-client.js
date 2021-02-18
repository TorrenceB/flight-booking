import axios from "axios";

export const callFlightClient = ({ endpoint, params }) => {
  /* 
  TODO:
  1. Implement the api call and return the response.
  2. The return will be a promise!
  */
  const API_KEY = process.env.REACT_APP_FLIGHT_KEY;
  const baseUrl =
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices";

  const options = {
    method: "GET",
    url: `${baseUrl}${endpoint}`,
    params: params,
    headers: {
      "x-rapidapi-key": `${API_KEY}`,
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    },
  };

  const apiInstance = axios
    .request(options)
    .then((response) => {
      // Todo: Parse response to JS object
      const data = response.data;
      return data;
      // return {
      //   places: [],
      // };
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Application error...");
      }
    });
  return apiInstance;
};
