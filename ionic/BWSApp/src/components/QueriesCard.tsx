import React from 'react'
import { IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import moment from 'moment'
interface ComponentProps {
  id: string,
  query: string,
  datetime: string,
  resolved: boolean
}

const QueriesCard: React.FC<ComponentProps> = ({id, query, datetime, resolved}) => {
  return(
    <IonItem>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>{moment(datetime).format("MMMM Do YYYY")}</IonCardSubtitle>
          <IonCardTitle>{datetime}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {query}
          {(resolved) ? (
               <p style={{ color: "green" }}>Resolved</p>
          ) : (
                <p style={{ color: "red" }}>Unresolved</p>
          )}
           
        </IonCardContent>
      </IonCard>
    </IonItem>
  )
}
export default QueriesCard