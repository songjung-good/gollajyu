const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/api"
    : "https://i10e107.p.ssafy.io/api";

export default API_URL;
