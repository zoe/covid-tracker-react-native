import {StackNavigationProp} from "@react-navigation/stack";
import React, {Component} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {colors} from "../../../../theme";
import {BrandedButton, ClickableText, RegularBoldText, RegularText} from "../../../components/Text";
import {ScreenParamList} from "../../ScreenParamList";
import {RouteProp} from "@react-navigation/native";

type PropsType = {
    navigation: StackNavigationProp<ScreenParamList, 'TermsOfUseUS'>
    route: RouteProp<ScreenParamList, 'TermsOfUseUS'>;
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.backgroundPrimary,
        paddingHorizontal: 24,
        paddingVertical: 24
    },
    button: {
        marginTop: 20,
    },

});


export default class TermsOfUseUSScreen extends Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }

    viewOnly = this.props.route.params.viewOnly;

    render() {
        return (
            <View style={styles.rootContainer}>
                <ScrollView>
                    <RegularBoldText>Effective date: March 27, 2020{"\n"}</RegularBoldText>
                    <RegularText>

                        Welcome to the COVID-19 Symptom Tracker, provided by Zoe Global Limited (together with its affiliates, “Zoe,” “us,” “we”). Please read on to learn the rules and restrictions that govern your use of our website(s), products, services and applications (the “Services”). By using this app and tracking if you are well or have symptoms, you will be helping medical science and healthcare providers across the country (such as Massachusetts General Hospital) to better understand Coronavirus (COVID-19). The Services are not intended for commercial purposes. If you have any questions, comments, or concerns regarding these terms or the Services, please contact us at:
                            {"\n\n"}
                            For queries please email covidtrackingquestions-us@joinzoe.com and to leave leavecovidtracking-us@joinzoe.com
                            Address: Zoe Global Limited, 164 Westminster Bridge Road, London SE1 7RW, United Kingdom
                            {"\n\n"}

                            These Terms of Use (the “Terms”) are a binding contract between you and us. Your use of the Services in any way means that you agree to all of these Terms, and these Terms will remain in effect while you use the Services. These Terms include the provisions in this document as well as those in our
                            {" "}
                        <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', {viewOnly: this.viewOnly})}>Privacy Policy.</ClickableText>
                        {"\n"}
                    </RegularText>

                    <RegularBoldText>Please read these Terms carefully.{"\n"}</RegularBoldText>
                    <RegularText>
                        They cover important information about Services provided to you.  These Terms include information about future changes to these Terms, limitations of liability, a class action waiver and resolution of disputes by arbitration instead of in court.
                            {"\n\n"}
                            PLEASE NOTE THAT YOUR USE OF AND ACCESS TO OUR SERVICES ARE SUBJECT TO THE FOLLOWING TERMS; IF YOU DO NOT AGREE TO ALL OF THE FOLLOWING, YOU MAY NOT USE OR ACCESS THE SERVICES IN ANY MANNER.
                            {"\n\n"}
                            ARBITRATION NOTICE AND CLASS ACTION WAIVER:
                            {"\n\n"}
                            EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED IN THE ARBITRATION AGREEMENT SECTION BELOW, YOU AGREE THAT DISPUTES BETWEEN YOU AND US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.
                            {"\n\n"}
                    </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            Will these Terms ever change?
                            {"\n"}
                    </RegularBoldText>
                    <RegularText>
                        We are constantly trying to improve our Services, so these Terms may need to change along with our Services. We reserve the right to change the Terms at any time, but if we do, we will place a notice on our site located at https://covid.joinzoe.com/us, post a notice within the app, send you an email, and/or notify you by some other means.
                            {"\n\n"}
                            If you don’t agree with the new Terms, you are free to reject them; unfortunately, that means you will no longer be able to use the Services. If you use the Services in any way after a change to the Terms is effective, that means you agree to all of the changes.
                            {"\n\n"}
                            Except for changes by us as described here, no other amendment or modification of these Terms will be effective unless in writing and signed by both you and us.

                        </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            What about my privacy?
                            {"\n"}
                    </RegularBoldText>
                    <RegularText>
                        Zoe takes the privacy of its users very seriously. For the current Zoe Privacy Policy, please click here.
                        </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            What are the basics of using Zoe?
                            {"\n"}
                    </RegularBoldText>
                    <RegularText>
                        You may be required to sign up for an account using your email. You represent and warrant that you are an individual of legal age to form a binding contract (or if not, you’ve received your parent’s or guardian’s permission to use the Services and have gotten your parent or guardian to agree to these Terms on your behalf). If you’re agreeing to these Terms on behalf of an organization or entity, you represent and warrant that you are authorized to agree to these Terms on that organization’s or entity’s behalf and bind them to these Terms (in which case, the references to “you” and “your” in these Terms, except for in this sentence, refer to that organization or entity).
                            {"\n\n"}
                            You will only use the Services for your own internal, personal, non-commercial use, and not on behalf of or for the benefit of any third party, and only in a manner that complies with all laws that apply to you. If your use of the Services is prohibited by applicable laws, then you aren’t authorized to use the Services. We can’t and won’t be responsible for your using the Services in a way that breaks the law.
                        </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            No Medical Advice; Not for Emergencies
                            {"\n"}
                    </RegularBoldText>
                    <RegularText>
                        Zoe does not offer medical advice or diagnoses, or engage in the practice of medicine. Our Services are not intended to be a substitute for professional medical advice, diagnosis, or treatment and are offered for informational and communicative purposes only. The Services are not intended to be, and must not be taken to be, the practice of medicine, nursing, pharmacy or other healthcare advice by Zoe.
                            {"\n\n"}

                            The Services are not meant to diagnose or treat any conditions – only your medical professional can determine the right course of treatment for you and determine what is safe, appropriate and effective based on your needs. Reliance on any information provided by Zoe or in connection with the Services is solely at your own risk. You are solely responsible for any decisions or actions you take based on the information and materials available through the Services.
                            Healthcare providers and patients should always obtain applicable diagnostic information from appropriate trusted sources. Healthcare providers should never withhold professional medical advice or delay in providing it because of something they have read in connection with our Services.

                            {"\n\n"}
                            THE SERVICES SHOULD NEVER BE USED AS A SUBSTITUTE FOR EMERGENCY CARE. IF YOU HAVE A MEDICAL OR MENTAL HEALTH EMERGENCY, ARE THINKING ABOUT SUICIDE OR TAKING ACTIONS THAT MAY CAUSE HARM TO YOU OR TO OTHERS, YOU SHOULD SEEK EMERGENCY TREATMENT AT THE NEAREST EMERGENCY ROOM OR DIAL 911.
                            {"\n\n"}
                            You will only use the Services for your own internal, personal, non-commercial use, and not on behalf of or for the benefit of any third party, and only in a manner that complies with all laws that apply to you. If your use of the Services is prohibited by applicable laws, then you aren’t authorized to use the Services. We can’t and won’t be responsible for your using the Services in a way that breaks the law.
                    </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            Not a Medical Device
                            {"\n"}
                    </RegularBoldText>
                    <RegularText>
                        The Services are not medical devices and are not intended to be used as medical devices. Furthermore, the Services are neither regulated nor approved by the U.S. Food and Drug Administration, and are not designed to detect or prevent causes of any medical condition. The Services are not a substitute for medical care or adult supervision. You acknowledge, understand and agree that your use of the Services is entirely at your own risk.
                        </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            Will Zoe ever change the Services?
                            {"\n"}
                    </RegularBoldText>

                    <RegularText>
                        We’re always trying to improve our Services, so they may change over time. We may suspend or discontinue any part of the Services, or we may introduce new features or impose limits on certain features or restrict access to parts or all of the Services.
                    </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            What if I want to stop using the Services?
                            {"\n"}
                    </RegularBoldText>

                    <RegularText>
                        You’re free to do that at any time; please refer to our Privacy Policy, as well as the licenses above, to understand how we treat information you provide to us after you have stopped using our Services. Zoe is also free to terminate (or suspend access to) your use of the Services for any reason in our discretion, including your breach of these Terms. Zoe has the sole right to decide whether you are in violation of any of the restrictions set forth in these Terms.
                            {"\n\n"}
                            Provisions that, by their nature, should survive termination of these Terms shall survive termination. By way of example, all of the following will survive termination: any limitations on our liability, any terms regarding ownership or intellectual property rights, and terms regarding disputes between us, including without limitation the arbitration agreement.
                        </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            Mobile Applications
                            {"\n"}
                    </RegularBoldText>

                    <RegularText>
                        You acknowledge and agree that the availability of our mobile application is dependent on the third party stores from which you download the application, e.g., the App Store from Apple or the Android app market from Google (each an “App Store”). Each App Store may have its own terms and conditions to which you must agree before downloading mobile applications from such store, including the specific terms relating to Apple App Store set forth below. You agree to comply with, and your license to use our application is conditioned upon your compliance with, such App Store terms and conditions. To the extent such other terms and conditions from such App Store are less restrictive than, or otherwise conflict with, the terms and conditions of these Terms of Use, the more restrictive or conflicting terms and conditions in these Terms of Use apply.
                        </RegularText>

                    <RegularBoldText>
                        {"\n"}
                            I use the Zoe App available via the Apple App Store – should I know anything about that?
                            {"\n"}
                    </RegularBoldText>

                    <RegularText>

                        A. Both you and Zoe acknowledge that the Terms are concluded between you and Zoe only, and not with Apple, and that Apple is not responsible for the Application;
                            {"\n\n"}
                            B. The Application is licensed to you on a limited, non-exclusive, non-transferrable, non-sublicensable basis, solely to be used in connection with the Services for your private, personal, non-commercial use, subject to all the terms and conditions of these Terms as they are applicable to the Services;
                            {"\n\n"}
                            C. You will only use the Application in connection with an Apple device that you own or control;
                            {"\n\n"}
                            D. You acknowledge and agree that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the Application;
                            {"\n\n"}
                            E.  In the event of any failure of the Application to conform to any applicable warranty, including those implied by law, you may notify Apple of such failure; upon notification, Apple’s sole warranty obligation to you will be to refund to you the purchase price, if any, of the Application
                            {"\n\n"}
                            F. You acknowledge and agree that Zoe, and not Apple, is responsible for addressing any claims you or any third party may have in relation to the Application;
                            {"\n\n"}
                            G. You acknowledge and agree that, in the event of any third-party claim that the Application or your possession and use of the Application infringes that third party’s intellectual property rights, Zoe, and not Apple, will be responsible for the investigation, defense, settlement and discharge of any such infringement claim;
                            {"\n\n"}
                            H. You represent and warrant that you are not located in a country subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country, and that you are not listed on any U.S. Government list of prohibited or restricted parties;
                            {"\n\n"}
                            I. Both you and Zoe acknowledge and agree that, in your use of the Application, you will comply with any applicable third-party terms of agreement which may affect or be affected by such use; and
                            {"\n\n"}
                            J. Both you and Zoe acknowledge and agree that Apple and Apple’s subsidiaries are third-party beneficiaries of these Terms, and that upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as the third-party beneficiary hereof.

                        </RegularText>

                    <RegularBoldText>
                        {"\n"}
                        What else do I need to know?
                            {"\n"}
                    </RegularBoldText>
                    <RegularText>
                        Warranty Disclaimer.
                            {"\n\n"}
                        Zoe and its licensors, suppliers, partners, parent, subsidiaries or affiliated entities, and each of their respective officers, directors, members, employees, consultants, contract employees, representatives and agents, and each of their respective successors and assigns (Zoe and all such parties together, the “Zoe Parties”) make no representations or warranties concerning the Services, and the Zoe Parties will not be responsible or liable for the accuracy, copyright compliance, legality, or decency of material contained in or accessed through the Services or any claims, actions, suits procedures, costs, expenses, damages or liabilities arising out of use of, or in any way related to your participation in, the Services. THE SERVICES ARE PROVIDED BY ZOE (AND ITS LICENSORS AND SUPPLIERS) ON AN “AS-IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR THAT USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE. SOME STATES DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.
                            {"\n\n"}
                        Limitation of Liability.
                            {"\n\n"}
TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES AND UNDER NO LEGAL THEORY (INCLUDING, WITHOUT LIMITATION, TORT, CONTRACT, STRICT LIABILITY, OR OTHERWISE) SHALL ANY OF THE ZOE PARTIES BE LIABLE TO YOU OR TO ANY OTHER PERSON FOR (A) ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING DAMAGES FOR LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, ACCURACY OF RESULTS, OR COMPUTER FAILURE OR MALFUNCTION, (B) ANY SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY, (C) ANY AMOUNT, IN THE AGGREGATE, IN EXCESS OF ONE-HUNDRED ($100) DOLLARS OR (D) ANY MATTER BEYOND OUR REASONABLE CONTROL. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL OR CERTAIN OTHER DAMAGES, SO THE ABOVE LIMITATION AND EXCLUSIONS MAY NOT APPLY TO YOU.
                            {"\n\n"}
Assignment.
                            {"\n\n"}
You may not assign, delegate or transfer these Terms or your rights or obligations hereunder, or your Services account, in any way (by operation of law or otherwise) without Zoe’s prior written consent. We may transfer, assign, or delegate these Terms and our rights and obligations without consent.
                            {"\n\n"}
Choice of Law.
                            {"\n\n"}
These Terms are governed by and will be construed under the Federal Arbitration Act, applicable federal law, and the laws of the State of Massachusetts, without regard to the conflicts of laws provisions thereof.
                            {"\n\n"}
Arbitration Agreement.
                            {"\n\n"}
Please read the following ARBITRATION AGREEMENT carefully because it requires you to arbitrate certain disputes and claims with Zoe and limits the manner in which you can seek relief from Zoe. Both you and Zoe acknowledge and agree that for the purposes of any dispute arising out of or relating to the subject matter of these Terms, Zoe’s officers, directors, employees and independent contractors (“Personnel”) are third-party beneficiaries of these Terms, and that upon your acceptance of these Terms, Personnel will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as the third-party beneficiary hereof.
                            {"\n\n"}
(a) Arbitration Rules; Applicability of Arbitration Agreement. The parties shall use their best efforts to settle any dispute, claim, question, or disagreement arising out of or relating to the subject matter of these Terms directly through good-faith negotiations, which shall be a precondition to either party initiating arbitration. If such negotiations do not resolve the dispute, it shall be finally settled by binding arbitration in Boston, Massachusetts. The arbitration will proceed in the English language, in accordance with the JAMS Streamlined Arbitration Rules and Procedures (the “Rules”) then in effect, by one commercial arbitrator with substantial experience in resolving intellectual property and commercial contract disputes. The arbitrator shall be selected from the appropriate list of JAMS arbitrators in accordance with such Rules. Judgment upon the award rendered by such arbitrator may be entered in any court of competent jurisdiction.
                            {"\n\n"}
(b) Costs of Arbitration. The Rules will govern payment of all arbitration fees. Zoe will pay all arbitration fees for claims less than seventy-five thousand ($75,000) dollars. Zoe will not seek its attorneys’ fees and costs in arbitration unless the arbitrator determines that your claim is frivolous.
                            {"\n\n"}
(c) Small Claims Court; Infringement. Either you or Zoe may assert claims, if they qualify, in small claims court in Boston, Massachusetts or any United States county where you live or work. Furthermore, notwithstanding the foregoing obligation to arbitrate disputes, each party shall have the right to pursue injunctive or other equitable relief at any time, from any court of competent jurisdiction, to prevent the actual or threatened infringement, misappropriation or violation of a party's copyrights, trademarks, trade secrets, patents or other intellectual property rights.
                            {"\n\n"}
(d) Waiver of Jury Trial. YOU AND ZOE WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR JURY. You and Zoe are instead choosing to have claims and disputes resolved by arbitration. Arbitration procedures are typically more limited, more efficient, and less costly than rules applicable in court and are subject to very limited review by a court. In any litigation between you and Zoe over whether to vacate or enforce an arbitration award, YOU AND ZOE WAIVE ALL RIGHTS TO A JURY TRIAL, and elect instead to have the dispute be resolved by a judge.
                            {"\n\n"}
(e) Waiver of Class or Consolidated Actions. ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS. CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. If however, this waiver of class or consolidated actions is deemed invalid or unenforceable, neither you nor Zoe is entitled to arbitration; instead all claims and disputes will be resolved in a court as set forth in (g) below.
                            {"\n\n"}
(f) Opt-out. You have the right to opt out of the provisions of this Section by sending written notice of your decision to opt out to the following address: Zoe Global, 192 South Street, Suite 100, Boston, MA 02111, postmarked within thirty (30) days of first accepting these Terms. You must include (i) your name and residence address, (ii) the email address and/or telephone number associated with your account, and (iii) a clear statement that you want to opt out of these Terms’ arbitration agreement.
                            {"\n\n"}
(g) Exclusive Venue. If you send the opt-out notice in (f), and/or in any circumstances where the foregoing arbitration agreement permits either you or Zoe to litigate any dispute arising out of or relating to the subject matter of these Terms in court, then the foregoing arbitration agreement will not apply to either party, and both you and Zoe agree that any judicial proceeding (other than small claims actions) will be brought in the state or federal courts located in, respectively, Boston, Massachusetts, or the federal district in which that county falls.
                            {"\n\n"}
(h) Severability. If the prohibition against class actions and other claims brought on behalf of third parties contained above is found to be unenforceable, then all of the preceding language in this Arbitration Agreement section will be null and void. This arbitration agreement will survive the termination of your relationship with Zoe.
                            {"\n\n"}
Miscellaneous.
                            {"\n\n"}The failure of either you or us to exercise, in any way, any right herein shall not be deemed a waiver of any further rights hereunder. If any provision of these Terms are found to be unenforceable or invalid, that provision will be limited or eliminated, to the minimum extent necessary, so that these Terms shall otherwise remain in full force and effect and enforceable. You and Zoe agree that these Terms are the complete and exclusive statement of the mutual understanding between you and Zoe, and that these Terms supersede and cancel all previous written and oral agreements, communications and other understandings relating to the subject matter of these Terms.
                            {"\n"}
Except as expressly set forth in the sections above regarding the Apple Application and the arbitration agreement, you and Zoe agree there are no third-party beneficiaries intended under these Terms.

                        </RegularText>
                </ScrollView>

                <BrandedButton style={styles.button} onPress={() => this.props.navigation.goBack()}>Back</BrandedButton>

            </View>
        )
    }

}