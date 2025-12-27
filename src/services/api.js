import axios from "axios";

export default axios.create({
  baseURL: "https://server-voting-app.vercel.app/api"
});
