import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Tab3.css';

const Tab3: React.FC = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const formCustomerName = form.elements.formCustomerName.value;
    console.log(formCustomerName)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formCustomerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control type="text" placeholder="Customer Name" required/>
                {/* <Form.Control.Feedback type="invalid">
                    {errors.formCustomerName}
                </Form.Control.Feedback> */}
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

                </Form>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
