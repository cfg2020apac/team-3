import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { getMyEvents } from "../../services/api";

const AnnouncementsPage: React.FC = () => {
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    getMyEvents().then((data) => setMyEvents(data));
  }, [myEvents]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Announcements</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {myEvents
            ? myEvents.map((event, index) => (
                <IonItem key={index} routerLink={`/tabs/announcement/${event.id}`}>
                  <IonLabel>{event.title}</IonLabel>
                </IonItem>
              ))
            : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AnnouncementsPage;
