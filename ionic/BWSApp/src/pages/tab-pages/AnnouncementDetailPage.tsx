import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { getEventUpdates } from "../../services/api";
import moment from "moment";
import showdown from "showdown";

interface ContainerProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const AnnouncementDetailPage: React.FC<ContainerProps> = ({ match }) => {
  const [event, setEvent] = useState(null);
  const { id } = match.params;
  const converter = new showdown.Converter();

  useEffect(() => {
    getEventUpdates(id).then((data) => setEvent(data));
  }, [event, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{event ? event.title : null}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {event
            ? event.event_updates.map((message, index) => {
                let html = converter.makeHtml(message.update_text);
                html = html.replace("/uploads", "http://172.19.46.9:1337/uploads")
                return (
                  <IonItem key={index} lines="none">
                    <IonCard style={{ width: "100%" }}>
                      <IonCardHeader>
                        <IonCardSubtitle>
                          {moment(message.published_at).format(
                            "MMMM Do YYYY, h:mm a"
                          )}
                        </IonCardSubtitle>
                        <IonCardTitle>{message.subject}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <div dangerouslySetInnerHTML={{__html:html}}/>
                      </IonCardContent>
                    </IonCard>
                  </IonItem>
                );
              })
            : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AnnouncementDetailPage;
