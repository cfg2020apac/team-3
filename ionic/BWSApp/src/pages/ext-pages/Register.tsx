import React, { useState } from 'react';
import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Register.css';
import { useForm } from 'react-hook-form';

const Register: React.FC = () => {
  // const programmes_list = [
  //   { val: 'Share-a-Skill', isChecked: true },
  //   { val: 'BYC Volunteer', isChecked: false },
  //   { val: 'Admin Support', isChecked: false },
  //   { val: 'Organise Events/ Activities', isChecked: false },
  //   { val: 'Community Services', isChecked: false },
  //   { val: 'Fundraisers', isChecked: false },
  //   { val: 'Befrienders', isChecked: false },
  // ];
  // const programmes_list = ['Share-a-Skill', 'BYC Volunteer', 'Admin Support', 'Organise Events/ Activities', 'Community Services', 'Fundraisers', 'Befrienders']
  const { register, control, handleSubmit } = useForm();

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toString());
  const name = "interest"

  const registerUser = (data) => {
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
            <IonDatetime displayFormat="MM/DD/YYYY" min="1994-03-14" name="dob" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)} ref={register}></IonDatetime>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Mobile" name="contact_number" ref={register}/>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Email" type="email" name="email" ref={register}/>
          </div>

          <div className="input-wrapper">
            <IonInput placeholder="Address" name="address" ref={register}/>
          </div>

          <p className="text">Which programme(s) would you like to join?</p>

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
              value="Admin Support"
              ref={register({})}
            />Admin Support</label>
          </div>

          <div className="checkbox-wrapper">
            <label>
            <input
              type="checkbox"
              name={name}
              value="Organise Events/ Activities"
              ref={register({})}
            />Organise Events/ Activities</label>
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

        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;