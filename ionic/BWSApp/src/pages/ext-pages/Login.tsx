import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonAlert, IonIcon } from '@ionic/react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { login } from "../../services/api";
import Cookie from "js-cookie";
import { lockClosedOutline, personOutline } from 'ionicons/icons';

const LOGO_NAMES = ['sincerity', 'gratitude', 'kindness', 'service']

const Login: React.FC = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const user = Cookie.get('user');
    if (user) {
      setLoginSuccess(true);
    }
  }, [loginSuccess]);

    const loginUser = async (data) => {
      setLoading(true);
      login(data.identifier, data.password)
        .then((res: any) => {
            // set authed User in global context to update header/app state
            setLoading(false);
            setLoginSuccess(true);
            Cookie.set("user", res.data.user);
        })
        .catch((error) => {
            console.log(error)
            setError(true);
            setLoading(false);
      });
    }


  return (
    <IonPage>
      <IonContent fullscreen>
      <IonTitle className="align-center" style={{ marginTop: "6rem", marginBottom: "1rem" }}>Blossom World Society</IonTitle>
        <img src={`assets/logo/${LOGO_NAMES[Math.floor((Math.random()*LOGO_NAMES.length))]}.png`} style={{ width: "auto", margin: "auto", display: "block", }} />
        
        <IonTitle className="align-center" style={{ marginTop: "1rem" }}>LOGIN</IonTitle>
        <form onSubmit={handleSubmit(loginUser)}>
            <div className="input-wrapper">
              <IonIcon icon={personOutline} />
              <IonInput name="identifier" placeholder="Username" ref={register}></IonInput>
            </div>
            <div className="input-wrapper">
              <IonIcon icon={lockClosedOutline} />
              <IonInput name="password" type="password" placeholder="Password" ref={register}></IonInput>
            </div>
          <IonButton expand="full" type="submit" className="ion-margin-top" style={{ marginTop: "3rem" }}>
            Login
          </IonButton>
        </form>
        <p className="align-center">Don't have an account? <a href="/register">Sign Up</a></p>
        {alert && (
          <IonAlert
              isOpen={error ? true : false}
              onDidDismiss={() => {
                  setError(false)
              }}
              header={"Error"}
              message={
                  "Either your username or password is wrong. Please try again."
              }
              buttons={["OK"]}
          />
        )}
        {loginSuccess && (
          <Redirect to="/tabs" />
        )}

      </IonContent>
    </IonPage>
  );
};

export default Login;