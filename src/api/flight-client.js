import axios from "axios";

// Todo: Implement use of propTypes
const flightClient = ({ params, endpoint }) => {
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

  return options;

//   const instance = axios
//   .request(options)
//   .then((response) => {
//     // Todo: Parse response to JS object
//     const data = response.data;
//     const placesObj = data["Places"].map((d) => ({
//       destination: d.PlaceName,
//       placeId: d.PlaceId,
//     }));
//     setSuggestions(placesObj);
//   })
//   .catch((error) => {
//     if (error.response) {
//       console.log(error.response);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       console.log("Application error...");
//     }
//   });
// return instance;
};

export default flightClient;
