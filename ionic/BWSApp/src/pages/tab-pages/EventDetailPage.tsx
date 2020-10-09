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
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonBadge
} from "@ionic/react";
import { getEvent, API_URL, registerForEvent } from "../../services/api";
import { RouteComponentProps } from "react-router";
import moment from "moment";

interface ContainerProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const EventDetailPage: React.FC<ContainerProps> = ({ match }) => {
  const [event, setEvent] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [disableRegister, setDisableRegister] = useState(false)
  const { id } = match.params;
  useEffect(() => {
    getEvent(id)
      .then((data) => setEvent(data))
  }, [event, id]);

  const registerEvent = () => {
    registerForEvent(id, event).then(() => setOpenAlert(true))
  }

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
              <IonCardSubtitle>
                {moment(event.start_datetime).format("MMMM Do YYYY")}
              </IonCardSubtitle>
              <IonCardTitle>{event.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {event.tags.map((tag, index) => (
                <IonBadge key={index} style={{marginRight: '8px'}}>{tag.name}</IonBadge>
              ))}
              <p>{event.description}</p>
              <IonGrid>
                <IonRow>
                  <IonCol>Event Schedule:</IonCol>
                  <IonCol>
                    {moment(event.start_datetime).format(
                      "MMMM Do YYYY, h:mm a"
                    )}{" "}
                    -{" "}
                    {moment(event.end_datetime).format("MMMM Do YYYY, h:mm a")}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>Ages:</IonCol>
                  <IonCol>
                    {event.min_age} - {event.max_age}
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Capacity:</IonCol>
                  <IonCol>{event.capacity} ({event.capacity - event.volunteer_profiles.length} slots remaining)</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>Points:</IonCol>
                  <IonCol>
                    Sincerity: {event.sincerity_points}
                    <br />
                    Gratitude: {event.gratitude_points}
                    <br />
                    Service: {event.service_points}
                    <br />
                    Kindness: {event.kindness_points}
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonButton onClick={registerEvent} disabled={disableRegister}>Register</IonButton>
              <IonAlert
                isOpen={openAlert}
                onDidDismiss={() => {
                  setOpenAlert(false)
                  setDisableRegister(true)
                  }}
                header={"Thank you!"}
                message={
                  "You have successfully signed up for this event! The organisers will get in touch with you soon!"
                }
                buttons={["OK"]}
              />
            </IonCardContent>
          </IonCard>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default EventDetailPage;
