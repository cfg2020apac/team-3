import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './Tab1';
import EventsPage from './EventsPage';
import EventDetailPage from './EventDetailPage'
import AnnouncementsPage from './AnnouncementsPage'
import AnnouncementDetailPage from './AnnouncementDetailPage'

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/tab1" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/tab1" component={Tab1}  exact={true} />
        <Route path="/tabs/events" render={() => <EventsPage />} exact={true} />
        <Route path="/tabs/event/:id" component={EventDetailPage} />
        <Route path="/tabs/announcements" component={AnnouncementsPage} />
        <Route path="/tabs/announcement/:id" component={AnnouncementDetailPage} />
        
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/tab1">
          <IonIcon icon={triangle} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/events">
          <IonIcon icon={ellipse} />
          <IonLabel>Events</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/announcements">
          <IonIcon icon={square} />
          <IonLabel>Inbox</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;