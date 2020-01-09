import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import React, { useState, useEffect } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Message} from 'rbx';
import { timeParts } from './components/Course/times'
import CourseList from './components/CourseList'

const firebaseConfig = {
  apiKey: "AIzaSyDmGPtMOC7gEghInWCNkokJCZ0BzUeqkH0",
  authDomain: "cs394-a4e37.firebaseapp.com",
  databaseURL: "https://cs394-a4e37.firebaseio.com",
  projectId: "cs394-a4e37",
  storageBucket: "cs394-a4e37.appspot.com",
  messagingSenderId: "796618119823",
  appId: "1:796618119823:web:d44881c7128dd8f762aefa",
  measurementId: "G-V6QT0DFX5R"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const Banner = ({ user, title }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
    <Title>{ title || '[loading...]' }</Title>
  </React.Fragment>
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: Object.values(schedule.courses).map(addCourseTimes)
});

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <Container>
      <Banner title={ schedule.title } user={ user } />
      <CourseList courses={ schedule.courses } user={ user } />
    </Container>
  );
};

export default App;