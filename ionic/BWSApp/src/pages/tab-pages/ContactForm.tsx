import { IonContent, IonPage, IonText, IonItem, IonLabel, IonInput, IonButton, IonAlert, IonList } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import QueriesCard from "../../components/QueriesCard";
import { getContactQueries , API_URL } from "../../services/api";
import Cookie from "js-cookie";

const ContactForm: React.FC = () => {
    const [alert, setAlert] = useState<boolean>(false);
    const [queries, setQueries] = useState([]);
    const { control, register, handleSubmit } = useForm();

    const submitQuery = async (data) => {
        const user = JSON.parse(Cookie.get('user'));
        const req = await axios.post(`${API_URL}/contact-queries`, { ...data, volunteer_profile: user.volunteer_profile.id }).then((res) => res);
        setAlert(true);
    }

    useEffect(() => {
        getContactQueries().then((data) => {
            const user = JSON.parse(Cookie.get('user'));
            const filteredData = data.filter(item => !item.resolved && item.volunteer_profile.id === user.volunteer_profile.id).reverse();
            setQueries(filteredData)
        });
    }, [queries]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText color="muted">
          <h2>Contact Us</h2>
        </IonText>
        <form onSubmit={handleSubmit(submitQuery)}>
            <IonItem>
                <IonLabel>Query:</IonLabel>
                <IonInput name="query" placeholder="Enter Input" ref={register}></IonInput>
            </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Submit
          </IonButton>
          {alert && (
            <IonAlert
                isOpen={alert}
                onDidDismiss={() => {
                    setAlert(false)
                }}
                header={"Thank you!"}
                message={
                    "You have successfully sent a message to the adminstrators! They'll be in touch with you shortly."
                }
                buttons={["OK"]}
            />
          )}
        </form>
        <IonList>
        {queries.map((item, index) => (
          <QueriesCard
            key={index}
            datetime={item.published_at}
            id={item.id}
            query={item.query}
            resolved={item.resolved}
          />
        ))}
      </IonList>
      </IonContent>
    </IonPage>
  );
};
export default ContactForm;