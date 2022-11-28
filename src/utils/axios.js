import axios from "axios";

const url =
  "https://rich-puce-goat-tutu.cyclic.app" ||
  // "http://localhost:3001" ||
  // "https://jackh-twitter-server.herokuapp.com/" ||
  "http://localhost:3030";
export default axios.create({
  baseURL: url,
});
