import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import jsPDF from 'jspdf';
import {
  ProgressBar,
  ProgressBarLabel,
  ProgressBarsWrapper,
  DailyQuote,
  ProgressSummaryWrapper,
  ExportButtonWrapper,
  ProgressBarWrapper,
  MascotImageWrapper,
  ProgressBarSpan,
  SeeMoreTextWrapper
} from "./MainDashBoard.styles";
import { settingsSharp } from 'ionicons/icons';
import { getProfile } from "../services/api";
import moment from 'moment'

const MainDashboard: React.FC = () => {
  const [points, setPoints] = useState({
    sincerityPoints: 0,
    gratitudePoints: 0,
    servicePoints: 0,
    kindnessPoints: 0,
  });
  const [name, setName] = useState([]);
  const [myPastEvents, setMyPastEvents] = useState([]);
  const [myUpcomingEvents, setMyUpcomingEvents] = useState([]);

  useEffect(() => {
    getProfile().then((data) => {
      setName(data.name);
      const pts = {
        sincerityPoints: data.sincerity_points,
        gratitudePoints: data.gratitude_points,
        servicePoints: data.service_points,
        kindnessPoints: data.kindness_points,
      };
      setPoints(pts);
      setMyUpcomingEvents(
        data.events.filter((event) =>
          moment(event.start_datetime).isAfter(moment())
        )
      );
      setMyPastEvents(
        data.events.filter((event) =>
          moment(event.start_datetime).isBefore(moment())
        )
      );
    });
  }, [points]);

  const renderProgressBarWithLabel = (label: string, value: number) => {
    const mascotImagePath = "assets/logo/" + label.toLowerCase() + ".png";
    return (
      <ProgressBarWrapper>
        <span>
          <MascotImageWrapper
            src={mascotImagePath}
            width={40}
          ></MascotImageWrapper>
        </span>
        <ProgressBarSpan>
          <ProgressBarLabel>
            {label} - {value}
          </ProgressBarLabel>
          <ProgressBar theme={{ filledAmount: value }}></ProgressBar>
        </ProgressBarSpan>
      </ProgressBarWrapper>
    );
  };

  const renderProgressSummary = () => {
    return (
      <ProgressSummaryWrapper>
        <IonTitle size="large">
          Way to go! Here's your progress summary:
        </IonTitle>
        <ProgressBarsWrapper>
          <br />
          {renderProgressBarWithLabel("Sincerity", points.sincerityPoints)}
          <br />
          {renderProgressBarWithLabel("Gratitude", points.gratitudePoints)}
          <br />
          {renderProgressBarWithLabel("Service", points.servicePoints)}
          <br />
          {renderProgressBarWithLabel("Kindness", points.kindnessPoints)}
        </ProgressBarsWrapper>
      </ProgressSummaryWrapper>
    );
  };

  const renderPastEvents = (event) => {
    return (
      <>
        <IonTitle size="large">Past Events</IonTitle>
        <br />
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{moment(event.start_datetime).format("MMM Do YYYY")}</IonCardSubtitle>
            <IonCardTitle>{event.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {event.description.substring(0, 200) + "..."}
          </IonCardContent>
        </IonCard>
        <SeeMoreTextWrapper href="/tabs/events">See more</SeeMoreTextWrapper>
      </>
    );
  };

  const renderUpcomingEvents = (event) => {
    return (
      <>
        <IonTitle size="large">Upcoming Events</IonTitle>
        <br />
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{moment(event.start_datetime).format("MMM Do YYYY")}</IonCardSubtitle>
            <IonCardTitle>{event.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {event.description.substring(0, 200) + "..."}
          </IonCardContent>
        </IonCard>
        <SeeMoreTextWrapper href="/tabs/events">See more</SeeMoreTextWrapper>
      </>
    );
  };

  const generatePDF = () => {
    var doc = new jsPDF("p", "pt");
    doc.rect(
      20,
      20,
      doc.internal.pageSize.width - 40,
      doc.internal.pageSize.height - 40,
      "S"
    );

    // Title
    doc.setFont("georgia", "italic");
    doc.setFontSize(30);
    doc.text("Volunteer Records Certificate", 120, 60);

    // Header
    doc.setFont("georgia");
    doc.setFontSize(16);
    doc.text("Organization: Blossom World Society", 40, 100);
    doc.text("Name: John", 40, 130);
    doc.text("Date: 10/10/2020", 40, 160);

    doc.setFontSize(14);
    doc.text("To whomever it may concern,", 40, 200);
    doc.text(
      "This certificate recognises John's following contributions to Blossom World Society:",
      40,
      230
    );

    // Table Header Row
    doc.setFontSize(12);
    doc.setFont("georgia", "bold");
    doc.text("ID", 40, 270);
    doc.text("Event Name", 70, 270);
    doc.text("Event Date", 330, 270);
    doc.text("Hours", 500, 270);

    // Event Rows
    doc.setFontSize(12);
    doc.setFont("georgia", "italic");
    doc.text("1.", 40, 300);
    doc.text("Discovering Treasure Through Stories", 70, 300);
    doc.text("March 24, 2020", 330, 300);
    doc.text("10", 500, 300);

    doc.text("2.", 40, 330);
    doc.text("Standards For Being A Good Student", 70, 330);
    doc.text("April 24, 2020", 330, 330);
    doc.text("12", 500, 330);

    doc.text("3.", 40, 360);
    doc.text("Happy Formula @ Aljunied", 70, 360);
    doc.text("May 24, 2020", 330, 360);
    doc.text("15", 500, 360);

    doc.text("4.", 40, 390);
    doc.text("#I Am Remarkable workshop", 70, 390);
    doc.text("June 24, 2020", 330, 390);
    doc.text("8", 500, 390);

    // Footer
    doc.setFontSize(14);
    doc.text(
      "John's contributions to Blossom World Society are well-appreciated!",
      40,
      430
    );
    doc.text("Best Regards,", 40, 460);

    // Sign Off
    doc.setFontSize(14);
    doc.text("Blossom World Society Secretariat", 40, 490);

    // Export
    doc.save("Volunteer Record.pdf");
  };

  const renderExportRecordsButton = () => {
    return (
      <ExportButtonWrapper>
        <IonButton onClick={() => generatePDF()} color="dark">
          Export Records to PDF
        </IonButton>
      </ExportButtonWrapper>
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome to Blossom, {name ? name : 'Dear User'}!</IonTitle>
          <IonButton slot="end" href="/tabs/settings"><IonIcon icon={settingsSharp} /></IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <DailyQuote style={{ marginTop: "1.5rem" }}><i>"Be the change you wish to see in the world"</i></DailyQuote>
        <br />
        <br />
        {renderProgressSummary()}
        <br />
        {myUpcomingEvents.length > 0 ? renderUpcomingEvents(myUpcomingEvents[0]) : null}
        <br />
        {myPastEvents.length > 0 ? renderPastEvents(myPastEvents[0]) : null}
        <br />
        {renderExportRecordsButton()}
      </IonContent>
    </IonPage>
  );
};

export default MainDashboard;
