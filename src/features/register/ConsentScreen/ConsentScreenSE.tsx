import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { HeaderText, SimpleTextBlock } from '@covid/features/register/components/LegalComponents';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ScrollView } from 'react-native';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'Consent'>;
  route: RouteProp<ScreenParamList, 'Consent'>;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConsentScreenSE: React.FC<PropsType> = ({ navigation, route, setAgreed }) => {
  const [participateChecked, setParticipateChecked] = React.useState(false);
  const [processingChecked, setProcessingChecked] = React.useState(false);
  const [agreeChecked, setAgreeChecked] = React.useState(false);

  const onInfoLinkPress = React.useCallback(() => openWebLink('https://Covid19app.lu.se'), []);

  const onPrivacyPolicyPress = React.useCallback(
    () => navigation.navigate('PrivacyPolicySV', { viewOnly: route.params?.viewOnly }),
    [navigation.navigate, route.params?.viewOnly],
  );

  const toggleParticipateChecked = React.useCallback(() => {
    setParticipateChecked(!participateChecked);
  }, [setParticipateChecked, participateChecked]);

  const toggleProcessingChecked = React.useCallback(() => {
    setProcessingChecked(!processingChecked);
  }, [setProcessingChecked, processingChecked]);

  const toggleAgreeChecked = React.useCallback(() => {
    setAgreeChecked(!agreeChecked);
  }, [setAgreeChecked, agreeChecked]);

  React.useEffect(() => {
    navigation.setOptions({ title: 'Information till studiedeltagare' });
  }, []);

  React.useEffect(() => {
    setAgreed(participateChecked && processingChecked && agreeChecked);
  }, [participateChecked, processingChecked, agreeChecked]);

  return (
    <ScrollView>
      <RegularText>
        Vi vill fråga dig om du vill delta i ett forskningsprojekt som handlar om covid-19. I det här dokumentet får du
        information om projektet och om vad det innebär att delta.
        {'\n\n'}
        Projektets titel är ”Nationellt initiativ för att via en app i realtid kartlägga samhällspridningen av covid-19
        i Sverige samt riskfaktorer för att drabbas av en allvarlig sjukdomsbild vid covid-19”, och forskningen är
        godkänd av Etikprövningsmyndigheten i Sverige (DNR 2020-01803 och DNR 2020-04006).
        {'\n\n'}
      </RegularText>

      <HeaderText text="Vad är det för projekt och varför vill ni att jag ska delta?" />
      <SimpleTextBlock
        text={[
          'Syftet med det här projektet är att öka kunskapen om sjukdomen covid-19, som orsakas av coronaviruset SARS-CoV-2. Vårt mål är att kartlägga den snabba smittspridningen av covid-19 i landet, och också att undersöka riskfaktorer för att drabbas av en mer allvarlig sjukdomsbild.',
          'I det här projektet kommer vi att använda oss av en app: ”COVID Symptom Study” som är gratis för användarna. I appen kan studiedeltagare/appanvändare anonymt fylla i en kort hälsodeklaration och om huruvida de har några symtom som skulle kunna tyda på att de har drabbats av covid-19, t.ex. feber eller hosta, samt uppge om de har förändrat sina levnadsvanor sedan pandemin bröt ut. Studiedeltagare som arbetar inom hälso- och sjukvård kommer också att kunna uppge om de exponerats för smitta på sitt arbete. Data som samlas in från alla appanvändare kan sedan analyseras på gruppnivå för att undersöka hur och var covid-19 sprids i landet. Vi kommer också att kunna se vad som händer med smittspridningen på sikt, och hur olika delar av landet påverkas av nationella restriktioner gällande t.ex. resande och antal personer som får delta i allmänna sammankomster. Utifrån informationen i hälsodeklarationen kan vi också analysera vilka som verkar ha stor risk att drabbas av svårare symtom. Vi kommer också att kunna se om det verkar som om faktorer som påverkar folkhälsan i Sverige förändras av den pågående pandemin. Vi kommer att samla in data så länge som covid-19 sprids i Sverige.',
          'Forskningshuvudman för projektet är Lunds universitet. Med forskningshuvudman menas den organisation som är ansvarig för studien.',
        ]}
      />

      <HeaderText text={'Hur går studien till?\n'} />
      <SimpleTextBlock
        text={[
          'Om du väljer att delta i studien kan du börja använda appen COVID Symptom Study. Du kommer att då att först svara på en kort hälsodeklaration. Vi kommer att be om ditt postnummer för att kunna veta ditt ungefärliga geografiska läge i Sverige (appen kommer dock inte att samla in någon GPS-data). Vi kommer också att fråga dig om du arbetar inom hälso- och sjukvård, och om du gör det kommer vi att fråga om du blivit exponerad för covid-19 på din arbetsplats och i så fall om du haft tillgång till skyddsutrustning. Du väljer själv hur många frågor du svarar på och vilka frågor du föredrar att inte svara på. Att svara på alla frågor tar ungefär 10-15 minuter.',
          'Sedan kommer du att kunna svara på frågor om huruvida du har symtom av den typ som många får vid covid-19, dvs t.ex. feber, hosta, andningssvårigheter och uttalad trötthet. Du kommer också att kunna fylla i om du har behövt uppsöka sjukvården för dina symtom, och om du blivit testad för covid-19. Du som arbetar inom sjukvården kan också uppdatera om du nyligen blivit exponerad för misstänkt covid-19 på din arbetsplats. Du kommer att kunna uppdatera de här frågorna i appen dagligen, eller så ofta eller sällan du vill, det tar ungefär 1 minut per gång.',
          'Du är anonym när du deltar i studien och svarar på frågorna. Vi kommer inte fråga dig om ditt namn, ditt personnummer, din adress eller ditt telefonnummer. E-postadressen som du använder för att skapa ett konto kommer inte att ingå i forskningsdatabasen på Lunds universitet. Om du vill kommer du att kunna få push-notiser via appen, som påminner om att svara på frågorna eller om vi vill informera alla användare om något. Du kan självklart välja att stänga av push-notiserna. Frågorna i appen uppdateras i takt med att vi lär oss mer om covid-19.',
          'Du väljer själv hur länge du vill delta i studien och använda appen. Du kan avsluta ditt deltagande när som helst och/eller avinstallera appen och vi kommer inte att fråga dig varför.',
          'Observera att du måste vara 18 år eller äldre för att delta i studien.',
          'Appen är utvecklad för att möjliggöra datainsamling från många anonyma användare. Den ger inte hälsoråd, och ersätter inte ordinarie kontakt med sjukvården. Du kommer inte heller kunna ta kontakt med sjukvårdspersonal via appen.',
        ]}
      />

      <HeaderText text="Möjliga följder och risker med att delta i studien" />
      <SimpleTextBlock
        text={[
          'Att svara på frågor om sin hälsa skulle kunna upplevas som obehagligt för vissa, men det är aldrig obligatoriskt att svara på någon fråga, och du väljer alltid själv hur mycket och hur länge du vill använda appen. Eftersom du är anonym när du deltar kommer du inte att kunna identifieras eller kontaktas i studien, och risken för integritetsintrång är liten.',
          'Det finns inga direkta fördelar för dig av att delta i den här studien, och du kommer inte att kunna få personliga hälsoråd eller personlig uppföljning via appen. Ditt deltagande kan däremot bidra med mycket viktig kunskap om covidviruset.',
        ]}
      />

      <HeaderText text="Vad händer med mina uppgifter?" />
      <SimpleTextBlock
        text={[
          'Projektet kommer att samla in och registrera information om dig via appen COVID Symptom Study. Ändamålet med informationsinsamlingen är att möjliggöra forskning på spridningen av covid-19 i den svenska befolkningen. Den rättsliga grunden för informationsinsamlingen är därmed allmänt intresse.',
          'Appen COVID Symptom Study är utvecklad av forskare på King’s College i London, Guy’s Hospital och St Thomas Hospital i London, samt utvecklare på hälsoföretaget Zoe Global Ltd i Storbritannien. Zoe Global Ltd kommer att ansvara för initial insamling av data från COVID Symptom Study. Information från de svenska användarna kommer sedan med säker filöverföring och i krypterad form överföras till Lunds universitet.',
          'Lunds universitet kommer sedan att bygga upp en forskningsdatabas med informationen från svenska användare av COVID Symptom Study. Forskningsdatabasen kommer att ligga på en säker server utan tillgång för icke auktoriserad personal eller andra utomstående. Tillgång till data kommer enbart att ges till utvalda forskare i projektet.',
          'Lunds universitet har ingått ett samarbetsavtal med Uppsala universitet inom ramen för COVID Symptom Study. Utvalda forskare på Uppsala universitet ingår i forskningsprojektet COVID Symptom Study och Lunds universitet kommer att kunna dela data med dessa forskare på Uppsala universitet. Utvalda forskare vid andra akademiska institutioner i Sverige kan inom ramen för separata samarbetsavtal också komma att delta i analyser av data. Lunds universitet kommer fortsatt ha huvudansvar för samarbetet med Zoe Global Ltd samt för kontakter med studiedeltagarna.',
        ]}
      />
      <RegularText>
        All information som samlas in från användarna via appen COVID Symptom Study kommer att sammanställas och
        analyseras på gruppnivå, och inga individuella karakteristika kommer att kunna identifieras. Resultaten från
        sammanställningarna och analyserna kommer att skickas löpande till Folkhälsomyndigheten och andra myndigheter
        samt ansvariga inom hälso- och sjukvård. Resultaten kommer också att publiceras löpande på studiens hemsida (
        <ClickableText onPress={onInfoLinkPress} testID="info-link1">
          Covid19app.lu.se
        </ClickableText>
        ). Vi kommer också att publicera resultat på gruppnivå i medicinska tidskrifter.
      </RegularText>
      <SimpleTextBlock
        text={[
          'Zoe Global Ltd ansvarar för datainsamling från svenska användare i Sverige och för data i Storbritannien. Ansvarig för data från svenska användare när den skickats från Zoe Global Ltd till Lunds universitet i Sverige är forskningshuvudmannen Lunds universitet. Data kommer att sparas på Lunds universitet i minst 10 år efter den samlats in i enlighet med gällande dataskyddslagstiftning. All datalagring och överföring i Sverige och i Storbritannien uppfyller de krav som ställs av EU:s dataskyddsförordning 2016/679, också kallat GDPR (General Data Protection Regulation), och annan relevant lagstiftning.',
        ]}
      />
      <RegularText>
        Enligt EU:s dataskyddsförordning har du rätt att kostnadsfritt få ta del av den information om dig som hanteras
        i studien, och vid behov få eventuella fel rättade. Du kan också begära att information som du lämnat raderas
        samt att behandlingen av dina personuppgifter begränsas. Detta kan du göra genom att e-posta till{' '}
        <RegularBoldText>leavecovidtracking-sweden@joinzoe.com</RegularBoldText> från den e-postadress du använt för att
        registrera dig i appen. Du kan även ta bort dina uppgifter direkt i appens huvudmeny. Du kan även kontakta
        ansvarig forskare i Sverige professor Paul Franks om du har frågor, se kontaktinformation nedan.
      </RegularText>
      <RegularText>
        Det finns också ett dataskyddsombud på Lunds universitet som nås på{' '}
        <RegularBoldText>dataskyddsombud@lu.se</RegularBoldText>. Om du är missnöjd med hur dina uppgifter behandlas har
        du även rätt att lämna in klagomål till Datainspektionen i Stockholm som är den aktuella tillsynsmyndigheten (
        <RegularBoldText>datainspektionen@datainspektionen.se</RegularBoldText>). Mer information om detta hittar du via{' '}
        <ClickableText
          onPress={() =>
            openWebLink('https://www.datainspektionen.se/vagledningar/for-dig-som-privatperson/klagomal-och-tips/')
          }
          testID="info-link2"
        >
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
          'Ditt deltagande i studien är helt frivilligt och du kan när som helst välja att avbryta deltagandet. Om du väljer att inte delta eller vill avbryta ditt deltagande behöver du inte uppge varför. Om du vill avbryta ditt deltagande så kan du själv sluta använda eller avinstallera appen COVID Symptom Study.',
        ]}
      />

      <HeaderText text="Ansvarig för studien" />
      <SimpleTextBlock
        separator={'\n'}
        text={[
          'Ansvarig för studien är professor Paul Franks. Om du har några ytterligare frågor gällande studien så får du gärna mejla honom på e-postadressen nedan:\n',
          'Professor Paul Franks',
          'Lunds universitet, CRC,',
          'Jan Waldenströms gata 35, Malmö',
          'Tfn: 040-391149',
          'covid-symptom-study@med.lu.se',
        ]}
      />

      <HeaderText text="Samtycke till att delta i studien" />
      <RegularText>
        Jag har härmed läst den skriftliga informationen om studien, och jag har haft möjlighet att ställa frågor via
        epost till den ansvariga forskaren. Om jag vill läsa den skriftliga informationen igen så finns den på{' '}
        <ClickableText onPress={onInfoLinkPress} testID="info-link3">
          Covid19app.lu.se
        </ClickableText>
        .
      </RegularText>

      {!route.params?.viewOnly ? (
        <CheckboxList>
          <CheckboxItem onChange={toggleParticipateChecked} testID="partecipate-check" value={participateChecked}>
            Jag är 18 år eller äldre och jag samtycker till att delta i studien ”Nationellt initiativ för att via en app
            i realtid kartlägga samhällspridningen av covid-19 i Sverige samt riskfaktorer för att drabbas av en
            allvarlig sjukdomsbild vid covid-19”.
          </CheckboxItem>
          <CheckboxItem onChange={toggleProcessingChecked} testID="processing-check" value={processingChecked}>
            Jag samtycker till att personuppgifter om mig behandlas på det sätt som beskrivs i Informationen till
            studiedeltagare ovan.
          </CheckboxItem>
          <CheckboxItem onChange={toggleAgreeChecked} testID="agree-check" value={agreeChecked}>
            Jag har läst och accepterar Zoe Global Ltds{' '}
            <ClickableText onPress={onPrivacyPolicyPress} testID="privacy-policy">
              integritetsmeddelande
            </ClickableText>
            .
          </CheckboxItem>
        </CheckboxList>
      ) : null}
    </ScrollView>
  );
};

export default React.memo(ConsentScreenSE);
