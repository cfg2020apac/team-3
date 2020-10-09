import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonAlert } from '@ionic/react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { login } from "../../services/api";
import Cookie from "js-cookie";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blossom World Society</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blossom World Society</IonTitle>
          </IonToolbar>
        </IonHeader>
        <img src={`assets/logo/${LOGO_NAMES[Math.floor((Math.random()*LOGO_NAMES.length))]}.png`} style={{ width: "auto", margin: "auto", display: "block" }} />
        <form onSubmit={handleSubmit(loginUser)}>
            <IonItem>
                <IonLabel>Username:</IonLabel>
                <IonInput name="identifier" placeholder="Username" ref={register}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Password:</IonLabel>
                <IonInput name="password" type="password" placeholder="Password" ref={register}></IonInput>
            </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Login
          </IonButton>
        </form>
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