import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { colors } from '../../../theme';
import { CheckboxItem, CheckboxList } from '../../components/Checkbox';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '../../components/Text';
import UserService, { isGBCountry, isSECountry, isUSCountry } from '../../core/user/UserService';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { HeaderText, SimpleTextBlock } from './LegalComponents';
import {
  consentVersionSE,
  consentVersionUK,
  consentVersionUS,
  privacyPolicyVersionSE,
  privacyPolicyVersionUK,
  privacyPolicyVersionUS,
} from './constants';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
};

interface TermsState {
  swedenParticipateChecked: boolean;
  swedenProcessingChecked: boolean;
  swedenAgreeZoe: boolean;
  processingChecked: boolean;
  termsOfUseChecked: boolean;
}

export class ConsentScreen extends Component<PropsType, TermsState> {
  private userService = new UserService();

  constructor(props: PropsType) {
    super(props);
    this.state = {
      swedenParticipateChecked: false,
      swedenProcessingChecked: false,
      swedenAgreeZoe: false,
      processingChecked: false,
      termsOfUseChecked: false,
    };
  }

  componentDidMount(): void {
    if (isSECountry()) this.props.navigation.setOptions({ title: 'Information till studiedeltagare' });
  }

  viewOnly = this.props.route.params.viewOnly;

  handleToggle = (label: string) => {
    if (label in this.state) {
      // @ts-ignore
      const val: any = this.state[label];
      this.setState((prevState) => ({
        ...prevState,
        [label]: !val,
      }));
    }
  };

  handleUSAgreeClicked = async () => {
    if (this.state.processingChecked && this.state.termsOfUseChecked) {
      await this.userService.setConsentSigned('US', consentVersionUS, privacyPolicyVersionUS);
      this.props.navigation.navigate('Register');
    }
  };

  handleUKAgreeClicked = async () => {
    await this.userService.setConsentSigned('UK', consentVersionUK, privacyPolicyVersionUK);
    this.props.navigation.navigate('Register');
  };

  handleSVAgreeClicked = async () => {
    await this.userService.setConsentSigned('SE', consentVersionSE, privacyPolicyVersionSE);
    this.props.navigation.navigate('Register');
  };

  handleAgreeClicked = async () => {
    if (isUSCountry()) this.handleUSAgreeClicked();
    if (isGBCountry()) return this.handleUKAgreeClicked();
    if (isSECountry()) return this.handleSVAgreeClicked();
  };

  canAgree = () => {
    if (isUSCountry()) return this.state.processingChecked && this.state.termsOfUseChecked;
    if (isGBCountry()) return true;
    if (isSECountry())
      return this.state.swedenParticipateChecked && this.state.swedenProcessingChecked && this.state.swedenAgreeZoe;
    return false;
  };

  renderUSConsent = () => {
    return (
      <ScrollView>
        <RegularText>
          If you are in an existing research or clinical study (e.g. Nurses’ Health Studies) and you want your data to
          be shared with investigators on that study,{' '}
          <ClickableText onPress={() => this.props.navigation.navigate('NursesConsentUS', { viewOnly: this.viewOnly })}>
            click here
          </ClickableText>
          {'\n'}
        </RegularText>

        <RegularBoldText>Purpose{'\n'}</RegularBoldText>
        <RegularText>
          By using this app and tracking if you are well or have symptoms, you will be helping medical science and
          healthcare providers across the country (such as Massachusetts General Hospital) to better understand
          Coronavirus (COVID-19).
          {'\n\n'}
          This app allows you to help others, but does not give health advice. If you need health advice please visit
          the CDC Coronavirus website{' '}
          <ClickableText onPress={() => this.openUrl('https://www.cdc.gov/coronavirus/2019-ncov/index.html')}>
            https://www.cdc.gov/coronavirus/2019-ncov/index.html
          </ClickableText>
          {'\n'}
        </RegularText>

        <RegularBoldText>Information sharing{'\n'}</RegularBoldText>
        <RegularText>
          This app is designed by doctors and scientists at Massachusetts General Hospital, Harvard School of Public
          Health, Stanford University, King's College London and Zoe Global Limited, a health technology company. They
          have access to the information you enter, which may also be shared with hospitals listed in our privacy
          notice.
          {'\n\n'}
          No information you share will be used for commercial purposes. An anonymous code will be used to replace your
          personal details when sharing information with researchers beyond those mentioned above.
        </RegularText>

        <RegularBoldText>
          {'\n'}
          Your consent
          {'\n'}
        </RegularBoldText>
        <RegularText>
          By checking the box below, you consent to our using the personal information we collect through your use of
          this app in the way we have described.
          {'\n\n'}
          For more information about how we use and share personal information about you, please see our{' '}
          <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
            privacy policy
          </ClickableText>
          .{'\n\n'}
          You may withdraw your consent at any time by emailing{' '}
          <RegularBoldText>leavecovidtracking-us@joinzoe.com</RegularBoldText>
          {'\n\n'}
          Any questions may be sent to <RegularBoldText>covidtrackingquestions-us@joinzoe.com</RegularBoldText>
        </RegularText>

        {!this.viewOnly && (
          <CheckboxList>
            <CheckboxItem value={this.state.processingChecked} onChange={() => this.handleToggle('processingChecked')}>
              I consent to the processing of my personal data (including without limitation data I provide relating to
              my health) as set forth in this consent and in the{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
                Privacy Policy
              </ClickableText>
              .
            </CheckboxItem>
            <CheckboxItem value={this.state.termsOfUseChecked} onChange={() => this.handleToggle('termsOfUseChecked')}>
              I have read and accept Zoe Global’s{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('TermsOfUseUS', { viewOnly: this.viewOnly })}>
                Terms of Use
              </ClickableText>{' '}
              and{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('PrivacyPolicyUS', { viewOnly: this.viewOnly })}>
                Privacy Policy
              </ClickableText>
              .
            </CheckboxItem>
          </CheckboxList>
        )}
      </ScrollView>
    );
  };

  renderUKConsent = () => {
    return (
      <ScrollView>
        <RegularText>
          By using this app and tracking if you are well or have symptoms, you will be helping medical science and the
          NHS to better understand Coronavirus (COVID-19).
          {'\n\n'}
          This app allows you to help others, but does not give health advice. If you need health advice please visit
          the NHS website:{' '}
          <ClickableText onPress={() => this.openUrl('https://www.nhs.uk/conditions/coronavirus-covid-19/')}>
            https://www.nhs.uk/conditions/coronavirus-covid-19/
          </ClickableText>
          {'\n'}
        </RegularText>

        <RegularBoldText>Information sharing{'\n'}</RegularBoldText>
        <RegularText>
          This app is designed by doctors and scientists at Kings’ College London, Guys and St Thomas’ Hospitals and Zoe
          Global Limited, a health technology company. They have access to the information you enter, which may also be
          shared with the NHS and other medical researchers as outlined in our{' '}
          <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUK', { viewOnly: this.viewOnly })}>
            privacy notice
          </ClickableText>
          .{'\n\n'}
          {'\n'}
          No information you share will be used for commercial purposes. An anonymous code will be used to replace your
          personal details when sharing information with other researchers.
        </RegularText>

        <RegularBoldText>
          {'\n'}
          Your consent
          {'\n'}
        </RegularBoldText>
        <RegularText>
          By clicking below, you consent to our using the personal information we collect through your use of this app
          in the way we have described.
          {'\n\n'}
          We may share your data with medical research collaborators outside the UK (eg Harvard Medical School). Before
          sharing any of your data with any medical researcher outside of the UK, we will remove your name, phone number
          if provided, email address and anonymise your full postcode by removing the inward code (last three
          characters) or mapping it to an LSOA code to protect your privacy. By clicking below, you consent to us
          sharing your personal information on this basis.
          {'\n\n'}
          We adhere to the General Data Protection Regulation ‘GDPR’. For more information about how we use and share
          personal information about you, please see our{' '}
          <ClickableText onPress={() => this.props.navigation.navigate('PrivacyPolicyUK', { viewOnly: this.viewOnly })}>
            privacy notice
          </ClickableText>
          .{'\n\n'}
          You may withdraw your consent at any time by emailing{' '}
          <RegularBoldText>leavecovidtracking@joinzoe.com</RegularBoldText>
          {'\n\n'}
          Any questions may be sent to <RegularBoldText>covidtrackingquestions@joinzoe.com</RegularBoldText>
        </RegularText>
      </ScrollView>
    );
  };

  renderSwedishConsent = () => {
    return (
      <ScrollView>
        <RegularText>
          Vi vill fråga dig om du vill delta i ett forskningsprojekt som handlar om covid-19. I det här dokumentet får
          du information om projektet och om vad det innebär att delta.
          {'\n\n'}
          Projektets titel är ”Nationellt initiativ för att via en app i realtid kartlägga samhällspridningen av
          covid-19 i Sverige samt riskfaktorer för att drabbas av en allvarlig sjukdomsbild vid covid-19”, och
          forskningen är godkänd av Etikprövningsmyndigheten i Sverige (DNR 2020-01803).
          {'\n\n'}
        </RegularText>

        <HeaderText text="Vad är det för projekt och varför vill ni att jag ska delta?" />
        <SimpleTextBlock
          text={[
            'Syftet med det här projektet är att öka kunskapen om sjukdomen covid-19, som orsakas av coronaviruset SARS-CoV-2. Vårt mål är att kartlägga den snabba smittspridningen av covid-19 i landet, och också att undersöka riskfaktorer för att drabbas av en mer allvarlig sjukdomsbild.',
            'I det här projektet kommer vi att använda oss av en app: ”Covid-19 Symptom Study” som är gratis för användarna. I appen kan studiedeltagare/app-användare anonymt fylla i en kort hälsodeklaration och om huruvida de har några symptom som skulle kunna tyda på att de har drabbats av covid-19, t.ex. feber eller hosta. Studiedeltagare som arbetar inom hälso- och sjukvård kommer också att kunna uppge om de exponerats för smitta på sitt arbete. Data som samlas in från alla app-användare kan sedan analyseras på gruppnivå för att undersöka hur och var covid-19 sprids i landet. Vi kommer också att kunna se vad som händer med smittspridningen på sikt, och hur olika delar av landet påverkas av nationella restriktioner gällande t.ex. resande och antal personer som får delta i allmänna sammankomster. Utifrån informationen i hälsodeklarationen kan vi också analysera vilka som verkar ha stor risk att drabbas av svårare symptom. Vi kommer att samla in data så länge som covid-19 sprids i Sverige.',
            'Forskningshuvudman för projektet är Lunds universitet. Med forskningshuvudman menas den organisation som är ansvarig för studien.',
          ]}
        />

        <HeaderText text={'Hur går studien till?\n'} />
        <SimpleTextBlock
          text={[
            'Om du väljer att delta i studien kan du börja använda appen Covid-19 Symptom Study. Du kommer att då att först kunna svara på en kort hälsodeklaration. Vi kommer att fråga efter ditt postnummer för att kunna veta ditt ungefärliga geografiska läge i Sverige (appen kommer dock inte att samla in någon GPS data). Vi kommer också att fråga dig om du arbetar inom hälso- och sjukvård, och om du gör det kommer vi att fråga om du blivit exponerad för covid-19 på din arbetsplats och i så fall om du haft tillgång till skyddsutrustning. Du väljer själv hur många frågor du svarar på. Att svara på alla frågor tar ungefär 10-15 minuter.',
            'Sedan kommer du att kunna svara på frågor om huruvida du har symptom av den typ som många får vid covid-19, dvs tex feber, hosta, andningssvårigheter och uttalad trötthet. Du kommer också att kunna fylla i om du har behövt uppsöka sjukvården för dina symptom, och om du blivit testad för covid-19. Du som arbetar inom sjukvården kan också uppdatera om du nyligen blivit exponerad för misstänkt covid-19 på din arbetsplats. Du kommer att kunna uppdatera de här frågorna i appen dagligen, eller så ofta eller sällan du vill, det tar ungefär 1 minut per gång.',
            'Du är anonym när du deltar i studien och svarar på frågorna. Vi kommer inte fråga dig om ditt namn, ditt personnummer, din adress eller ditt telefonnummer. E-postadressen som du använder för att skapa ett konto kommer inte att ingå i forskningsdatabasen på Lunds Universitet. Om du vill kommer du att kunna få push notiser via appen, som påminner om att svara på frågorna eller om vi vill informera alla användare om något. Du kan självklart välja att stänga av push notiser. Frågorna i appen kan komma att uppdateras när vi lär oss mer om covid-19.',
            'Du väljer själv hur länge du vill delta i studien och använda appen. Du kan avsluta ditt deltagande när som helst och/eller avinstallera appen och vi kommer inte att fråga dig varför.',
            'Observera att du måste vara över 18 år för att delta i studien.',
            'Appen är utvecklad för att möjliggöra datainsamling från många anonyma användare. Den ger inte hälsoråd, och ersätter inte ordinarie kontakt med sjukvården. Du kommer inte heller kunna ta kontakt med sjukvårdspersonal via appen.',
          ]}
        />

        <HeaderText text="Möjliga följder och risker med att delta i studien" />
        <SimpleTextBlock
          text={[
            'Att svara på frågor om sin hälsa skulle kunna upplevas som obehagligt för vissa, men det är aldrig obligatoriskt att svara på någon fråga, och du väljer alltid själv hur mycket och hur länge du vill använda appen. Eftersom du är anonym när du deltar kommer du inte att kunna identifieras eller kontaktas i studien, och risken för integritetsintrång är liten.',
            'Det finns inga direkta fördelar för dig av att delta i den här studien, och du kommer inte att kunna få personliga hälsoråd eller personlig uppföljning via appen. Ditt deltagande kan däremot bidra med mycket viktig kunskap om COVID-viruset.',
          ]}
        />

        <HeaderText text="Vad händer med mina uppgifter?" />
        <SimpleTextBlock
          text={[
            'Projektet kommer att samla in och registrera information om dig via appen Covid-19 Symptom Study. Ändamålet med informationsinsamlingen är att möjliggöra forskning på spridningen av covid-19 i den svenska befolkningen. Den rättsliga grunden för informationsinsamlingen är därmed allmänt intresse.',
            'Appen Covid-19 Symptom Study är utvecklad av forskare på King’s College i London, Guy’s Hospital och St Thomas Hospital i London, samt utvecklare på hälsoföretaget Zoe Global Ltd i Storbritannien. Zoe Global Ltd kommer att ansvara för initial insamling av data från Covid-19 Symptom Study. Information från de svenska användarna kommer sedan med säker filöverföring och i krypterad form överföras till Lunds Universitet.',
            'Lunds Universitet kommer sedan att bygga upp en forskningsdatabas med informationen från svenska användare av Covid-19 Symptom Study. Forskningsdatabasen kommer att ligga på en säker server utan tillgång för ickeauktoriserad personal eller andra utomstående. Tillgång till data kommer enbart att ges till utvalda forskare i projektet.',
          ]}
        />
        <RegularText>
          All information som samlas in från användarna av appen Covid-19 Symptom Study kommer att sammanställas och
          analyseras på gruppnivå, och inga individuella karakteristika kommer att kunna identifieras. Resultaten från
          sammanställningarna och analyserna kommer att skickas löpande till Folkhälsomyndigheten och andra myndigheter
          och ansvariga inom hälso- och sjukvård. Resultaten kommer också att publiceras löpande på studiens hemsida (
          <ClickableText onPress={() => Linking.openURL('https://Covid19app.lu.se')}>Covid19app.lu.se</ClickableText>).
          Vi kommer också att publicera resultat på gruppnivå i medicinska tidskrifter.
        </RegularText>
        <SimpleTextBlock
          text={[
            'Zoe Global Ltd ansvarar för datainsamling från svenska användare i Sverige och för data i Storbritannien. Ansvarig för data från svenska användare när den skickats från Zoe Global Ltd till Lunds Universitet i Sverige är forskningshuvudmannen Lunds universitet. Data kommer att sparas på Lunds universitet i minst 10 år efter den samlats in i enlighet med gällande dataskyddslagstiftning. All datalagring och överföring i Sverige och i Storbritannien uppfyller de krav som ställs av EU:s dataskyddsförordning 2016/679, också kallat GDPR (General Data Protection Regulation), och annan relevant lagstiftning.',
          ]}
        />
        <RegularText>
          Enligt EU:s dataskyddsförordning har du rätt att kostnadsfritt få ta del av den information om dig som
          hanteras i studien, och vid behov få eventuella fel rättade. Du kan också begära att information som du lämnat
          raderas samt att behandlingen av dina personuppgifter begränsas. Detta kan du göra genom att e-posta till{' '}
          <RegularBoldText>leavecovidtracking-sweden@joinzoe.com</RegularBoldText> från den e-postadress du använt för
          att registrera dig i appen. Inom kort kommer också appen uppdateras och göra det möjligt för dig att göra det
          här i själva appen. Du kan även kontakta ansvarig forskare i Sverige professor Paul Franks om du har frågor,
          se kontaktinformation nedan.
        </RegularText>
        <RegularText>
          Det finns också ett dataskyddsombud på Lunds universitet som nås på{' '}
          <RegularBoldText>dataskyddsombud@lu.se</RegularBoldText>. Om du är missnöjd med hur dina uppgifter behandlas
          har du även rätt att lämna in klagomål till Datainspektionen i Stockholm som är den aktuella
          tillsynsmyndigheten (<RegularBoldText>datainspektionen@datainspektionen.se</RegularBoldText>). Mer information
          om detta hittar du via{' '}
          <ClickableText
            onPress={() =>
              Linking.openURL(
                'https://www.datainspektionen.se/vagledningar/for-dig-som-privatperson/klagomal-och-tips/'
              )
            }>
            https://www.datainspektionen.se/vagledningar/for-dig-som-privatperson/klagomal-och-tips/
          </ClickableText>
        </RegularText>

        <HeaderText text="Hur får jag information om resultatet i studien?" />
        <SimpleTextBlock
          text={[
            'Forskargruppen kommer att löpande sammanställa och analysera resultat från forskningsprojektet, och du kommer att kunna ta del av resultaten på studiens hemsida Covid19app.lu.se. Resultat kommer bara att visa information på gruppnivå, och ingen information kan härledas till just dig.',
          ]}
        />

        <HeaderText text="Ersättning och försäkring" />
        <SimpleTextBlock
          text={[
            'Du kommer inte att få någon ersättning för ditt deltagande i studien, och du omfattas inte av någon speciell försäkring när du deltar.',
          ]}
        />

        <HeaderText text="Deltagandet är frivilligt" />
        <SimpleTextBlock
          text={[
            'Ditt deltagande i studien är helt frivilligt och du kan när som helst välja att avbryta deltagandet. Om du väljer att inte delta eller vill avbryta ditt deltagande behöver du inte uppge varför. Om du vill avbryta ditt deltagande så kan du själv sluta använda eller avinstallera appen Covid-19 Symptom Study.',
          ]}
        />

        <HeaderText text="Ansvarig för studien" />
        <SimpleTextBlock
          text={[
            'Ansvarig för studien är Professor Paul Franks. Om du har några ytterligare frågor gällande studien så får du gärna maila honom på e-postadressen nedan:\n',
            'Professor Paul Franks',
            'Lunds universitet, CRC,',
            'Jan Waldenströms gata 35, Malmö',
            'Tel: 040-391149',
            'covid-tracker@med.lu.se',
          ]}
          separator={'\n'}
        />

        <HeaderText text="Samtycke till att delta i studien" />
        <RegularText>
          Jag har härmed läst den skriftliga informationen om studien, och jag har haft möjlighet att ställa frågor via
          epost till den ansvariga forskaren. Om jag vill läsa den skriftliga informationen igen så finns den på{' '}
          <ClickableText onPress={() => Linking.openURL('https://Covid19app.lu.se')}>Covid19app.lu.se</ClickableText>.
        </RegularText>

        {!this.viewOnly && (
          <CheckboxList>
            <CheckboxItem
              value={this.state.swedenParticipateChecked}
              onChange={() => this.handleToggle('swedenParticipateChecked')}>
              Jag är 18 år eller äldre och jag samtycker till att delta i studien ”Nationellt initiativ för att via en
              app i realtid kartlägga samhällspridningen av covid-19 i Sverige samt riskfaktorer för att drabbas av en
              allvarlig sjukdomsbild vid covid-19”.
            </CheckboxItem>
            <CheckboxItem
              value={this.state.swedenProcessingChecked}
              onChange={() => this.handleToggle('swedenProcessingChecked')}>
              Jag samtycker till att personuppgifter om mig behandlas på det sätt som beskrivs i informationen till
              studiedeltagare ovan.
            </CheckboxItem>
            <CheckboxItem value={this.state.swedenAgreeZoe} onChange={() => this.handleToggle('swedenAgreeZoe')}>
              Jag har läst och accepterar Zoe Global Ltd{' '}
              <ClickableText
                onPress={() => this.props.navigation.navigate('PrivacyPolicySV', { viewOnly: this.viewOnly })}>
                integritetspolicy
              </ClickableText>
              .
            </CheckboxItem>
          </CheckboxList>
        )}
      </ScrollView>
    );
  };

  renderConsent = () => {
    let consent = this.renderUKConsent; //default;
    if (isUSCountry()) consent = this.renderUSConsent;
    if (isGBCountry()) consent = this.renderUKConsent;
    if (isSECountry()) consent = this.renderSwedishConsent;
    return consent();
  };

  render() {
    return (
      <View style={styles.rootContainer}>
        {this.renderConsent()}
        {!this.viewOnly && (
          <BrandedButton style={styles.button} enable={this.canAgree()} hideLoading onPress={this.handleAgreeClicked}>
            {i18n.t('legal.i-agree')}
          </BrandedButton>
        )}
      </View>
    );
  }

  private openUrl(link: string) {
    Linking.openURL(link);
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundPrimary,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  button: {
    marginTop: 20,
  },
});
