import axios from "axios";

// Todo: Implement use of propTypes
const flightClient = ({ query, params, setSuggestions }) => {
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
      // Todo: Parse response to JS object
      const data = response.data;
      const placesObj = data["Places"].map((d) => ({
        destination: d.PlaceName,
        placeId: d.PlaceId,
      }));
      // console.log("Places Obj:", placesObj);
      setSuggestions(placesObj);
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
  return instance;
};

export default flightClient;
