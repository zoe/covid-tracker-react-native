import React, {Component} from "react";
import {KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";
import Screen, {FieldWrapper, Header, ProgressBlock, screenWidth} from "../../components/Screen";
import {BrandedButton, ErrorText, HeaderText} from "../../components/Text";
import {Form, Icon, Item, Label, Picker, Text} from "native-base";

import ProgressStatus from "../../components/ProgressStatus";
import {Formik, FormikProps} from "formik";
import * as Yup from "yup";
import {ValidatedTextInput} from "../../components/ValidatedTextInput";

import {colors, fontStyles} from "../../../theme"
import i18n from "../../locale/i18n"
import UserService, {isGBLocale, isUSLocale} from "../../core/user/UserService";
import {StackNavigationProp} from "@react-navigation/stack";
import {ScreenParamList} from "../ScreenParamList";
import {RouteProp} from "@react-navigation/native";
import {PatientInfosRequest} from "../../core/user/dto/UserAPIContracts";
import DropdownField from "../../components/DropdownField";
import {ValidationError, ValidationErrors} from "../../components/ValidationError";
import {GenericTextField} from "../../components/GenericTextField";
import {CheckboxItem, CheckboxList} from "../../components/Checkbox";


const PICKER_WIDTH = (Platform.OS === 'ios') ? undefined : '100%';

const initialFormValues = {
    yearOfBirth: "",
    sex: "",
    genderIdentity: "",
    genderIdentityDescription: "",
    postcode: "",
    height: "",
    feet: "",
    inches: "",
    heightUnit: "ft",
    weight: "",
    stones: "",
    pounds: "",
    weightUnit: "lbs",

    everExposed: "",
    houseboundProblems: "no",
    needsHelp: "no",
    helpAvailable: "no",
    mobilityAid: "no",
    race: [] as string[],
    raceOther: "",
    ethnicity: ""
};

interface AboutYouData {
    yearOfBirth: string;
    sex: string;
    genderIdentity: string;
    genderIdentityDescription: string;

    height: string;
    feet: string;
    inches: string;
    heightUnit: string;
    weight: string;
    stones: string;
    pounds: string;
    weightUnit: string;

    postcode: string;

    everExposed: string;
    houseboundProblems: string,
    needsHelp: string,
    helpAvailable: string,
    mobilityAid: string,
    race: string[]
    raceOther: string
    ethnicity: string
}

type RaceCheckBoxData = {
    label: string,
    value: string
}

type AboutYouProps = {
    navigation: StackNavigationProp<ScreenParamList, 'AboutYou'>
    route: RouteProp<ScreenParamList, 'AboutYou'>;
}

type State = {
    errorMessage: string;
    enableSubmit: boolean;
}

const initialState: State = {
    errorMessage: "",
    enableSubmit: true,
};


export default class AboutYouScreen extends Component<AboutYouProps, State> {

    constructor(props: AboutYouProps) {
        super(props);
        this.state = initialState;
    }

    handleUpdateHealth(formData: AboutYouData) {
        if (this.state.enableSubmit) {
            this.setState({enableSubmit: false}); // Stop resubmissions

            const currentPatient = this.props.route.params.currentPatient;
            const patientId = currentPatient.patientId;
            const userService = new UserService();
            var infos = this.createPatientInfos(formData);

            userService.updatePatient(patientId, infos)
                .then(response => {
                    currentPatient.isFemale = formData.sex !== 'male',
                    this.props.navigation.navigate('YourHealth', {currentPatient})
                })
                .catch(err => {
                    this.setState({errorMessage: i18n.t("something-went-wrong")});
                })
                .then(() => {
                    this.setState({enableSubmit: true})
                });
        }
    }


    private createPatientInfos(formData: AboutYouData) {
        let infos = {
            year_of_birth: parseInt(formData.yearOfBirth),
            gender: formData.sex === 'male' ? 1 : formData.sex === 'female' ? 0 : formData.sex === 'pfnts' ? 2 : 3,
            gender_identity: formData.genderIdentity,
            interacted_with_covid: formData.everExposed,
            housebound_problems: formData.houseboundProblems === "yes",
            needs_help: formData.needsHelp === "yes",
            help_available: formData.helpAvailable === "yes",
            mobility_aid: formData.mobilityAid === "yes",
            race: formData.race,
        } as Partial<PatientInfosRequest>;

        if (formData.ethnicity) {
            infos = {
                ...infos,
                ethnicity:  formData.ethnicity
            }
        }

        if (formData.raceOther) {
            infos = {
                ...infos,
                race_other: formData.raceOther
            }
        }

        if (formData.postcode) {
            infos = {
                ...infos,
                postcode: formData.postcode
            }
        }

        if (formData.genderIdentity === 'other' && formData.genderIdentityDescription) {
            infos = {...infos, gender_identity: formData.genderIdentityDescription}
        } else {
            infos = {...infos, gender_identity: formData.genderIdentity}
        }

        if (formData.heightUnit === 'ft') {
            let inches = parseFloat(formData.inches);
            if (formData.feet) {
                const feet = parseFloat(formData.feet) || 0;
                inches += feet * 12;
            }
            infos = {...infos, height_feet: inches / 12.0};

        } else {
            infos = {...infos, height_cm: parseFloat(formData.height)};
        }

        if (formData.weightUnit === 'lbs') {
            let pounds = parseFloat(formData.pounds);
            if (formData.stones) {
                const stones = parseFloat(formData.stones) || 0;
                pounds += stones * 14;
            }
            infos = {...infos, weight_pounds: pounds};
        } else {
            infos = {...infos, weight_kg: parseFloat(formData.weight)};
        }

        return infos;
    }

    registerSchema = Yup.object().shape({
        yearOfBirth: Yup.number()
            .required(i18n.t("required-year-of-birth"))
            .min(1900, i18n.t("correct-year-of-birth"))
            .max(2020, i18n.t("correct-year-of-birth")),
        sex: Yup.string().required(i18n.t("required-sex-at-birth")),
        genderIdentity: Yup.string()
            .required(i18n.t("required-gender-identity"))
            .test('len', 'Maximum 30 characters', val => (val && val.length < 30) || !val),
        heightUnit: Yup.string().required(),
        height: Yup.number().when('heightUnit', {
            is: 'cm',
            then: Yup.number().required("Please enter your height in centimeters as a number")
        }),
        feet: Yup.number().when('heightUnit', {
            is: 'ft',
            then: Yup.number()
        }),
        inches: Yup.number().when('heightUnit', {
            is: 'ft',
            then: Yup.number().required("Please enter your height in feet & inches")
        }),

        weightUnit: Yup.string().required(),
        weight: Yup.number().when('weightUnit', {
            is: 'kg',
            then: Yup.number().required("Please enter your weight in kilograms")
        }),
        stones: Yup.number().when('weightUnit', {
            is: 'lbs',
            then: Yup.number()
        }),
        pounds: Yup.number().when('weightUnit', {
            is: 'lbs',
            then: Yup.number().required("Please enter your weight in pounds")
        }),

        postcode: Yup.string().required(i18n.t("required-postcode")),

        everExposed: Yup.string().required("Please indicate if you've been exposed to someone with COVID-19 infection"),
        houseboundProblems: Yup.string().required(),
        needsHelp: Yup.string().required(),
        helpAvailable: Yup.string().required(),
        mobilityAid: Yup.string().required(),
        race: Yup.array<string>().min(1, i18n.t("please-select-race")),
        raceOther: Yup.string().when('race', {
            is: (val: string[]) => val.includes('other'),
            then: Yup.string().required()
        }),
        ethnicity: Yup.string().when([], {
            is: () => isUSLocale(),
            then: Yup.string().required()
        })
    });


    render() {
        const currentPatient = this.props.route.params.currentPatient;
        const sexAtBirthItems = [
            {label: 'Choose one of the options', value: ''},
            {label: i18n.t("sex-at-birth-male"), value: 'male'},
            {label: i18n.t("sex-at-birth-female"), value: 'female'},
            {label: i18n.t("sex-at-birth-intersex"), value: 'intersex'},
            {label: i18n.t("sex-at-birth-pfnts"), value: 'pfnts'},
        ];
        const genderIdentityItems = [
            {label: 'Choose one of the options', value: ''},
            {label: i18n.t("gender-identity-male"), value: 'male'},
            {label: i18n.t("gender-identity-female"), value: 'female'},
            {label: i18n.t("gender-identity-pfnts"), value: 'pfnts'},
            {label: i18n.t("gender-identity-other"), value: 'other'},
        ];
        const everExposedItems = [
            {label: 'Choose one of the options', value: ''},
            {label: i18n.t("exposed-yes-documented"), value: 'yes_documented'},
            {label: i18n.t("exposed-yes-undocumented"), value: 'yes_suspected'},
            {label: i18n.t("exposed-both"), value: 'yes_documented_suspected'},
            {label: i18n.t("exposed-no"), value: 'no'},
        ];

        const createRaceCheckboxes = (data: RaceCheckBoxData[], props: FormikProps<AboutYouData>) => {
            return data.map(checkBoxData => {
                return <CheckboxItem
                    key={checkBoxData.value}
                    value={props.values.race.includes(checkBoxData.value)}
                    onChange={(checked: boolean) => {
                        let raceArray = props.values.race;
                        if (checked) {
                            raceArray.push(checkBoxData.value);
                        } else {
                            raceArray = raceArray.filter((val) => val != checkBoxData.value);
                        }
                        props.setFieldValue("race", raceArray)
                    }}
                >{checkBoxData.label}</CheckboxItem>
            })
        };

        return (
            <Screen profile={currentPatient.profile}>
                <Header>
                    <HeaderText>{i18n.t("title-about-you")}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={1} maxSteps={5}/>
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: AboutYouData) => {
                        return this.handleUpdateHealth(values)
                    }}>
                    {props => {
                        return (
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                                <Form>

                                    <FieldWrapper>
                                        <Item stackedLabel style={styles.textItemStyle}>
                                            <Label>{i18n.t("what-year-were-you-born")}</Label>
                                            <ValidatedTextInput
                                                placeholder={i18n.t("placeholder-year-of-birth")}
                                                value={props.values.yearOfBirth}
                                                onChangeText={props.handleChange("yearOfBirth")}
                                                onBlur={props.handleBlur("yearOfBirth")}
                                                error={props.touched.yearOfBirth && props.errors.yearOfBirth}
                                                returnKeyType="next"
                                                onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                }}
                                                keyboardType='numeric'
                                            />
                                        </Item>
                                        {!!props.errors.yearOfBirth && (
                                            <ValidationError error={props.errors.yearOfBirth}/>
                                        )}
                                    </FieldWrapper>

                                    <DropdownField
                                        placeholder={i18n.t("placeholder-sex")}
                                        selectedValue={props.values.sex}
                                        onValueChange={props.handleChange("sex")}
                                        label={i18n.t("your-sex-at-birth")}
                                        items={sexAtBirthItems}
                                        error={props.touched.sex && props.errors.sex}
                                    />

                                    <DropdownField
                                        selectedValue={props.values.genderIdentity}
                                        onValueChange={props.handleChange("genderIdentity")}
                                        label={i18n.t("label-gender-identity")}
                                        items={genderIdentityItems}
                                        error={props.touched.genderIdentity && props.errors.genderIdentity}
                                    />

                                    {props.values.genderIdentity === 'other' && (
                                        <GenericTextField
                                            formikProps={props}
                                            label={i18n.t("label-gender-identity-other")}
                                            name="genderIdentityDescription"
                                            placeholder="Optional"
                                        />
                                    )}

                                    {isGBLocale() && (
                                        <FieldWrapper>
                                            <Item stackedLabel style={styles.textItemStyle}>
                                                <Label>{i18n.t("race-question")}</Label>
                                                <CheckboxList>
                                                    {createRaceCheckboxes(UKRaceCheckboxes, props)}
                                                </CheckboxList>
                                            </Item>
                                        </FieldWrapper>
                                    )}

                                    {isUSLocale() && (
                                        <FieldWrapper>
                                            <Item stackedLabel style={styles.textItemStyle}>
                                                <Label>{i18n.t("race-question")}</Label>
                                                <CheckboxList>
                                                    {createRaceCheckboxes(USRaceCheckboxes, props)}
                                                </CheckboxList>
                                            </Item>
                                        </FieldWrapper>
                                    )}

                                    {props.values.race.includes("other") && (
                                        <GenericTextField
                                            formikProps={props}
                                            label={i18n.t("race-other-question")}
                                            name="raceOther"
                                        />
                                    )}

                                    {isUSLocale() && (
                                        <FieldWrapper>
                                            <Item stackedLabel style={styles.textItemStyle}>
                                                <Label>{i18n.t("ethnicity-question")}</Label>
                                                <CheckboxList>
                                                    <CheckboxItem
                                                        value={props.values.ethnicity == "hispanic"}
                                                        onChange={(value: boolean) => {
                                                            props.setFieldValue("ethnicity", value ? "hispanic" : "")
                                                        }}
                                                    >{i18n.t("hispanic")}</CheckboxItem>
                                                    <CheckboxItem
                                                        value={props.values.ethnicity == "not_hispanic"}
                                                        onChange={(value: boolean) => {
                                                            props.setFieldValue("ethnicity", value ? "not_hispanic" : "")
                                                        }}
                                                    >{i18n.t("not-hispanic")}</CheckboxItem>
                                                    <CheckboxItem
                                                        value={props.values.ethnicity == "prefer_not_to_say"}
                                                        onChange={(value: boolean) => {
                                                            props.setFieldValue("ethnicity", value ? "prefer_not_to_say" : "")

                                                        }}
                                                    >{i18n.t("prefer-not-to-say")}</CheckboxItem>
                                                </CheckboxList>
                                            </Item>
                                        </FieldWrapper>
                                    )}

                                    <FieldWrapper>
                                        <Item stackedLabel style={styles.textItemStyle}>
                                            <Label>{i18n.t("your-height")}</Label>
                                            {isUSLocale() ? (
                                                <View style={styles.primaryFieldRow}>
                                                    <View style={styles.tertiaryField}>
                                                        <ValidatedTextInput
                                                            placeholder={i18n.t("placeholder-feet")}
                                                            value={props.values.feet}
                                                            onChangeText={props.handleChange("feet")}
                                                            onBlur={props.handleBlur("feet")}
                                                            error={props.touched.feet && props.errors.feet}
                                                            returnKeyType="next"
                                                            onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                            }}
                                                            keyboardType='numeric'
                                                        />
                                                    </View>
                                                    <View style={styles.tertiaryField}>
                                                        <ValidatedTextInput
                                                            placeholder={i18n.t("placeholder-inches")}
                                                            value={props.values.inches}
                                                            onChangeText={props.handleChange("inches")}
                                                            onBlur={props.handleBlur("inches")}
                                                            error={props.touched.inches && props.errors.inches}
                                                            returnKeyType="next"
                                                            onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                            }}
                                                            keyboardType='numeric'
                                                        />
                                                    </View>
                                                </View>
                                            ) : (
                                                <View style={styles.fieldRow}>
                                                    {props.values.heightUnit === "cm" ? (
                                                        <View style={styles.primaryField}>
                                                            <ValidatedTextInput
                                                                placeholder={i18n.t("placeholder-height")}
                                                                value={props.values.height}
                                                                onChangeText={props.handleChange("height")}
                                                                onBlur={props.handleBlur("height")}
                                                                error={props.touched.height && props.errors.height}
                                                                returnKeyType="next"
                                                                onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                                }}
                                                                keyboardType='numeric'
                                                            />
                                                        </View>
                                                    ) : (
                                                        <View style={styles.primaryFieldRow}>
                                                            <View style={styles.tertiaryField}>
                                                                <ValidatedTextInput
                                                                    placeholder={i18n.t("placeholder-feet")}
                                                                    value={props.values.feet}
                                                                    onChangeText={props.handleChange("feet")}
                                                                    onBlur={props.handleBlur("feet")}
                                                                    error={props.touched.feet && props.errors.feet}
                                                                    returnKeyType="next"
                                                                    onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                                    }}
                                                                    keyboardType='numeric'
                                                                />
                                                            </View>
                                                            <View style={styles.tertiaryField}>
                                                                <ValidatedTextInput
                                                                    placeholder={i18n.t("placeholder-inches")}
                                                                    value={props.values.inches}
                                                                    onChangeText={props.handleChange("inches")}
                                                                    onBlur={props.handleBlur("inches")}
                                                                    error={props.touched.inches && props.errors.inches}
                                                                    returnKeyType="next"
                                                                    onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                                    }}
                                                                    keyboardType='numeric'
                                                                />
                                                            </View>
                                                        </View>
                                                    )}
                                                    <View style={styles.secondaryField}>
                                                        <DropdownField
                                                            onlyPicker
                                                            selectedValue={props.values.heightUnit}
                                                            onValueChange={props.handleChange("heightUnit")}
                                                            items={[{label: 'ft', value: 'ft'}, {label: 'cm', value: 'cm'}]}
                                                        />
                                                    </View>
                                                </View>
                                            )}
                                        </Item>
                                        {props.errors.height && (<ValidationError error={props.errors.height}/>)}
                                        {props.errors.feet && (<ValidationError error={props.errors.feet}/>)}
                                        {props.errors.inches && (<ValidationError error={props.errors.inches}/>)}
                                        {props.errors.heightUnit && (<ValidationError error={props.errors.heightUnit}/>)}
                                    </FieldWrapper>

                                    <FieldWrapper>
                                        <Item stackedLabel style={styles.textItemStyle}>
                                            <Label>{i18n.t("your-weight")}</Label>
                                            {isUSLocale() ? (
                                                <ValidatedTextInput
                                                    placeholder={i18n.t("placeholder-pounds")}
                                                    value={props.values.pounds}
                                                    onChangeText={props.handleChange("pounds")}
                                                    onBlur={props.handleBlur("pounds")}
                                                    error={props.touched.pounds && props.errors.pounds}
                                                    returnKeyType="next"
                                                    onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                    }}
                                                    keyboardType='numeric'
                                                />
                                            ) : (
                                                <View style={styles.fieldRow}>
                                                    {props.values.weightUnit === "kg" ? (
                                                        <View style={styles.primaryField}>
                                                            <ValidatedTextInput
                                                                placeholder={i18n.t("placeholder-weight")}
                                                                value={props.values.weight}
                                                                onChangeText={props.handleChange("weight")}
                                                                onBlur={props.handleBlur("weight")}
                                                                error={props.touched.weight && props.errors.weight}
                                                                returnKeyType="next"
                                                                onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                                }}
                                                                keyboardType='numeric'
                                                            />
                                                        </View>
                                                    ) : (
                                                        <View style={styles.primaryFieldRow}>
                                                            <View style={styles.tertiaryField}>
                                                                <ValidatedTextInput
                                                                    placeholder={i18n.t("placeholder-stones")}
                                                                    value={props.values.stones}
                                                                    onChangeText={props.handleChange("stones")}
                                                                    onBlur={props.handleBlur("stones")}
                                                                    error={props.touched.stones && props.errors.stones}
                                                                    returnKeyType="next"
                                                                    onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                                    }}
                                                                    keyboardType='numeric'
                                                                />
                                                            </View>
                                                            <View style={styles.tertiaryField}>
                                                                <ValidatedTextInput
                                                                    placeholder={i18n.t("placeholder-pounds")}
                                                                    value={props.values.pounds}
                                                                    onChangeText={props.handleChange("pounds")}
                                                                    onBlur={props.handleBlur("pounds")}
                                                                    error={props.touched.pounds && props.errors.pounds}
                                                                    returnKeyType="next"
                                                                    onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                                    }}
                                                                    keyboardType='numeric'
                                                                />
                                                            </View>
                                                        </View>
                                                    )}
                                                    <View style={styles.secondaryField}>
                                                        <Picker mode="dropdown"
                                                                placeholder="weightUnit"
                                                                selectedValue={props.values.weightUnit}
                                                                onValueChange={props.handleChange("weightUnit")}
                                                                iosIcon={<Icon name="arrow-down"/>}
                                                        >
                                                            <Picker.Item label="lbs" value="lbs"/>
                                                            <Picker.Item label="kg" value="kg"/>
                                                        </Picker>
                                                    </View>
                                                </View>
                                            )}
                                        </Item>
                                        {props.errors.weight && (<ValidationError error={props.errors.weight}/>)}
                                        {props.errors.pounds && (<ValidationError error={props.errors.pounds}/>)}
                                        {props.errors.stones && (<ValidationError error={props.errors.stones}/>)}
                                        {props.errors.weightUnit && (<ValidationError error={props.errors.weightUnit}/>)}
                                    </FieldWrapper>

                                    <FieldWrapper>
                                        <Item stackedLabel style={styles.textItemStyle}>
                                            <Label>{i18n.t("your-postcode")}</Label>
                                            <ValidatedTextInput
                                                placeholder={i18n.t("placeholder-postcode")}
                                                value={props.values.postcode}
                                                onChangeText={props.handleChange("postcode")}
                                                onBlur={props.handleBlur("postcode")}
                                                error={props.touched.postcode && props.errors.postcode}
                                                returnKeyType="next"
                                                onSubmitEditing={() => { /* this.passwordComponent.focus(); */
                                                }}
                                                autoCompleteType="postal-code"
                                            />
                                        </Item>
                                        {!!props.errors.postcode && (
                                            <ValidationError error={props.errors.postcode}/>
                                        )}
                                    </FieldWrapper>

                                    <DropdownField
                                        selectedValue={props.values.everExposed}
                                        onValueChange={props.handleChange("everExposed")}
                                        label={i18n.t("have-you-been-exposed")}
                                        items={everExposedItems}
                                        error={props.touched.everExposed && props.errors.everExposed}
                                    />

                                    <FieldWrapper>
                                        <Item stackedLabel>
                                            <Label>{i18n.t("housebound-problems")}</Label>
                                            <Picker mode="dropdown"
                                                    selectedValue={props.values.houseboundProblems}
                                                    onValueChange={props.handleChange("houseboundProblems")}
                                                    iosIcon={<Icon name="arrow-down"/>}
                                                    style={styles.picker}>
                                                <Picker.Item label={i18n.t("picker-no")} value="no"/>
                                                <Picker.Item label={i18n.t("picker-yes")} value="yes"/>
                                            </Picker>
                                        </Item>
                                    </FieldWrapper>

                                    <FieldWrapper>
                                        <Item stackedLabel>
                                            <Label>{i18n.t("needs-help")}</Label>
                                            <Picker mode="dropdown"
                                                    selectedValue={props.values.needsHelp}
                                                    onValueChange={props.handleChange("needsHelp")}
                                                    iosIcon={<Icon name="arrow-down"/>}
                                                    style={styles.picker}>
                                                <Picker.Item label={i18n.t("picker-no")} value="no"/>
                                                <Picker.Item label={i18n.t("picker-yes")} value="yes"/>
                                            </Picker>
                                        </Item>
                                    </FieldWrapper>

                                    <FieldWrapper>
                                        <Item stackedLabel>
                                            <Label>{i18n.t("help-available")}</Label>
                                            <Picker mode="dropdown"
                                                    selectedValue={props.values.helpAvailable}
                                                    onValueChange={props.handleChange("helpAvailable")}
                                                    iosIcon={<Icon name="arrow-down"/>}
                                                    style={styles.picker}>
                                                <Picker.Item label={i18n.t("picker-no")} value="no"/>
                                                <Picker.Item label={i18n.t("picker-yes")} value="yes"/>
                                            </Picker>
                                        </Item>
                                    </FieldWrapper>

                                    <FieldWrapper>
                                        <Item stackedLabel>
                                            <Label>{i18n.t("mobility-aid")}</Label>
                                            <Picker mode="dropdown"
                                                    selectedValue={props.values.mobilityAid}
                                                    onValueChange={props.handleChange("mobilityAid")}
                                                    iosIcon={<Icon name="arrow-down"/>}
                                                    style={styles.picker}>
                                                <Picker.Item label={i18n.t("picker-no")} value="no"/>
                                                <Picker.Item label={i18n.t("picker-yes")} value="yes"/>
                                            </Picker>
                                        </Item>
                                    </FieldWrapper>

                                    <ErrorText>{this.state.errorMessage}</ErrorText>
                                    {!!Object.keys(props.errors).length && (
                                        <ValidationErrors errors={props.errors as string[]}/>
                                    )}

                                    <BrandedButton onPress={props.handleSubmit} enable={this.state.enableSubmit}>
                                        <Text>{i18n.t("next-question")}</Text>
                                    </BrandedButton>

                                </Form>
                            </KeyboardAvoidingView>

                        )
                    }}
                </Formik>
            </Screen>
        )
    }
}

const UKRaceCheckboxes = [
    {label: i18n.t("uk-asian"), value: "uk_asian"},
    {label: i18n.t("uk-black"), value: "uk_black"},
    {label: i18n.t("uk-mixed-white-black"), value: "uk_mixed_white_black"},
    {label: i18n.t("uk-mixed-other"), value: "uk_mixed_other"},
    {label: i18n.t("uk-white"), value: "uk_white"},
    {label: i18n.t("uk-chinese"), value: "uk_chinese"},
    {label: i18n.t("uk-middle-eastern"), value: "uk_middle_eastern"},
    {label: i18n.t("uk-other"), value: "other"},
    {label: i18n.t("prefer-not-to-say"), value: "prefer_not_to_say"},
];

const USRaceCheckboxes = [
    {label: i18n.t("us-indian_native"), value: "us_indian_native"},
    {label: i18n.t("us-asian"), value: "us_asian"},
    {label: i18n.t("us-black"), value: "us_black"},
    {label: i18n.t("us-hawaiian_pacific"), value: "us_hawaiian_pacific"},
    {label: i18n.t("us-white"), value: "us_white"},
    {label: i18n.t("us-other"), value: "other"},
    {label: i18n.t("prefer-not-to-say"), value: "prefer_not_to_say"},
];

const styles = StyleSheet.create({
    fieldRow: {
        flexDirection: "row",
    },

    textItemStyle: {
        borderColor: 'transparent'
    },

    primaryField: {
        flex: 6,
    },

    primaryFieldRow: {
        flex: 6,
        flexDirection: "row",
    },

    tertiaryField: {
        flex: 5,
        marginRight: 8,
    },

    secondaryField: {
        flex: 2,
    },

    picker: {
        // width: '68%',
        width: screenWidth - 16, // TODO: Fix width to something sensible
    },
});
