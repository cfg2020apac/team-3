import axios from "axios";

export const API_URL = "http://172.19.46.9:1337";

const mockUserId = '10'

var userDetails = null

export function getUserDetails() {
  if(userDetails === null) {
    return getUser(mockUserId).then(data => {
      userDetails = data
      return userDetails
    })
  } else {
    return userDetails
  }
}

export function getEvents() {
  return axios.get(API_URL + "/events").then((res) => res.data);
}

export function getEvent(id: string) {
  return axios.get(API_URL + "/events/" + id).then((res) => res.data);
}

export function getUser(id: string) {
  return axios.get(API_URL + '/volunteer-profiles/' + id).then((res) => res.data)
}

export function registerForEvent(eventId, event) {
  return getUser(mockUserId).then(user => {
    event.volunteer_profiles.push(user)
    console.log(event.volunteer_profiles)
    return axios.put(API_URL + "/events/" + eventId, event);
  })
}

export function getMyEvents() {
  return axios
    .get(API_URL + "/volunteer-profiles/" + mockUserId)
    .then((res) => res.data.events);
}

export function getEventUpdates(id) {
  return axios.get(API_URL + "/events/" + id).then((res) => {
    return { event_updates: res.data.event_updates, title: res.data.title };
  });
}
