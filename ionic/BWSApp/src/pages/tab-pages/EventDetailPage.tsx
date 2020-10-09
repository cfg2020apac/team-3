import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import { getEvent, API_URL } from "../../services/api";
import { RouteComponentProps } from "react-router";
import moment from 'moment'

interface ContainerProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EventDetailPage: React.FC<ContainerProps> = ({ match }) => {
  const [event, setEvent] = useState(null);
  const { id } = match.params;
  useEffect(() => {
    getEvent(id)
      .then((data) => setEvent(data))
      .then(() => console.log(event));
  }, [event, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Event Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {event !== null ? (
          <IonCard>
            <img src={API_URL + event.event_photo.url} alt="" />
            <IonCardHeader>
              <IonCardSubtitle>{moment(event.start_datetime).format("MMMM Do YYYY")}</IonCardSubtitle>
              <IonCardTitle>{event.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                {event.description}
              </p>
              <IonButton>Register</IonButton>
            </IonCardContent>
          </IonCard>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default EventDetailPage;
