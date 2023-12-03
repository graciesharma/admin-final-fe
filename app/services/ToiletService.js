import axios from "axios";

const API_URL = "http://localhost:3004";
const TOILET_API_URL = "http://localhost:3004/toilets";

class ToiletService {
  login(payload) {
    return axios.post(`${API_URL}/login`, payload, { withCredentials: true });
  }

  getAll() {
    return axios.get(TOILET_API_URL);
  }

  get(id) {
    return axios.get(`${TOILET_API_URL}/${id}`);
  }

  create(data) {
    return axios.post(TOILET_API_URL, data);
  }

  update(id, data) {
    return axios.put(`${TOILET_API_URL}/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${TOILET_API_URL}/${id}`);
  }

  addReview(id, review) {
    return axios.post(`${TOILET_API_URL}/${id}/reviews`, review);
  }

  getReview(id) {
    return axios.get(`${TOILET_API_URL}/${id}/reviews`);
  }

  deleteReview(toiletId, reviewId) {
    return axios.delete(`${TOILET_API_URL}/${toiletId}/reviews/${reviewId}`);
  }
}

export default ToiletService;
