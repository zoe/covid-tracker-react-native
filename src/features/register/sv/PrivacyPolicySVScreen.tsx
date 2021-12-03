import { Screen } from '@covid/components/Screen';
import { ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import { BulletedTextBlock, HeaderText, SimpleTextBlock } from '@covid/features/register/components/LegalComponents';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { openWebLink } from '@covid/utils/links';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';

type TProps = {
  navigation: StackNavigationProp<TScreenParamList, 'PrivacyPolicySV'>;
  route: RouteProp<TScreenParamList, 'PrivacyPolicySV'>;
};

export default class PrivacyPolicySVScreen extends React.Component<TProps, object> {
  viewOnly = this.props.route.params?.viewOnly;

  render() {
    return (
      <Screen
        backgroundColor={colors.backgroundPrimary}
        footerOnPress={this.props.navigation.goBack}
        footerTitle={this.viewOnly ? '' : i18n.t('legal.back')}
        noHeader={!this.viewOnly}
        testID="privacy-policy-sv-screen"
      >
        <HeaderText text="Integritetsmeddelande för COVID Symptom Study Sverige" />
        <SimpleTextBlock
          text={[
            'Denna app har skapats och drivs av Zoe Limited (”Zoe”), som är ett hälsoteknikföretag. Zoe har tillgång till all information du rapporterar.',
            'Zoe driver ingen kommersiell verksamhet i Sverige och har inte heller några planer på kommersiell verksamhet i Sverige. Zoe utvecklade ursprungligen appen COVID Symptom Study för att stötta den nationella hälso- och sjukvården i Storbritannien, med förbehållet att data endast får användas för icke-kommersiella ändamål. Zoe har tillhandahållit en anpassad version för Sverige utan kostnad för att bistå studien COVID Symptom Study Sverige vid Lunds universitet under den globala covid-19-epidemin.',
          ]}
        />

        <HeaderText text="Den allmänna dataskyddsförordningen (GDPR)" />
        <SimpleTextBlock
          text={[
            'Både den Europeiska unionens allmänna dataskyddsförordning (GDPR) och Storbritanniens motsvarighet som kallas för “UK GDPR”, är tillämpliga på vår behandling av personuppgifter, oavsett om du bor i Sverige, Storbritannien eller någon annanstans. I dagsläget skyddar både GDPR och UK GDPR uppgifter som rör dig på nästan exakt samma sätt.',
            'Vi behandlar två typer av uppgifter som rör dig:',
          ]}
        />

        <HeaderText text="Känsliga personuppgifter" />
        <RegularText>
          Detta är uppgifter om dig, din hälsa och dina symtom vid sjukdom, samt de uppgifter som din telefon delar,
          inklusive IP-adressen (vilken vi använder för att upptäcka skadlig aktivitet och bekräfta att en användare
          befinner sig i Sverige). Appen har inte åtkomst till dina kontakter, din kamera, dina filer eller din
          GPS-data.{'\n'}
        </RegularText>
        <RegularText>Vi behandlar dessa uppgifter så att:</RegularText>
        <BulletedTextBlock
          text={[
            'vi ska förstå symtomen på covid-19 bättre',
            'vi ska kunna spåra spridningen av covid-19',
            'vi ska kunna främja vetenskaplig forskning om kopplingarna mellan patientens hälsa och hur denne reagerar på en covid-19-infektion',
          ]}
        />

        <RegularText>
          Vår rättsliga grund för att behandla uppgifterna är att du gett oss ditt medgivande. På grund av de stränga
          föreskrivande krav som gäller oss behöver vi ditt medgivande för att vi ska få behandla data som rör din
          hälsa. Detta i sin tur innebär att vi inte kan ge dig tillstånd att använda appen om du inte ger ditt
          medgivande (eller om du tar tillbaka ditt medgivande). Detta gör vi inte för att vara otrevliga, utan vi kan
          helt enkelt inte tillhandhålla dig tjänsten utan ditt medgivande.{'\n'}
        </RegularText>
        <RegularText>
          Vi delar dessa data med Lunds universitet i Sverige för att genomföra forskning inom hälsa relaterat till
          covid-19. För att skydda studiedeltagarnas integritet kommer Lunds universitet inte att ha tillgång till
          deltagarnas IP-adresser eller e-postadresser. Zoe delar studiedeltagarnas fullständiga (5 siffror) postnummer
          med Lunds universitet. För studiedeltagare som bor i ett postnummerområde med färre än 200 invånare kommer Zoe
          enbart att dela de första 2 siffrorna i postnumret med Lunds universitet. Vidare får Lunds universitet endast
          publicera analyser av geografiska områden/postnummerområden med 200 eller fler studiedeltagare. Efter att vi
          har delat informationen med Lunds universitet sparar vi en kopia av alla uppgifter.{'\n'}
        </RegularText>

        <RegularText>
          Vi arbetar också med andra personer som utför forskning inom hälsa med vilka vi kan komma att dela dina
          uppgifter, t.ex. personer som arbetar på:
        </RegularText>
        <BulletedTextBlock
          text={[
            'Sjukhus',
            'Folkhälsomyndigheter',
            'Universitet',
            'Välgörenhetsorganisationer inom hälsoområdet',
            'Andra forskningsinstitutioner.',
          ]}
        />

        <SimpleTextBlock
          separator={'\n'}
          text={[
            'Innan vi delar några av dina uppgifter med andra än Lunds universitet kommer vi att ta bort din e-postadress, IP-adress och alla siffror utom de två första i ditt postnummer för att skydda din integritet. En anonym kod kommer att användas i stället.\n',
            'Ibland när vi delar uppgifter med forskare exporteras de till länder som exempelvis USA, som har annorlunda regler gällande dataskydd och som kanske inte skyddar dina uppgifter på samma sätt som, eller lika bra som, GDPR eller UK GDPR gör. Vi har rätt att göra det, eftersom du ger oss ditt medgivande till detta. Vi avlägsnar alltid den information som beskrivs ovan för att skydda din integritet. Dock gäller fortsatt lagstiftningen kring GDPR och UK GDPR alla uppgifter du delat med oss och vi måste därför dela alla data på ett sätt som överensstämmer med GDPR och UK GDPR.',
          ]}
        />

        <RegularText>
          På grund av typen av forskning som vi genomför under den pågående epidemin kan vi inte ange en specifik
          tidsgräns för lagringen av känsliga personuppgifter, men vi granskar detta regelbundet och säkerställer att de
          inte sparas längre än nödvändigt. Om du vill att vi ska sluta behandla dina känsliga personuppgifter kan du
          dra tillbaka ditt medgivande när som helst genom att skicka ett e-postmeddelande till{' '}
          <RegularBoldText>leavecovidtracking-sweden@joinzoe.com</RegularBoldText>. När du drar tillbaka ditt medgivande
          raderar vi alla känsliga personuppgifter som vi har om dig.
          {'\n\n'}
        </RegularText>

        <HeaderText text="Andra personuppgifter" />
        <RegularText>Vi behandlar också dina kontaktuppgifter i syfte att:</RegularText>
        <BulletedTextBlock
          text={[
            'be om din feedback om appen eller utföra någon annan typ av enkätundersökning',
            'hålla kontakten med dig om appen och hur den fungerar',
            'skicka dig information om nya versioner av appen eller liknande appar som vi kan ha i framtiden',
            'dela resultaten från världsomfattande forskning från COVID Symptom Study och annan forskning som utförs av Zoe.',
          ]}
        />

        <SimpleTextBlock
          text={[
            'Vi kommer inte att skicka någon e-post som inte är avsedd för dig personligen (t.ex. i marknadsföringssyfte) om du inte vill att vi ska göra det. Alla sådana e-postmeddelanden kommer att innehålla en länk som du kan klicka på för att avanmäla dig från utskicken. Vi kommer inte att sälja dina kontaktuppgifter till tredje part.',
            'Vår rättsliga grund till att behandla denna information är vårt legitima intresse i att utveckla, marknadsföra och driva appen.',
            'Vi kommer att behålla dina kontaktuppgifter i sex år efter din sista kommunikation med oss, eller den sista gången du använde appen, för ansvarsändamål. Därefter raderar vi kontaktuppgifterna.',
          ]}
        />

        <HeaderText text="Behandlare av tredje part för båda typerna av information" />
        <SimpleTextBlock
          separator={'\n'}
          text={[
            'Vi använder oss av tredje parter som behandlar en del av dina personuppgifter å våra vägnar. När vi ger dem åtkomst till dina uppgifter låter vi dem inte använda dem för sina egna ändamål. Vi har upprättat ett avtal med varje behandlare som kräver att de endast behandlar data i enlighet med våra anvisningar och att de vidtar nödvändiga försiktighetsåtgärder när de använder dem. Dessa tredje parter har inte rätt att behålla data efter det att vår relation med dem har upphört.',
          ]}
        />
        <RegularText>Dessa behandlare innefattar:</RegularText>
        <BulletedTextBlock
          text={[
            'Google Cloud Platform',
            'SurveyMonkey',
            'Segment',
            'Expo',
            'Google Firebase',
            'Amplitude',
            'Google G-Suite',
            'MailChimp',
            'Mailgun',
            'Intercom',
            'Sentry',
            'Cloudflare',
            'Sqreen\n',
          ]}
        />

        <HeaderText text="Dina rättigheter" />
        <RegularText>
          I enlighet med GDPR och UK GDPR har du ett antal viktiga rättigheter utan kostnad. Sammanfattningsvis
          innefattar dessa rätten att:
        </RegularText>
        <BulletedTextBlock
          text={[
            'få tillgång till dina personuppgifter',
            'kräva att vi korrigerar eventuella misstag i de uppgifter vi har om dig',
            'kräva radering av personuppgifter som rör dig i vissa situationer',
            'erhålla de personuppgifter som rör dig som du har tillhandhållit oss, på ett strukturerat, vanligt använt och i ett av maskin läsbart format, samt har rätt att överföra dessa uppgifter till en tredje part i vissa situationer',
            'invända mot att beslut tas automatiskt vilket leder till rättsliga effekter som berör dig eller på ett liknande sätt påverkar dig signifikant',
            'invända i vissa andra situationer mot vår fortsatta behandling av dina personuppgifter',
            'på annat sätt begränsa vår behandling av dina personuppgifter under vissa omständigheter.\n',
          ]}
        />
        <HeaderText text="Rättigheter i enlighet med den europeiska allmänna dataskyddsförordningen (GDPR):" />
        <RegularText>
          För mer detaljerad information om de rättigheter du har vad gäller dina personuppgifter hänvisar vi till den{' '}
          <ClickableText
            onPress={() => openWebLink('https://ec.europa.eu/info/law/law-topic/data-protection/data-protection-eu_en')}
          >
            Europeiska kommissionen.
          </ClickableText>{' '}
          Alternativt kan du kontakta Integritetsskyddsmyndigheten (IMY) på{' '}
          <RegularBoldText>imy@imy.se</RegularBoldText> eller telefon <RegularBoldText>08-657 61 00</RegularBoldText>.
          {'\n'}
        </RegularText>
        <RegularText>
          Zoe har utsett DataRep som sin representant för dataskyddsfrågor i den Europeiska unionen vilket innebär att
          du kan kontakta dem direkt i ditt hemland.{'\n\n'}
          Om du vill ställa en fråga till Zoe, eller på annat sätt utöva dina rättigheter gällande dina personuppgifter
          kan du göra det genom att:
        </RegularText>
        <BulletedTextBlock
          text={[
            'skicka ett e-postmeddelande till Zoe på dpo-sweden@joinzoe.com',
            'skicka ett e-postmeddelande till DataRep på zoe@datarep.com',
            'kontakta DataRep via deras webbformulär online på www.datarep.com/zoe ',
            'skriva ett brev med din fråga till DataRep på: DataRep, S:t Johannesgatan 2, 4:e våningen, Malmö, 211 46.',
          ]}
        />
        <RegularText>
          <RegularBoldText>Observera att du måste adressera ditt brev till DataRep</RegularBoldText> och inte till “Zoe
          Limited” då det i annat fall inte når DataRep. Hänvisa tydligt till Zoe Limited i din korrespondens.{'\n'}
        </RegularText>
        <SimpleTextBlock
          text={[
            'Det är troligt att Zoe kommer att begära bevis rörande din identitet från DataRep när korrespondensen väl har kommit in för att säkerställa att dina personuppgifter och information som rör dem inte tillhandahålls någon annan än dig.',
            'Om du har några funderingar kring hur DataRep kommer att hantera de personuppgifter som vi behöver för att genomföra våra tjänster ber vi dig se DataReps sekretesspolicy på www.datarep.com/privacy-policy.',
          ]}
        />
        <HeaderText text="Rättigheter under UK GDPR:" />
        <SimpleTextBlock
          text={[
            'För mer information om var och en av dessa rättigheter, däribland under vilka omständigheter de gäller, se vägledning från Storbritanniens Information Commissioner’s Office (ICO) gällande enskilda personers rättigheter under UK GDPR.',
            'Om du vill utöva någon rätt ber vi dig skicka en e-post, ringa eller skriva till vår dataskyddsansvarige med hjälp av kontaktuppgifterna nedan. Enligt den allmänna dataskyddsförordningen har du även rätt att lämna in ett klagomål till Information Commissioner som kan kontaktas på https://ico.org.uk/make-a-complaint/your-personal-information-concerns eller per telefon: +44 0303 123 1113.',
          ]}
        />

        <HeaderText text="Om Oss" />

        <RegularText>
          Vår adress: 164 Westminster Bridge Road, London SE1 7RW, Storbritannien{'\n\n'}
          Dataskyddsansvarig: dpo-sweden@joinzoe.com
          {'\n'}
        </RegularText>
      </Screen>
    );
  }
}
