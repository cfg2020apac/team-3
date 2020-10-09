import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import EventsCard from "../components/EventsCard";
import { getEvents } from "../services/api";
import {API_URL} from '../services/api'

const EventsPage: React.FC = () => {
  const [page, setPage] = useState("rec");
  const [events, setEvents] = useState<{
    capacity: number,
    created_at: string,
    description: string, 
    end_datetime: string,
    event_photo: {url:string},
    gratitude_points: number,
    id: number,
    kindness_points: number,
    max_age: number,
    min_age: number,
    name: string,
    service_points: number,
    sincerity_points: number,
    start_datetime: string,
    tags: string,
    title: string
  }[]>([]);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
  }, [events]);

  const recommended = (
    <div>
      <IonListHeader>
        <IonLabel>Recommended for you</IonLabel>
      </IonListHeader>
      <IonList>
        {events.map((item, index) =>
          <EventsCard key={index} 
            title={item.title}
            imgSrc={API_URL + item.event_photo.url}
            description={item.description.substring(0,200) + '...'}/>
        )}
      </IonList>
    </div>
  );

  const all = (
    <div>
      <IonListHeader>
        <IonLabel>All Events</IonLabel>
      </IonListHeader>
      <IonList>
      </IonList>
    </div>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upcoming Events</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment
            value={page}
            onIonChange={(e) => console.log(e.detail.value)}
          >
            <IonSegmentButton value="rec">
              <IonLabel>Recommended</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="all">
              <IonLabel>All Events</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{page === "rec" ? recommended : all}</IonContent>
    </IonPage>
  );
};

export default EventsPage;
