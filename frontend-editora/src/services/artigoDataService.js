import axios from 'axios';

const API_URL = 'http://localhost:8000/editora';

class ArtigoDataService {
  // Endpoints do Módulo de Artigos (/editora)
  getAll() {
    return axios.get(`${API_URL}/`);
  }

  get(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  create(data) {
    return axios.post(`${API_URL}/`, data);
  }

  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  }

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  deleteAll() {
    return axios.delete(`${API_URL}/`);
  }

  findByTitle(titulo) {
    return axios.get(`${API_URL}/?titulo=${titulo}`);
  }

  getPublicados() {
    return axios.get(`${API_URL}/publicado`);
  }

  // Endpoints do Módulo de Autores (/api/autores)
  getAutores() {
    return axios.get(`${API_URL}/api/autores`);
  }

  getAutorById(id) {
    return axios.get(`${API_URL}/api/autores/${id}`);
  }

  getArtigosByAutor(id) {
    return axios.get(`${API_URL}/api/autores/${id}/artigos`);
  }
}

export default new ArtigoDataService();