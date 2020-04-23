import express = require("express");
import bodyParser = require("body-parser");
import moment = require("moment");

import {mockContributionCount} from './utils';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/auth/login", (req, res) => {
  return res.status(200).send({
    key: "abc",
    user: {
      username: "testuser@example.com",
      authorizations: [],
      patients: ["00000000-0000-0000-0000-000000000000"],
      pii: "00000000-0000-0000-0000-000000000000",
      push_tokens: [],
      country_code: "GB",
    },
  });
});

app.post("/auth/password/reset", (req, res) => {
  return res.send();
});

app.post("/auth/signup", (req, res) => {
  return res.status(201).send({
    key: "abc",
    user: {
      username: "testuser@example.com",
      authorizations: [],
      patients: ["00000000-0000-0000-0000-000000000000"],
      pii: "00000000-0000-0000-0000-000000000000",
      push_tokens: [],
      country_code: "GB",
    },
  });
});

app.post("/tokens", (req, res) => {
  return res.send({
    token: "abcd",
    active: true,
    platform: "ANDROID",
  });
});

app.patch("/consent", (req, res) => {
  return res.send();
});

app.get("/patients/:patientId", (req, res) => {
  return res.status(200).send({
    year_of_birth: null,
    height_cm: null,
    height_feet: null,
    weight_kg: null,
    weight_pounds: null,
    gender: null,
    gender_identity: null,
    postcode: null,
    needs_help: null,
    housebound_problems: null,
    help_available: null,
    mobility_aid: null,
    is_in_uk_twins: null,
    is_in_uk_biobank: null,
    is_in_uk_guys_trust: null,
    is_in_us_nurses_study: null,
    is_in_us_mass_general_brigham: null,
    is_in_us_stanford_diabetes: null,
    is_in_us_stanford_well: null,
    is_in_us_growing_up_today: null,
    is_in_us_stanford_nutrition: null,
    is_in_us_multiethnic_cohort: null,
    is_in_us_predict2: null,
    is_in_us_american_cancer_society_cancer_prevention_study_3: null,
    is_in_us_harvard_health_professionals: null,
    is_in_us_california_teachers: null,
    is_in_us_sister: null,
    is_in_us_agricultural_health: null,
    is_in_us_gulf: null,
    is_in_us_aspree_xt: null,
    is_in_us_bwhs: null,
    contact_health_worker: null,
    healthcare_professional: null,
    is_carer_for_community: null,
    have_worked_in_hospital_inpatient: null,
    have_worked_in_hospital_outpatient: null,
    have_worked_in_hospital_clinic: null,
    have_worked_in_hospital_care_facility: null,
    have_worked_in_hospital_home_health: null,
    have_worked_in_hospital_school_clinic: null,
    have_worked_in_hospital_other: null,
    interacted_patients_with_covid: null,
    have_used_PPE: null,
    always_used_shortage: null,
    sometimes_used_shortage: null,
    never_used_shortage: null,
    limited_activity: null,
    has_heart_disease: null,
    has_diabetes: null,
    has_lung_disease: null,
    is_smoker: null,
    need_outside_help: null,
    need_inside_help: null,
    has_kidney_disease: null,
    does_chemiotherapy: null,
    takes_immunosuppressants: null,
    takes_corticosteroids: null,
    takes_blood_pressure_medications: null,
    takes_any_blood_pressure_medications: null,
    takes_blood_pressure_medications_sartan: null,
    already_had_covid: null,
    classic_symptoms: null,
    is_pregnant: null,
    interacted_with_covid: null,
    smoker_status: null,
    smoked_years_ago: null,
    takes_aspirin: null,
    has_cancer: null,
    classic_symptoms_days_ago: null,
    cancer_type: null,
    on_cancer_clinical_trial: null,
    cancer_clinical_trial_site: null,
    cancer_clinical_trial_nct_id: null,
    cancer_physician_name: null,
    version: "",
    profile_attributes_updated_at: null,
  });
});

app.patch("/patients/:patientId", (req, res) => {
  // TODO: return different patients on different patientId
  return res.send();
});

app.get("/patient_list/", (req, res) => {
  return res.send([
    {
      id: "00000000-0000-0000-0000-000000000000",
      avatar_name: 'profile1',
      name: 'Me',
      last_reported_at: moment().subtract(6, 'hours').format(),
      contributions: mockContributionCount(),
    },
    {
      id: "00000000-0000-0000-0000-000000000001",
      avatar_name: 'profile2',
      name: 'Alice',
      last_reported_at: '2020-04-20T15:07:00Z',
      contributions: mockContributionCount(),
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      avatar_name: 'profile3',
      name: 'Bob',
      last_reported_at: moment().subtract(1, 'days').format(),
      contributions: mockContributionCount(),
    },
  ])
});

app.get("/profile", (req, res) => {
  return res.status(200).send({
    username: "testuser@example.com",
    authorizations: [],
    patients: [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000001",
      "00000000-0000-0000-0000-000000000002"
    ],
    pii: "00000000-0000-0000-0000-000000000000",
    push_tokens: [],
    country_code: "GB",
  });
});

app.patch("/information/:userId", (req, res) => {
  return res.send()
});

app.post("/assessments", (req, res) => {
  return res.send({
    id: 'abcde'
  })
});

app.patch("/assessments/:assessmentId", (req, res) => {
  return res.send({
    id: 'abcde'
  })
});

app.get("/users/startup_info/", (req, res) => {
  return res.status(200).send({
    users_count: '2000000',
    ip_country: 'GB'
  });
});

app.get("/area_stats", (req, res) => {

  return res.status(200).send({
    "locked": false,
    "rank": 768,
    "number_of_areas": 1000,
    "rank_delta": 24,
    "area_name": "Suffolk County",
    "number_of_missing_contributors": 100,
    "predicted_cases": 698,
    "population": 42000,
  });
});


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
