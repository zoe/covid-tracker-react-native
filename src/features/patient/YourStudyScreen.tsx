import React, { Component } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import Screen, { FieldWrapper, Header, isAndroid, ProgressBlock } from "../../components/Screen";
import { BrandedButton, ErrorText, HeaderText, RegularText } from "../../components/Text";
import { Form, Item, Label } from "native-base";
import ProgressStatus from "../../components/ProgressStatus";
import { Formik } from "formik";
import * as Yup from "yup";
import i18n from "../../locale/i18n"
import UserService, { isGBLocale, isUSLocale } from "../../core/user/UserService";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScreenParamList } from "../ScreenParamList";
import { RouteProp } from "@react-navigation/native";
import { PatientInfosRequest } from "../../core/user/dto/UserAPIContracts";
import { CheckboxItem, CheckboxList } from "../../components/Checkbox";
import { ValidationErrors } from "../../components/ValidationError";
import { AsyncStorageService } from "../../core/AsyncStorageService";
import DropdownField from "../../components/DropdownField";
import { GenericTextField } from "../../components/GenericTextField";

type YourStudyProps = {
    navigation: StackNavigationProp<ScreenParamList, 'YourStudy'>
    route: RouteProp<ScreenParamList, 'YourStudy'>
}

const initialFormValues = {
    clinicalStudyNames: '',
    clinicalStudyContacts: '',
    clinicalStudyInstitutions: '',
    clinicalStudyNctIds: '',
};

interface YourStudyData {
    clinicalStudyNames: string,
    clinicalStudyContacts: string,
    clinicalStudyInstitutions: string,
    clinicalStudyNctIds: string,
}

type State = {
    isTwinsUkCohort: boolean;
    isUkBiobank: boolean;
    isStThomasTrust: boolean;

    isNurseHealthStudies: boolean;
    isMassGeneral: boolean;
    isGrowingUpTodayStudy: boolean;
    isStanfordNutritionStudy: boolean;
    isMultiEthnicCohortStudy: boolean;
    isPredict2Study: boolean;
    isAmericanCancer3: boolean;
    isHarvardHealthProfessional: boolean;
    isCaliforniaTeacher: boolean;
    isSister: boolean;
    isAgriculturalHealth: boolean;
    isGulf: boolean;
    isAspreeXt: boolean;

    errorMessage: string;
}

const initialState: State = {
    isTwinsUkCohort: false,
    isUkBiobank: false,
    isStThomasTrust: false,

    isNurseHealthStudies: false,
    isMassGeneral: false,
    isGrowingUpTodayStudy: false,
    isStanfordNutritionStudy: false,
    isMultiEthnicCohortStudy: false,
    isPredict2Study: false,
    isAmericanCancer3: false,
    isHarvardHealthProfessional: false,
    isCaliforniaTeacher: false,
    isSister: false,
    isAgriculturalHealth: false,
    isGulf: false,
    isAspreeXt: false,

    errorMessage: ""
};


export default class YourStudyScreen extends Component<YourStudyProps, State> {

    registerSchema = Yup.object().shape({
        isTwinsUkCohort: Yup.boolean(),
        isUkBiobank: Yup.boolean(),
        isStThomasTrust: Yup.boolean(),

        isNurseHealthStudies: Yup.boolean(),
        isMassGeneral: Yup.boolean(),
        isGrowingUpTodayStudy: Yup.boolean(),
        isStanfordNutritionStudy: Yup.boolean(),
        isMultiEthnicCohortStudy: Yup.boolean(),
        isPredict2Study: Yup.boolean(),
        isAmericanCancer3: Yup.boolean(),
        isHarvardHealthProfessional: Yup.boolean(),
        isCaliforniaTeacher: Yup.boolean(),
        isSister: Yup.boolean(),
        isAgriculturalHealth: Yup.boolean(),
        isGulf: Yup.boolean(),
        isAspreeXt: Yup.boolean(),

        clinicalStudyNames: Yup.string(),
        clinicalStudyContact: Yup.string(),
        clinicalStudyInstitution: Yup.string(),
        clinicalStudyNctId: Yup.string(),
    });

    constructor(props: YourStudyProps) {
        super(props);
        this.state = initialState;
    }

    handleSubmit(formData: YourStudyData) {
        const patientId = this.props.route.params.patientId;
        const userService = new UserService();
        var infos = this.createPatientInfos(formData);

        userService.updatePatient(patientId, infos)
            .then(response => {
                this.props.navigation.navigate('YourWork', {patientId: patientId})
            })
            .catch(err => this.setState({errorMessage: i18n.t("something-went-wrong")}));

    }

    render() {

        return (
            <Screen>
                <Header>
                    <HeaderText>{isGBLocale() ? 'Population studies' : isUSLocale() ? 'Your clinical study' : ''}</HeaderText>
                </Header>

                <ProgressBlock>
                    <ProgressStatus step={1} maxSteps={6}/>
                </ProgressBlock>

                <Formik
                    initialValues={initialFormValues}
                    validationSchema={this.registerSchema}
                    onSubmit={(values: YourStudyData) => this.handleSubmit(values)}
                >
                    {props => {
                        return (
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
                                <Form>


                                    {/* UK-only cohorts */}
                                    {isGBLocale() && (
                                        <FieldWrapper>
                                            <Item stackedLabel style={styles.textItemStyle}>
                                                <Label>{i18n.t("label-cohort")}</Label>
                                                <CheckboxList>
                                                    <CheckboxItem
                                                        value={this.state.isTwinsUkCohort}
                                                        onChange={(value: boolean) => this.setState({isTwinsUkCohort: value})}
                                                    >Twins UK</CheckboxItem>
                                                    <CheckboxItem
                                                        value={this.state.isUkBiobank}
                                                        onChange={(value: boolean) => this.setState({isUkBiobank: value})}
                                                    >UK Biobank</CheckboxItem>
                                                    <CheckboxItem
                                                        value={this.state.isStThomasTrust}
                                                        onChange={(value: boolean) => this.setState({isStThomasTrust: value})}
                                                    >Guys &amp; St Thomas' Hospital Trust</CheckboxItem>
                                                </CheckboxList>
                                            </Item>
                                        </FieldWrapper>
                                    )}

                                    {/* US-only cohorts */}
                                    {isUSLocale() && (
                                        <>
                                            <FieldWrapper>
                                                <Item stackedLabel style={styles.textItemStyle}>
                                                    <Label>{i18n.t("label-cohort")}</Label>
                                                    <CheckboxList>
                                                        <CheckboxItem
                                                            value={this.state.isNurseHealthStudies}
                                                            onChange={(value: boolean) => this.setState({isNurseHealthStudies: value})}
                                                        >Harvard Nurses' Health Studies</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isGrowingUpTodayStudy}
                                                            onChange={(value: boolean) => this.setState({isGrowingUpTodayStudy: value})}
                                                        >Harvard Growing Up Today Study</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isHarvardHealthProfessional}
                                                            onChange={(value: boolean) => this.setState({isHarvardHealthProfessional: value})}
                                                        >Harvard Health Professionals Follow Up Study</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isMassGeneral}
                                                            onChange={(value: boolean) => this.setState({isMassGeneral: value})}
                                                        >Mass General / Brigham</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isStanfordNutritionStudy}
                                                            onChange={(value: boolean) => this.setState({isStanfordNutritionStudy: value})}
                                                        >Stanford Nutrition Studies</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isMultiEthnicCohortStudy}
                                                            onChange={(value: boolean) => this.setState({isMultiEthnicCohortStudy: value})}
                                                        >Multiethnic Cohort Study</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isPredict2Study}
                                                            onChange={(value: boolean) => this.setState({isPredict2Study: value})}
                                                        >PREDICT 2</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isAmericanCancer3}
                                                            onChange={(value: boolean) => this.setState({isAmericanCancer3: value})}
                                                        >American Cancer Society Cancer Prevention
                                                            Study-3</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isCaliforniaTeacher}
                                                            onChange={(value: boolean) => this.setState({isCaliforniaTeacher: value})}
                                                        >UCSD/COH California Teachers Study</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isSister}
                                                            onChange={(value: boolean) => this.setState({isSister: value})}
                                                        >The Sister Study</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isAgriculturalHealth}
                                                            onChange={(value: boolean) => this.setState({isAgriculturalHealth: value})}
                                                        >The Agricultural Health Study (AHS)</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isGulf}
                                                            onChange={(value: boolean) => this.setState({isGulf: value})}
                                                        >The GuLF Study</CheckboxItem>
                                                        <CheckboxItem
                                                            value={this.state.isAspreeXt}
                                                            onChange={(value: boolean) => this.setState({isAspreeXt: value})}
                                                        >ASPREE-XT</CheckboxItem>
                                                    </CheckboxList>
                                                </Item>
                                            </FieldWrapper>

                                                {/*<RegularText>If not</RegularText>*/}

                                            <GenericTextField
                                                formikProps={props}
                                                label="Add the names of your studies"
                                                name="clinicalStudyNames"
                                                placeholder={'Optional'}
                                            />
                                            <>
                                                <GenericTextField
                                                    formikProps={props}
                                                    label="If you know it, what is the name of your contact at the study (investigator, physician, study coordinator, etc.)?"
                                                    name="clinicalStudyContacts"
                                                    placeholder={'Optional'}
                                                />
                                                <GenericTextField
                                                    formikProps={props}
                                                    label="If you know it, what university or hospital runs this study?"
                                                    name="clinicalStudyInstitutions"
                                                    placeholder={'Optional'}
                                                />


                                                <GenericTextField
                                                    formikProps={props}
                                                    label="What is the NCT number (if you know it)?"
                                                    name="clinicalStudyNctIds"
                                                    placeholder={'Optional'}
                                                />
                                            </>
                                        </>
                                    )}

                                    <ErrorText>{this.state.errorMessage}</ErrorText>
                                    {!!Object.keys(props.errors).length && (
                                        <ValidationErrors errors={props.errors}/>
                                    )}

                                    <BrandedButton
                                        onPress={props.handleSubmit}>{i18n.t("next-question")}</BrandedButton>

                                </Form>
                            </KeyboardAvoidingView>

                        )
                    }}
                </Formik>


            </Screen>
        )
    }

    private createPatientInfos(formData: YourStudyData) {
        var infos = {} as Partial<PatientInfosRequest>;

        if (isGBLocale()) {
            infos = {
                ...infos,
                is_in_uk_twins: this.state.isTwinsUkCohort,
                is_in_uk_biobank: this.state.isUkBiobank,
                is_in_uk_guys_trust: this.state.isStThomasTrust,
            }
        }

        if (isUSLocale()) {
            infos = {
                ...infos,
                is_in_us_nurses_study: this.state.isNurseHealthStudies,
                is_in_us_mass_general_brigham: this.state.isMassGeneral,
                is_in_us_growing_up_today: this.state.isGrowingUpTodayStudy,
                is_in_us_stanford_nutrition: this.state.isStanfordNutritionStudy,
                is_in_us_multiethnic_cohort: this.state.isMultiEthnicCohortStudy,
                is_in_us_predict2: this.state.isPredict2Study,
                is_in_us_american_cancer_society_cancer_prevention_study_3: this.state.isAmericanCancer3,
                is_in_us_harvard_health_professionals: this.state.isHarvardHealthProfessional,
                is_in_us_california_teachers: this.state.isCaliforniaTeacher,
                is_in_us_sister: this.state.isSister,
                is_in_us_agricultural_health: this.state.isAgriculturalHealth,
                is_in_us_gulf: this.state.isGulf,
                is_in_us_aspree_xt: this.state.isAspreeXt,

                ...(formData.clinicalStudyNames && {clinical_study_names: formData.clinicalStudyNames}),
                ...(formData.clinicalStudyContacts && {clinical_study_contacts: formData.clinicalStudyContacts}),
                ...(formData.clinicalStudyInstitutions && {clinical_study_institutions: formData.clinicalStudyInstitutions}),
                ...(formData.clinicalStudyNctIds && {clinical_study_nct_ids: formData.clinicalStudyNctIds}),
            }


        }

        return infos;
    }
}


const styles = StyleSheet.create({
    textItemStyle: {
        borderColor: 'transparent',
    },
});