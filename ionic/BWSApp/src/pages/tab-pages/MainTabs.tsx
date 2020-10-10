import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { calendarOutline, megaphone, call, home } from 'ionicons/icons';
import Tab1 from './Tab1';
import EventsPage from './EventsPage';
import AnnouncementsPage from './AnnouncementsPage'
import AnnouncementDetailPage from './AnnouncementDetailPage'
import EventDetailPage from './EventDetailPage';
import ContactForm from './ContactForm';
import MainDashboard from '../MainDashboard';
import Settings from './Settings';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/mainDashboard" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/tabs/events" render={() => <EventsPage />} exact={true} />
        <Route path="/tabs/event/:id" component={EventDetailPage} />
        <Route path="/tabs/announcements" component={AnnouncementsPage} />
        <Route path="/tabs/announcement/:id" component={AnnouncementDetailPage} />
        
        <Route path="/tabs/contact" component={ContactForm}  exact={true} />
        <Route path="/tabs/mainDashboard" component={MainDashboard} />
        <Route path="/tabs/settings" component={Settings} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="mainDashboard" href="/tabs/mainDashboard">
          <IonIcon icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/events">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Events</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/announcements">
          <IonIcon icon={megaphone} />
          <IonLabel>Inbox</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/contact">
          <IonIcon icon={call} />
          <IonLabel>Contact</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;