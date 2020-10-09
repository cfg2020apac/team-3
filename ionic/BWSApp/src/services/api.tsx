import axios from 'axios'

export const API_URL = 'http://172.19.46.9:1337'

export function getEvents() {
  return axios.get(API_URL + '/events').then(res => res.data)
}

export function getEvent(id: string) {
  return axios.get(API_URL + '/events/' + id).then(res => res.data)
}