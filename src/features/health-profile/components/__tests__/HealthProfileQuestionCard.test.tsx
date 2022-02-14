/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import { FormikProps } from 'formik';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import { TEXT_INPUT_PNTS_LABEL } from '../../utils/healthProfileUtils';
import HealthProfileQuestionCard, { EFieldType } from '../HealthProfileQuestionCard';

const formikProps = {
  handleBlur: jest.fn().mockImplementation(() => jest.fn()),
  handleChange: jest.fn().mockImplementation(() => jest.fn()),
  setFieldValue: jest.fn().mockImplementation(() => jest.fn()),
  touched: {
    test_property_name_text: false,
  },
  values: {
    test_property_name_yesno: '',
  },
} as unknown as FormikProps<any>;

const baseQuestion = {
  dependsOnProperty: null,
  dependsOnPropertyValue: null,
  description: null,
  placeholder: null,
  pnts: true,
  required: true,
  showNewTag: false,
};

describe('HealthProfileQuestionCard tests', () => {
  it('displays YesNo fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.YESNO,
      items: null,
      propertyName: 'test_property_name_yesno',
      question: 'YesNo question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
      { mockTheme: true },
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/YesNo question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const buttonYes = renderAPI.getByTestId('button-yes');
      await fireEvent.press(buttonYes);
      expect(formikProps.handleChange).toHaveBeenCalled();

      const buttonNo = renderAPI.getByTestId('button-no');
      await fireEvent.press(buttonNo);
      expect(formikProps.handleChange).toHaveBeenCalled();

      const buttonPnts = renderAPI.getByText(TEXT_INPUT_PNTS_LABEL);
      await fireEvent.press(buttonPnts);
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Radio fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.RADIO,
      items: [
        { label: 'label1', value: 'label1' },
        { label: 'label2', value: 'label2' },
      ],
      propertyName: 'test_property_name_radio',
      question: 'Radio question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Radio question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const option1 = renderAPI.getByTestId('input-radio-item-label1');
      await fireEvent.press(option1);
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Multiselect fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.MULTISELECT,
      items: [
        {
          label: 'Multiselect option 1',
          name: 'multiselect_option_1',
          testID: 'multiselect_option_1',
        },
        {
          label: 'Multiselect option 2',
          name: 'multiselect_option_2',
          testID: 'multiselect_option_2',
        },
      ],
      propertyName: 'test_property_name_multiselect',
      question: 'Multiselect question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Multiselect question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const option1 = renderAPI.getByText('Multiselect option 1');
      await fireEvent.press(option1);
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Text fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.TEXT,
      items: null,
      propertyName: 'test_property_name_text',
      question: 'Text question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
        testID="test_input"
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Text question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const input = renderAPI.getByTestId('test_input');
      fireEvent.changeText(input, 'a value');
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Time fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.TIME,
      items: null,
      maxValue: 19 * 60,
      minValue: 0,
      propertyName: 'test_property_name_time',
      question: 'Time question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Time question label/i);
    expect(questionText).toBeTruthy();
    // Not possible to test selection of dropdown
  });

  it('displays Height fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.HEIGHT,
      items: null,
      propertyName: 'test_property_name_height',
      question: 'Height question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Height question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const input = renderAPI.getByTestId('input-height-feet');
      fireEvent.changeText(input, '10');
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Weight fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.WEIGHT,
      items: null,
      propertyName: 'test_property_name_weight',
      question: 'Weight question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Weight question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const input = renderAPI.getByTestId('input-weight-stones');
      fireEvent.changeText(input, '10');
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Postcode fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.POSTCODE,
      items: null,
      propertyName: 'test_property_name_postcode',
      question: 'Postcode question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
        testID="test_postcode"
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Postcode question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const input = renderAPI.getByTestId('test_postcode');
      fireEvent.changeText(input, 'SE1');
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Race fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.RACE,
      items: [
        { label: 'English, Welsh, Scottish, Northern Irish, Irish', value: 'british_irish' },
        { label: 'Other', value: 'other' },
      ],
      propertyName: 'test_property_name_race',
      question: 'Race question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Race question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const option1 = renderAPI.getByTestId('input-radio-item-british_irish');
      await fireEvent.press(option1);
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });

  it('displays Immunodeficiency fields in editing mode', async () => {
    const question = {
      ...baseQuestion,
      fieldType: EFieldType.IMMUNODEFICIENCY,
      items: [
        {
          label: 'Option 1',
          name: 'option_1',
          testID: 'option_1',
        },
        {
          label: 'Option 2',
          name: 'option_2',
          testID: 'option_2',
        },
      ],
      propertyName: 'test_property_name_immunodeficiency',
      question: 'Immunodeficiency question label',
    };

    const mockedElement = createMockedElement(
      <HealthProfileQuestionCard
        isEditing
        description={question.description}
        editOnPress={jest.fn()}
        fieldType={question.fieldType}
        formikProps={formikProps}
        items={question.items}
        key={question.propertyName}
        label={question.question}
        new={question.showNewTag}
        placeholder={question.placeholder}
        propertyName={question.propertyName}
        showPnts={question.pnts}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/Immunodeficiency question label/i);
    expect(questionText).toBeTruthy();

    await act(async () => {
      const option1 = renderAPI.getByText('Option 1');
      await fireEvent.press(option1);
      expect(formikProps.handleChange).toHaveBeenCalled();
    });
  });
});
