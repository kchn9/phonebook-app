import axios from "axios";
const baseUrl = "api/persons";

function getAllContacts() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function createContact(contact) {
  const request = axios.post(baseUrl, contact);
  return request.then((response) => response.data);
}

function updateContact(id, contact) {
  const request = axios.put(`${baseUrl}/${id}`, contact);
  return request.then((response) => response.data);
}

function deleteContact(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
}

export { createContact, deleteContact, updateContact, getAllContacts };
