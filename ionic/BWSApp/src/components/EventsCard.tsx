import React from 'react'
import { IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import moment from 'moment'
interface ComponentProps {
  id: string,
  title: string,
  imgSrc: string,
  description: string,
  start_datetime: string
}

const EventsCard: React.FC<ComponentProps> = ({id, title, imgSrc, description, start_datetime}) => {
  return(
    <IonItem>
      <IonCard routerLink={`/tabs/event/` + id}>
        <img src={imgSrc} alt=""/>
        <IonCardHeader>
          <IonCardSubtitle>{moment(start_datetime).format("MMMM Do YYYY")}</IonCardSubtitle>
          <IonCardTitle>{title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {description}
        </IonCardContent>
      </IonCard>
    </IonItem>
  )
}
export default EventsCard