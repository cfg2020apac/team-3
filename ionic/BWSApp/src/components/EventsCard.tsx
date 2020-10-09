import React from 'react'
import { IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
interface ComponentProps {
  title: string,
  imgSrc: string,
  description: string
}

const EventsCard: React.FC<ComponentProps> = ({title, imgSrc, description}) => {
  return(
    <IonItem>
      <IonCard routerLink={`/event`}>
        <img src={imgSrc} alt=""/>
        <IonCardHeader>
          <IonCardSubtitle>August 1</IonCardSubtitle>
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