import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemDivider,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import EventsCard from "../../components/EventsCard";
import { getUserDetails, getEvents, API_URL } from "../../services/api";
import moment from 'moment'

const EventsPage: React.FC = () => {
  const [page, setPage] = useState("rec");
  const [events, setEvents] = useState([]);
  const [myPastEvents, setMyPastEvents] = useState([]);
  const [myUpcomingEvents, setMyUpcomingEvents] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      getEvents().then((data) => {
        setLoaded(true);
        setEvents(data);
        getUserDetails().then((user) => {
          console.log(user.events);
          const filtered = data.filter(
            (event) =>
              event.tags.filter((tag) =>
                user.interests
                  .map((interests) => interests.name)
                  .includes(tag.name)
              ).length > 0
          );
          const myevents = data.filter((event) =>
            event.volunteer_profiles
              .map((profile) => profile.id)
              .includes(user.id)
          );
          setMyUpcomingEvents(
            myevents.filter((event) =>
              moment(event.start_datetime).isAfter(moment())
            )
          );
          setMyPastEvents(
            myevents.filter((event) =>
              moment(event.start_datetime).isBefore(moment())
            )
          );
          setRecommendedEvents(filtered);
        });
      });
    }
  }, [events, recommendedEvents, loaded]);

  const recommended = (
    <div>
      <IonItemDivider>
        <IonLabel>Recommended for you</IonLabel>
      </IonItemDivider>
      <IonList>
        {recommendedEvents.map((item, index) => (
          <EventsCard
            key={index}
            start_datetime={item.start_datetime}
            id={item.id}
            title={item.title}
            imgSrc={API_URL + item.event_photo.url}
            description={item.description.substring(0, 200) + "..."}
            tags={item.tags}
          />
        ))}
      </IonList>
    </div>
  );

  const all = (
    <div>
      <IonItemDivider>
        <IonLabel>All events</IonLabel>
      </IonItemDivider>
      <IonList>
        {events.map((item, index) => (
          <EventsCard
            key={index}
            start_datetime={item.start_datetime}
            id={item.id}
            title={item.title}
            imgSrc={API_URL + item.event_photo.url}
            description={item.description.substring(0, 200) + "..."}
            tags={item.tags}
          />
        ))}
      </IonList>
    </div>
  );

  const myevents = (
    <div>
      <IonItemDivider>
        <IonLabel>Upcoming events</IonLabel>
      </IonItemDivider>
      <IonList>
        {myUpcomingEvents.map((item, index) => (
          <EventsCard
            key={index}
            start_datetime={item.start_datetime}
            id={item.id}
            title={item.title}
            imgSrc={API_URL + item.event_photo.url}
            description={item.description.substring(0, 200) + "..."}
            tags={item.tags}
          />
        ))}
      </IonList>
      <IonItemDivider>
        <IonLabel>Past events</IonLabel>
      </IonItemDivider>
      <IonList>
        {myPastEvents.map((item, index) => (
          <EventsCard
            key={index}
            start_datetime={item.start_datetime}
            id={item.id}
            title={item.title}
            imgSrc={API_URL + item.event_photo.url}
            description={item.description.substring(0, 200) + "..."}
            tags={item.tags}
          />
        ))}
      </IonList>
    </div>
  );

  const renderSegment = () => {
    let segment;
    switch (page) {
      case "my":
        segment = myevents;
        break;
      case "rec":
        segment = recommended;
        break;
      case "all":
        segment = all;
        break;
    }
    return segment;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upcoming Events</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={page} onIonChange={(e) => setPage(e.detail.value)}>
            <IonSegmentButton value="rec">
              <IonLabel>Recommended</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="all">
              <IonLabel>All Events</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="my">
              <IonLabel>My Events</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{renderSegment()}</IonContent>
    </IonPage>
  );
};

export default EventsPage;
