import { vaccineApi } from '@covid/core/api/vaccineApi';
import {
  EVaccineBrands,
  EVaccineLocations,
  EVaccineTypes,
  TVaccineRequest,
} from '@covid/core/vaccine/dto/VaccineRequest';
import fetchMock from 'jest-fetch-mock';

import { setupApiStore } from '../../../../__mocks__/mockRTKApiStore';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const DUMMY_PATIENT_ID_CURRENT = 'current_patient_abc123';

const DUMMY_VACCINE_WITH_TWO_DOSES: TVaccineRequest = {
  brand: null,
  doses: [
    {
      batch_number: 'Seq1',
      brand: EVaccineBrands.PFIZER,
      date_taken_specific: '2021-08-02',
      description: '',
      id: 'xyz123',
      location: EVaccineLocations.HOME,
      sequence: 1,
      vaccine: '',
      vaccine_type: EVaccineTypes.COVID_VACCINE,
    },
    {
      batch_number: 'Modena 1111111',
      brand: EVaccineBrands.MODERNA,
      date_taken_specific: '2021-08-11',
      description: '',
      id: '123xyz',
      location: EVaccineLocations.HOME,
      sequence: 2,
      vaccine: '',
      vaccine_type: EVaccineTypes.COVID_VACCINE,
    },
  ],
  id: 'abc123',
  patient: DUMMY_PATIENT_ID_CURRENT,
  placebo: null,
  vaccine_type: EVaccineTypes.COVID_VACCINE,
  version: '',
};

// Honestly not sure how useful these tests are, but they're here for completeness
describe('listVaccines', () => {
  test('request is correct', () => {
    const storeRef = setupApiStore(vaccineApi);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store.dispatch<any>(vaccineApi.endpoints.listVaccines.initiate(undefined)).then(() => {
      expect(fetchMock).toBeCalledTimes(1);
      const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;

      const accept = headers.get('Content-Type');
      const authorization = headers.get('Authorization');

      expect(method).toBe('GET');
      expect(url).toBe('/vaccines/');
      expect(accept).toBe('application/json');
      expect(authorization).toBeNull();
    });
  });

  test('successful response', () => {
    const storeRef = setupApiStore(vaccineApi);
    fetchMock.mockResponse(JSON.stringify([DUMMY_VACCINE_WITH_TWO_DOSES]));

    return storeRef.store.dispatch<any>(vaccineApi.endpoints.listVaccines.initiate(undefined)).then((action: any) => {
      const { status, data, isSuccess } = action;
      expect(status).toBe('fulfilled');
      expect(isSuccess).toBe(true);
      expect(data).toStrictEqual([DUMMY_VACCINE_WITH_TWO_DOSES]);
    });
  });

  test('unsuccessful response', () => {
    const storeRef = setupApiStore(vaccineApi);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store.dispatch<any>(vaccineApi.endpoints.listVaccines.initiate(undefined)).then((action: any) => {
      const {
        status,
        error: { message },
        isError,
      } = action;
      expect(status).toBe('rejected');
      expect(isError).toBe(true);
      expect(message).toBe('Internal Server Error');
    });
  });
});

describe('addVaccineAndDoses', () => {
  const newDose = {
    brand: EVaccineBrands.PFIZER,
    doses: [
      {
        batch_number: 'Seq1',
        brand: EVaccineBrands.PFIZER,
        date_taken_specific: '2021-08-02',
        description: '',
        id: 'xyz123',
        location: EVaccineLocations.HOME,
        sequence: 1,
        vaccine: '',
        vaccine_type: EVaccineTypes.COVID_VACCINE,
      },
    ],
    id: '',
    patient: DUMMY_PATIENT_ID_CURRENT,
    vaccine_type: EVaccineTypes.COVID_VACCINE,
    version: '',
  };

  test('request is correct', () => {
    const storeRef = setupApiStore(vaccineApi);

    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch<any>(
        vaccineApi.endpoints.addVaccineAndDoses.initiate({ patientId: DUMMY_PATIENT_ID_CURRENT, payload: newDose }),
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, headers, url } = request;

        request.json().then((data) => {
          expect(data).toStrictEqual(newDose);
        });

        const accept = headers.get('Content-Type');

        expect(method).toBe('POST');
        expect(url).toBe('/vaccines/');
        expect(accept).toBe('application/json');
      });
  });

  test('successful response', () => {
    const storeRef = setupApiStore(vaccineApi);
    fetchMock.mockResponse(JSON.stringify(newDose));

    return storeRef.store
      .dispatch<any>(
        vaccineApi.endpoints.addVaccineAndDoses.initiate({ patientId: DUMMY_PATIENT_ID_CURRENT, payload: newDose }),
      )
      .then((action: any) => {
        const { data } = action;
        expect(data).toStrictEqual(newDose);
      });
  });

  // test('unsuccessful response', () => {
  //   const storeRef = setupApiStore(vaccineApi);
  //   fetchMock.mockReject(new Error('Internal Server Error'));

  //   return storeRef.store.dispatch<any>(vaccineApi.endpoints.addVaccineAndDoses.initiate({})).then((action: any) => {
  //     const {
  //       status,
  //       error: { message },
  //       isError,
  //     } = action;
  //     expect(status).toBe('rejected');
  //     expect(isError).toBe(true);
  //     expect(message).toBe('Internal Server Error');
  //   });
  // });
});
