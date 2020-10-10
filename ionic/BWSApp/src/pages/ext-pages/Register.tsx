import React, { useState } from 'react';
import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Register.css';
import { useForm } from 'react-hook-form';
import {registerNewUser} from '../../services/api'
import moment from 'moment'

const Register: React.FC = () => {
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
    console.log('creating a new user account with: ', data);
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h2 className="title">Begin your journey today!</h2>
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="input-wrapper">
            <IonInput placeholder="Full Name" name="name" ref={register}/>
          </div>

          <div className="input-wrapper">
            <IonLabel className="textMargin">Date of Birth</IonLabel>
            <IonDatetime displayFormat="DD MMM YYYY" min="1994-03-14" name="dob" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)} ref={register}></IonDatetime>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Mobile" name="contact_number" ref={register}/>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Address" name="address" ref={register}/>
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
              ref={register({})}
            />Share-a-Skill</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="BYC Volunteer"
              ref={register({})}
            />BYC Volunteer</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Administration Support"
              ref={register({})}
            />Administration Support</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Organise Events/Activities"
              ref={register({})}
            />Organise Events/Activities</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Community Services"
              ref={register({})}
            />Community Services</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Fundraisers"
              ref={register({})}
            />Fundraisers</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Befrienders"
              ref={register({})}
            />Befrienders</label>
          </div>

          <IonButton expand="full" type="submit">Register</IonButton>
          <p className="align-center">Already have an account? <a href="/login">Login here</a></p>

        </form>
      </IonContent>
    </IonPage>
  );
};
export default Register;