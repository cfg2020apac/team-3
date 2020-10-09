import React from "react";
import {
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonBadge,
} from "@ionic/react";
import moment from "moment";
interface ComponentProps {
  id: string;
  title: string;
  imgSrc: string;
  description: string;
  start_datetime: string;
  tags: { name: string }[];
}

const EventsCard: React.FC<ComponentProps> = ({
  id,
  title,
  imgSrc,
  description,
  start_datetime,
  tags,
}) => {
  return (
    <IonItem lines="none">
      <IonCard routerLink={`/tabs/event/` + id}>
        <img src={imgSrc} alt="" style={{ width: "auto", margin: "auto", display: "block" }} />
        <IonCardHeader>
          <IonCardSubtitle>
            {moment(start_datetime).format("MMMM Do YYYY")}
          </IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {tags.map((tag, index) => (
            <IonBadge key={index} style={{marginRight: '8px'}}>{tag.name}</IonBadge>
          ))}
          <p>{description}</p>
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};
export default EventsCard;
