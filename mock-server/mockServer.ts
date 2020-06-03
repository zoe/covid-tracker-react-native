import mockDb from './mockDb';
import { Patient, Assessment } from './types';
import express = require('express');
import bodyParser = require('body-parser');
import uuid = require('uuid');
import moment = require('moment');

const db = mockDb();

const app = express();
const port = 3000;

// Flags to change mockServer responses
const shouldAskUKValidationStudy = true;
const askForRating = true;
const countryCode = 'GB';

// Flags to change logging
const logRequests = true;
const logAuthorization = false;
const logBody = true;

function consoleLogBody(req: express.Request) {
  try {
    const prettyJson = JSON.stringify(req.body, null, 2);
    if (prettyJson !== '{}') console.log(prettyJson);
  } catch (e) {
    console.log('Badly formed JSON:' + req.body);
  }
}

function consoleLogAuthorization(req: express.Request) {
  console.log('Auth: ' + req.get('Authorization'));
}

function consoleLogRequests(req: express.Request) {
  console.log(req.method + ' ' + req.originalUrl);
}

function loggingMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (logRequests) consoleLogRequests(req);
  if (logAuthorization) consoleLogAuthorization(req);
  if (logBody) consoleLogBody(req);
  next();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(loggingMiddleware);

/**
 * Auth
 */
app.post('/auth/login/', (_, res) => {
  return res.status(200).send({
    key: 'abc',
    user: {
      username: 'testuser@example.com',
      authorizations: [],
      patients: ['00000000-0000-0000-0000-000000000000'],
      pii: '00000000-0000-0000-0000-000000000000',
      push_tokens: [],
      country_code: countryCode,
    },
  });
});

app.post('/auth/password/reset/', (_, res) => {
  return res.send();
});

app.post('/auth/signup/', (_, res) => {
  return res.status(201).send({
    key: 'abc',
    user: {
      username: 'testuser@example.com',
      authorizations: [],
      patients: ['00000000-0000-0000-0000-000000000000'],
      pii: '00000000-0000-0000-0000-000000000000',
      push_tokens: [],
      country_code: countryCode,
    },
  });
});

app.delete('/users/delete/', (_, res) => {
  return res.send();
});

/**
 * Push Tokens
 */
app.post('/tokens/', (_, res) => {
  return res.send({
    token: 'abcd',
    active: true,
    platform: 'ANDROID',
  });
});

/**
 * Consent
 */
app.patch('/consent/', (_, res) => {
  return res.send();
});

/**
 * Study Consent
 */
app.post('/study_consent/', (_, res) => {
  return res.send();
});

app.get('/study_consent/status/', (_, res) => {
  return res.send({
    should_ask_uk_validation_study: shouldAskUKValidationStudy,
  });
});

/**
 * Profile
 */
app.get('/profile/', (_, res) => {
  return res.status(200).send({
    username: 'testuser@example.com',
    authorizations: [],
    patients: (db.patients.get() as Patient[]).map((patient) => patient.id),
    pii: '00000000-0000-0000-0000-000000000000',
    push_tokens: [],
    ask_for_rating: askForRating,
  });
});

/**
 * App Config / Startup Info
 */
app.get('/users/startup_info/', (_, res) => {
  return res.status(200).send({
    users_count: '3000000',
    ip_country: countryCode,
  });
});

app.get('/area_stats/', (_, res) => {
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

/**
 * Patient
 */
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

// Why not just patients?
app.get('/patient_list/', (_, res) => {
  res.header('Content-type', 'application/json');
  return res.send(db.patients.get());
});

/**
 * Assessment
 */
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

/**
 * COVID Tests
 */
app.get('/covid_tests', (_, res) => res.status(200).send(db.covidTests.get()));

app.post('/covid_tests', (req, res) => {
  const id = uuid.v1();
  res.header('Content-type', 'application/json');
  return res.send(db.covidTests.save(id, { id, ...req.body }));
});

app.get('/covid_tests/:testId', (req, res) => {
  const { testId } = req.params;
  return res.status(200).send(db.covidTests.get(testId));
});

app.patch('/covid_tests/:testId', (req, res) => {
  const { testId } = req.params;

  res.header('Content-type', 'application/json');
  return res.send(
    db.covidTests.save(testId, {
      ...db.covidTests.get(testId),
      ...req.body,
    })
  );
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
