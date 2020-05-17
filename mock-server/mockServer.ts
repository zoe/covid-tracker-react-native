import mockDb from './mockDb';
import { Patient, Assessment } from './types';
import express = require('express');
import bodyParser = require('body-parser');
import uuid = require('uuid');
import moment = require('moment');

const db = mockDb();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/auth/login', (_, res) => {
  return res.status(200).send({
    key: 'abc',
    user: {
      username: 'testuser@example.com',
      authorizations: [],
      patients: ['00000000-0000-0000-0000-000000000000'],
      pii: '00000000-0000-0000-0000-000000000000',
      push_tokens: [],
      country_code: 'GB',
    },
  });
});

app.post('/auth/password/reset', (_, res) => {
  return res.send();
});

app.post('/auth/signup', (_, res) => {
  return res.status(201).send({
    key: 'abc',
    user: {
      username: 'testuser@example.com',
      authorizations: [],
      patients: ['00000000-0000-0000-0000-000000000000'],
      pii: '00000000-0000-0000-0000-000000000000',
      push_tokens: [],
      country_code: 'GB',
    },
  });
});

app.post('/tokens', (_, res) => {
  return res.send({
    token: 'abcd',
    active: true,
    platform: 'ANDROID',
  });
});

app.patch('/consent', (_, res) => {
  return res.send();
});

app.get('/patients/:patientId', (req, res) => {
  const { patientId } = req.params;
  const patient = db.patients.get(patientId);

  if (!patient) {
    return res.status(404).send;
  }

  res.header('Content-type', 'application/json');
  return res.status(200).send(patient);
});

app.patch('/patients/:patientId', (req, res) => {
  const { patientId } = req.params;

  res.header('Content-type', 'application/json');
  return res.send(
    db.patients.save(patientId, {
      ...db.patients.get(patientId),
      ...req.body,
      profile_attributes_updated_at: moment().format(),
    })
  );
});

app.post('/patients/', (req, res) => {
  const id = uuid.v1();
  res.header('Content-type', 'application/json');
  return res.send(db.patients.save(id, { ...req.body, id }));
});

app.get('/patient_list/', (_, res) => {
  res.header('Content-type', 'application/json');
  return res.send(db.patients.get());
});

app.get('/profile', (_, res) => {
  return res.status(200).send({
    username: 'testuser@example.com',
    authorizations: [],
    patients: (db.patients.get() as Patient[]).map((patient) => patient.id),
    pii: '00000000-0000-0000-0000-000000000000',
    push_tokens: [],
    country_code: 'GB',
  });
});

app.patch('/information/:userId', (_, res) => {
  return res.send();
});

app.post('/assessments', (req, res) => {
  const { body: assessment } = req as { body: Assessment };
  const id = uuid.v1();

  const patient = db.patients.get(assessment.patient) as Patient;
  db.patients.save(patient.id, { ...patient, last_reported_at: moment().format() });

  res.header('Content-type', 'application/json');
  return res.send(db.assessments.save(id, { ...assessment, id }));
});

app.patch('/assessments/:assessmentId', (req, res) => {
  const { body: updatedAssessment } = req as { body: Assessment };
  const { assessmentId } = req.params;
  const assessment = db.assessments.get(assessmentId) as Assessment;

  const patient = db.patients.get(assessment.patient) as Patient;
  db.patients.save(patient.id, { ...patient, last_reported_at: moment().format() });

  res.header('Content-type', 'application/json');
  return res.send(
    db.assessments.save(assessmentId, {
      ...db.assessments.get(assessmentId),
      ...updatedAssessment,
      profile_attributes_updated_at: moment().format(),
    })
  );
});

app.get('/users/startup_info/', (_, res) => {
  return res.status(200).send({
    users_count: '3000000',
    ip_country: 'GB',
  });
});

app.get('/area_stats', (_, res) => {
  return res.status(200).send({
    locked: false,
    rank: 768,
    number_of_areas: 1000,
    rank_delta: 24,
    area_name: 'Suffolk County',
    number_of_missing_contributors: 100,
    predicted_cases: 698,
    population: 42000,
  });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
