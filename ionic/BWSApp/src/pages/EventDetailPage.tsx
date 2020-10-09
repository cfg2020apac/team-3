import React from "react";
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
  IonButton
} from "@ionic/react";

const EventDetailPage: React.FC = () => {
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
        <IonCard>
          <img
            src="https://images.squarespace-cdn.com/content/v1/59954067bebafbb309508e10/1527821715108-AU99XMTESGI6JYQMP8E0/ke17ZwdGBToddI8pDm48kHurx3fBdIeZgkINxEYikuJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hReLB75oIvKxcDxwlnLXaYxx2rsRFRO1wRK_rkZV1RAl5oC2R-qVYkbBJkzr4SD3g/shutterstock_630456443.jpg?format=750w"
            alt=""
          />
          <IonCardHeader>
            <IonCardSubtitle>August 1</IonCardSubtitle>
            <IonCardTitle>
              Discovering Treasure Through Stories 读故事掘宝 @ Tohyi
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          <p>
          Year 2020 is an eventful year. The Covid-19 pandemic let us see the positive (selflessness) and negative (self-centeredness) traits of human nature. Seeing the importance of cultivating the positive traits of our next generation, we should start them from young by sowing good seeds in their minds and hearts, and continue to irrigate and fertilise them to let them thrive. As the saying goes: it takes 10 years to cultivate a tree, 100 years to nurture a human being.

Therefore, Joyous Learning Grove develops a series of moral education courses for children from 4 to 12 years old. These children will attend classes every week to learn about moral values such as filial piety, friendship, and helping others and implement them in their daily lives.

The commencement of the course for the new semester is about to begin, we encourage all the parents to register your child for the course promptly!
          </p>
<IonButton>Register</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EventDetailPage;
