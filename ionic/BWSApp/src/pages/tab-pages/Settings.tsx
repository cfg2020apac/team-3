import React, { useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useForm } from 'react-hook-form';
import {registerNewUser} from '../../services/api';
import moment from 'moment';
import { getUserDetails } from "../../services/api";

const Settings: React.FC = () => {
  const [user, setUser] = useState({});
  const [interests, setInterest] = useState({});

  useEffect(() => {
    getUserDetails().then((user) => {
      setUser(user);
      setInterest(user.interests.map((interest) => {
        return interest.name
      }));
    });
  }, []);

  const { register, control, handleSubmit } = useForm();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toString());
  const name = "interest"

  const registerUser = (data) => {
    const {email, password, username, confirmPassword, name, contact_number, dob, address, interest} = data
    const payload = {
      'username': username,
      'email': email,
      'password': password,
      'volunteer_profile': {
        'address': address,
        'contact_number': contact_number,
        'name': name,
        'birthdate': moment(dob).format('YYYY-MM-DD'),
        'interests': interest
      }
    }
    registerNewUser(payload)
  }

  function isChecked(list, val) {
    for (let i=0; i<list.length; i++) {
      if (list[i] == val) {
        return true;
      }
    }
    return false;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/mainDashboard" />
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="input-wrapper">
            <IonInput placeholder="Full Name" name="name" value={user['name']} ref={register}/>
          </div>

          <div className="input-wrapper">
            <IonLabel className="textMargin">Date of Birth</IonLabel>
            <IonDatetime displayFormat="DD MMM YYYY" min="1994-03-14" name="dob" value={user['birthdate']} onIonChange={e => setSelectedDate(e.detail.value!)} ref={register}></IonDatetime>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Mobile" name="contact_number" value={user['contact_number']} ref={register}/>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Address" name="address" value={user['address']} ref={register}/>
          </div>

          <hr/>

          <div className="input-wrapper">
            <IonInput placeholder="Username" name="username" ref={register}/>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Email" type="email" name="email" ref={register}/>
          </div>
          <div className="input-wrapper">
            <IonInput placeholder="Password" type="password" name="password" ref={register}/>
          </div>
          <div className="input-wrapper">
            <IonInput placeholder="Confirm password" type="password" name="confirmPassword" ref={register}/>
          </div>

          <p className="text">Which programme(s) are you interested in?</p>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Share-a-Skill"
              checked={isChecked(interests, "Share-a-Skill")}
              ref={register({})}
            />Share-a-Skill</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="BYC Volunteer"
              checked={isChecked(interests, "BYC Volunteer")}
              ref={register({})}
            />BYC Volunteer</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Administration Support"
              checked={isChecked(interests, "Administration Support")}
              ref={register({})}
            />Administration Support</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Organise Events/Activities"
              checked={isChecked(interests, "Organise Events/Activities")}
              ref={register({})}
            />Organise Events/Activities</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Community Services"
              checked={isChecked(interests, "Community Services")}
              ref={register({})}
            />Community Services</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Fundraisers"
              checked={isChecked(interests, "Fundraisers")}
              ref={register({})}
            />Fundraisers</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Befrienders"
              checked={isChecked(interests, "Befrienders")}
              ref={register({})}
            />Befrienders</label>
          </div>

          <IonButton expand="full" type="submit">Save</IonButton>

        </form>
      </IonContent>
    </IonPage>
  );
};

export default Settings;