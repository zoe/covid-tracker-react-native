import { ApplicationVersion } from '@covid/components/AppVersion';
import { BrandedButton, ClickableText, RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import React, { Component } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenParamList } from '../../ScreenParamList';
import { BulletedTextBlock, HeaderText, SimpleTextBlock } from '../LegalComponents';

type PropsType = {
  navigation: StackNavigationProp<ScreenParamList, 'PrivacyPolicyUK'>;
  route: RouteProp<ScreenParamList, 'PrivacyPolicyUK'>;
};

export default class PrivacyPolicySVScreen extends Component<PropsType, object> {
  viewOnly = this.props.route.params.viewOnly;

  render() {
    return (
      <View style={styles.rootContainer}>
        <ScrollView>
          <HeaderText text="Integritetsmeddelande för COVID Symptom Study Sverige" />
          <SimpleTextBlock
            text={[
              'Denna app har skapats och drivs av Zoe Global Limited (”Zoe”), som är ett hälsoteknikföretag. Zoe har tillgång till all information du rapporterar.',
              'Zoe driver ingen kommersiell verksamhet i Sverige och har inte heller några planer på kommersiell verksamhet i Sverige. Zoe utvecklade ursprungligen denna app för att stötta den nationella hälso- och sjukvården i Storbritannien, med förbehållet att data endast får användas för icke-kommersiella ändamål. Zoe har tillhandahållit en anpassad version för Sverige utan kostnad för att bistå studien vid Lunds universitet under den pågående globala covid-19-epidemin.',
            ]}
          />

          <HeaderText text="Dataskyddsförordningen (GDPR)" />
          <SimpleTextBlock
            text={[
              'Eftersom det arbete som Zoe Global Limited utför genomförs i Storbritannien gäller Dataskyddsförordningen (GDPR) för vår behandling av dina personuppgifter, vare sig du bor i Sverige eller någon annanstans.',
              'Vi behandlar två typer av uppgifter som rör dig:',
            ]}
          />

          <HeaderText text="Känsliga personuppgifter" />
          <SimpleTextBlock
            text={[
              'Detta är uppgifter om dig, din hälsa och dina symtom vid sjukdom, samt de uppgifter som din telefon delar, inklusive IP-adressen (vilken vi använder för att upptäcka skadlig aktivitet och bekräfta att en användare befinner sig i Sverige). Appen har inte åtkomst till dina kontakter, din kamera, dina filer eller din geolocation.',
            ]}
          />
          <RegularText>Vi behandlar dessa uppgifter så att:</RegularText>
          <BulletedTextBlock
            text={[
              'vi ska förstå symtomen på COVID-19 bättre',
              'vi ska kunna spåra spridningen av COVID-19',
              'vi ska kunna främja vetenskaplig forskning om kopplingarna mellan patientens hälsa och hur denne reagerar på en COVID-19-infektion',
            ]}
          />

          <SimpleTextBlock
            text={[
              'Vår rättsliga grund för att behandla uppgifterna är att du gav oss ditt medgivande. På grund av de stränga föreskrivande krav som gäller oss behöver vi ditt medgivande för att vi ska få behandla data som rör din hälsa. Detta i sin tur innebär att vi inte kan ge dig tillstånd att använda appen om du inte ger ditt medgivande (eller om du tar tillbaka ditt medgivande). Detta gör vi inte för att vara otrevliga, utan vi kan helt enkelt inte tillhandhålla dig tjänsten utan ditt medgivande.',
              'Vi delar dessa data med Lunds universitet i Sverige för att genomföra forskning inom hälsa relaterat till covid-19. För att skydda din integritet kommer Lunds universitet inte att ha tillgång till din IP-adress, din e-postadress eller ditt fullständiga postnummer. Efter att vi har delat informationen med Lunds universitet sparar vi en kopia av dessa uppgifter.',
            ]}
          />
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
              'Andra forskningsinstitutioner',
            ]}
          />

          <SimpleTextBlock
            text={[
              'Innan vi delar några av dina uppgifter kommer vi att ta bort din e-postadress, IP-adress och alla siffror utom de två första i ditt postnummer för att skydda din integritet. En anonym kod kommer att användas i stället.',
              'Ibland när vi delar uppgifter med forskare exporteras de till länder som exempelvis USA, som har annorlunda regler gällande dataskydd och som kanske inte skyddar dina uppgifter på samma sätt som, eller lika bra som, GDPR gör. Vi har rätt att göra det, eftersom du ger oss ditt medgivande till detta. Vi avlägsnar alltid den information som beskrivs ovan för att skydda din integritet. Dock gäller fortsatt lagstiftningen kring GDPR alla uppgifter du delat med oss och vi måste därför dela alla data på ett sätt som överensstämmer med GDPR.',
            ]}
          />

          <RegularText style={{ marginBottom: 20 }}>
            På grund av typen av forskning som vi genomför under en pågående epidemi kan vi inte ange en specifik
            tidsgräns för lagringen av känsliga personuppgifter, men vi granskar detta regelbundet och säkerställer att
            de inte sparas längre än nödvändigt. Om du vill att vi ska sluta behandla dina känsliga personuppgifter kan
            du dra tillbaka ditt medgivande när som helst genom att skicka ett e-postmeddelande till{' '}
            <RegularBoldText>leavecovidtracking-sweden@joinzoe.com</RegularBoldText>. När du drar tillbaka ditt
            medgivande raderar vi alla känsliga personuppgifter som vi har om dig.
          </RegularText>

          <HeaderText text="Andra personuppgifter" />
          <RegularText>Vi behandlar också dina kontaktuppgifter i syfte att:</RegularText>
          <BulletedTextBlock
            text={[
              'be om din feedback om appen eller utföra någon annan typ av enkätundersökning',
              'hålla kontakten med dig om appen och hur den fungerar',
              'skicka dig information om nya versioner av appen eller liknande appar som vi kan ha i framtiden',
              'dela resultaten från världsomfattande forskning från Covid Symptom Study och annan forskning som utförs av Zoe.',
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
              'Google G Suite',
              'MailChimp',
              'Mailgun',
              'Intercom',
              'Sentry',
              'Cloudflare',
              'Sqreen',
            ]}
          />

          <HeaderText text="Dina rättigheter" />
          <RegularText>
            I enlighet med{' '}
            <ClickableText
              onPress={() =>
                this.openUrl('https://eur-lex.europa.eu/legal-content/SV/TXT/PDF/?uri=CELEX:32016R0679&rid=1')
              }>
              GDPR
            </ClickableText>{' '}
            har du ett antal viktiga rättigheter utan kostnad. Sammanfattningsvis innefattar dessa rätten att:
            {'\n'}
            <BulletedTextBlock
              text={[
                'få tillgång till dina personuppgifter',
                'kräva att vi korrigerar eventuella misstag i de uppgifter vi har om dig',
                'kräva radering av personuppgifter som rör dig i vissa situationer',
                'erhålla de personuppgifter som rör dig som du har tillhandhållit oss, på ett strukturerat, vanligt använt och i ett av maskin läsbart format, samt har rätt att överföra dessa uppgifter till en tredje part i vissa situationer',
                'invända mot att beslut tas automatiskt vilket leder till rättsliga effekter som berör dig eller på ett liknande sätt påverkar dig signifikant',
                'invända i vissa andra situationer mot vår fortsatta behandling av dina personuppgifter',
                'på annat sätt begränsa vår behandling av dina personuppgifter under vissa omständigheter.',
              ]}
            />
            {'\n\n'}
            För mer information om var och en av dessa rättigheter, däribland under vilka omständigheter de gäller, se{' '}
            <ClickableText
              onPress={() =>
                this.openUrl(
                  'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/'
                )
              }>
              Guidance from the United Kingdom Information Commissioner’s Office (ICO)
            </ClickableText>{' '}
            gällande enskilda personers rättigheter under Dataskyddsförodningen.
            {'\n\n'}
            Om du vill utöva någon rätt ber vi dig skicka en e-post, ringa eller skriva till vår dataskyddsansvarige med
            hjälp av kontaktuppgifterna nedan.
            {'\n\n'}
            Enligt{' '}
            <ClickableText
              onPress={() =>
                this.openUrl('https://eur-lex.europa.eu/legal-content/SV/TXT/PDF/?uri=CELEX:32016R0679&rid=1')
              }>
              GDPR
            </ClickableText>{' '}
            har du även rätt att lämna in ett klagomål till en tillsynsmyndighet, särskilt i den medlemsstat inom den
            Europeiska unionen (eller det Europeiska ekonomiska samarbetsområdet) där du arbetar, vanligtvis bor eller
            där eventuell påstådd överträdelse av dataskyddslagen inträffat. Tillsynsmyndigheten i Storbritannien är
            Information Commissioner som kan kontaktas på{' '}
            <ClickableText
              onPress={() => this.openUrl('https://ico.org.uk/make-a-complaint/your-personal-information-concerns')}>
              https://ico.org.uk/make-a-complaint/your-personal-information-concerns/
            </ClickableText>{' '}
            eller per telefon: <RegularBoldText>+44 0303 123 1113</RegularBoldText>.{'\n'}
          </RegularText>

          <HeaderText text="Om Oss" />

          <RegularText>
            Vår adress: 164 Westminster Bridge Road, London SE1 7RW, Storbritannien{'\n\n'}
            Dataskyddsansvarig: dpo-sweden@joinzoe.com
            {'\n'}
          </RegularText>
        </ScrollView>

        {!this.viewOnly && (
          <BrandedButton style={styles.button} onPress={() => this.props.navigation.goBack()}>
            {i18n.t('legal.back')}
          </BrandedButton>
        )}

        <ApplicationVersion />
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
