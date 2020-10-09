import axios from "axios";
import Cookie from "js-cookie";

export const API_URL = "http://172.19.46.9:1337";

export function getUserDetails() {
  const user = JSON.parse(Cookie.get('user'));
  return getUser(user.id);
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
  const user = JSON.parse(Cookie.get('user'));
  return getUser(user.id).then(user => {
    event.volunteer_profiles.push(user)
    console.log(event.volunteer_profiles)
    return axios.put(API_URL + "/events/" + eventId, event);
  })
}

export function getMyEvents() {
  const user = JSON.parse(Cookie.get('user'));
  return axios
    .get(API_URL + "/volunteer-profiles/" + user.id.toString())
    .then((res) => res.data.events);
}

export function getEventUpdates(id) {
  return axios.get(API_URL + "/events/" + id).then((res) => {
    return { event_updates: res.data.event_updates, title: res.data.title };
  });
}

export function getContactQueries() {
  return axios.get(API_URL + '/contact-queries').then(res => res.data)
}

async function getInterests() {
  return axios.get(API_URL + '/interests').then(res => res.data)
}

export async function registerNewUser(user) {
  return registerNewProfile(user.volunteer_profile)
}

export async function registerNewProfile(profile) {
  const interestsArr = await getInterests()
  const parsedInterests = interestsArr.filter(interest => profile.interests.includes(interest.name))
  profile.interests = parsedInterests
  return axios.post(API_URL + '/volunteer-profiles/', profile).then(res => res.data)
}

export const login = (identifier: string, password: string) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
      return;
  }

  return new Promise((resolve, reject) => {
      axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
          //set token response from Strapi for server validation
          Cookie.set("token", res.data.jwt);

          //resolve the promise to set loading to false in SignUp form
          resolve(res);
          //redirect back to home page for restaurance selection
      })
      .catch((error) => {
          //reject the promise and pass the error object back to the form
          reject(error);
      });
  });
};

export const logout = () => {
    //remove token and user cookie
    Cookie.remove("token");
    Cookie.remove("user");
};
