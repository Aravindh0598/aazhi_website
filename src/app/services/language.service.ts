import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LangType = 'en' | 'ta';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<LangType>(this.getInitialLanguage());
  currentLang$ = this.currentLangSubject.asObservable();

  private translations: Record<LangType, Record<string, string>> = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.gallery': 'Gallery',
      'nav.impact': 'Impact Stories',
      'nav.involved': 'Get Involved',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      'nav.donate': 'Donate',
      'nav.donateNow': 'Donate Now',

      // Donate Page
      'donate.yourDetails': 'Your Details',
      'donate.paymentInfo': 'Payment Info',
      'donate.supportCause': 'Support Our Cause',
      'donate.contributionDiff': 'Every contribution makes a difference.',
      'donate.fullName': 'Full Name',
      'donate.email': 'Email Address',
      'donate.amount': 'Donating Amount (₹)',
      'donate.mobile': 'Mobile Number (Optional)',
      'donate.address': 'Address (Optional)',
      'donate.addressPlaceholder': 'Residential or Office address',
      'donate.location': 'Location (Optional)',
      'donate.cityStatePlaceholder': 'City, State',
      'donate.continuePayment': 'Continue to Payment',
      'donate.editDetails': 'Edit Details',
      'donate.paymentInfoTitle': 'Payment Information',
      'donate.paymentHelp': 'Scan the QR code below or use the UPI ID to complete your donation.',
      'donate.upiId': 'UPI ID:',
      'donate.qrHelp': 'Open any UPI app (GPay, PhonePe, Paytm) and scan to pay',
      'donate.transactionId': 'Transaction ID / Ref Number',
      'donate.transPlaceholder': 'Enter UPI Trans. ID',
      'donate.inputHint': 'Found in your payment app after successful transaction.',
      'donate.amountToPay': 'Amount to Pay:',
      'donate.thankYou': 'Thank you, ',
      'donate.forSupport': ', for your generous support!',
      'donate.submitDetails': 'Submit Donation Details',
      'donate.alertRequired': 'Please fill in the required fields: Name, Email, and Amount.',
      'donate.alertTransId': 'Please enter the Transaction ID / Ref Number.',
      'donate.alertSuccess': 'Thank you! Your donation details have been submitted for verification.',
      'donate.alertError': 'An error occurred while submitting your details. Please try again later.',
      'donate.copied': 'UPI ID copied to clipboard!',

      // Get Involved Page
      'gi.home': 'Home',
      'gi.getInvolved': 'Get Involved',
      'gi.introText': 'If you would like to get involved in working towards making an impact on the lives of the elderly and enriching yourself in the process, we will be happy to hear from you. You can join us in any one of the following ways:',
      'gi.everyContribution': 'Every contribution counts',
      'gi.donateSub': 'Your donation directly supports the healthcare, agecare and livelihood programmes that HelpAge India runs for millions of disadvantaged elderly.',
      'gi.donateNow': 'Donate Now',
      'gi.contactUs': 'Contact Us',

      // Footer
      'footer.stayUpdated': 'Stay up-to-date with all our latest news',
      'footer.subscribe': 'Subscribe Now',
      'footer.emailPlaceholder': 'Enter your email address',
      'footer.aboutUs': 'About Us',
      'footer.aboutAazhi': 'About AAZHI',
      'footer.awards': 'Awards & Recognition',
      'footer.financials': 'Financials',
      'footer.publications': 'Publications',
      'footer.partners': 'Partners',
      'footer.news': 'News',
      'footer.supportUs': 'Support Us',
      'footer.pwd': 'Persons with Disabilities',
      'footer.volunteer': 'Volunteer',
      'footer.csr': 'Corporate CSR',
      'footer.legacy': 'Legacy Giving',
      'footer.importantLinks': 'Important Links',
      'footer.careers': 'Job Openings',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms & Conditions',
      'footer.refund': 'Donation Refund Policy',
      'footer.contactUs': 'Contact Us',
      'footer.brochure': 'Brochure',
      'footer.annualReport': 'Annual Report',
      'footer.payUPI': 'Pay using any UPI Apps',
      'footer.orgName': 'Org. Name',
      'footer.donateNow': 'Donate Now',
      'footer.rights': 'All Rights Reserved.',
      'footer.developedBy': 'Developed by',
      
      // Dynamic Days & Timings
      'day.Sunday': 'Sunday',
      'day.Monday': 'Monday',
      'day.Tuesday': 'Tuesday',
      'day.Wednesday': 'Wednesday',
      'day.Thursday': 'Thursday',
      'day.Friday': 'Friday',
      'day.Saturday': 'Saturday',
      'time.Holiday': 'Holiday',
      'time.Closed': 'Closed'
    },
    ta: {
      'nav.home': 'முகப்பு',
      'nav.about': 'எங்களைப் பற்றி',
      'nav.gallery': 'புகைப்படங்கள்',
      'nav.impact': 'தாக்கக் கதைகள்',
      'nav.involved': 'பங்கேற்க',
      'nav.blog': 'வலைப்பதிவு',
      'nav.contact': 'தொடர்பு',
      'nav.donate': 'நன்கொடை',
      'nav.donateNow': 'நன்கொடை அளிக்கவும்',

      // Donate Page
      'donate.yourDetails': 'உங்கள் விவரங்கள்',
      'donate.paymentInfo': 'கட்டணத் தகவல்',
      'donate.supportCause': 'எங்கள் நோக்கத்திற்கு ஆதரவளியுங்கள்',
      'donate.contributionDiff': 'ஒவ்வொரு பங்களிப்பும் மாற்றத்தை ஏற்படுத்தும்.',
      'donate.fullName': 'முழு பெயர்',
      'donate.email': 'மின்னஞ்சல் முகவரி',
      'donate.amount': 'நன்கொடை தொகை (₹)',
      'donate.mobile': 'கைபேசி எண் (விருப்பம்)',
      'donate.address': 'முகவரி (விருப்பம்)',
      'donate.addressPlaceholder': 'வீட்டு அல்லது அலுவலக முகவரி',
      'donate.location': 'இருப்பிடம் (விருப்பம்)',
      'donate.cityStatePlaceholder': 'நகரம், மாநிலம்',
      'donate.continuePayment': 'பணம் செலுத்த தொடரவும்',
      'donate.editDetails': 'விவரங்களைத் திருத்தவும்',
      'donate.paymentInfoTitle': 'கட்டண விவரங்கள்',
      'donate.paymentHelp': 'உங்கள் நன்கொடையை முடிக்க கீழே உள்ள QR குறியீட்டை ஸ்கேன் செய்யவும் அல்லது UPI ஐடியைப் பயன்படுத்தவும்.',
      'donate.upiId': 'UPI ஐடி:',
      'donate.qrHelp': 'ஏதேனும் UPI செயலியை (GPay, PhonePe, Paytm) திறந்து ஸ்கேன் செய்து செலுத்தவும்',
      'donate.transactionId': 'பரிவர்த்தனை ஐடி / குறிப்பு எண்',
      'donate.transPlaceholder': 'UPI பரிவர்த்தனை ஐடியை உள்ளிடவும்',
      'donate.inputHint': 'வெற்றிகரமான பரிவர்த்தனைக்குப் பின் உங்கள் கட்டணச் செயலியில் இதைக் காணலாம்.',
      'donate.amountToPay': 'செலுத்த வேண்டிய தொகை:',
      'donate.thankYou': 'நன்றி, ',
      'donate.forSupport': ', உங்களின் தாராளமான ஆதரவிற்கு!',
      'donate.submitDetails': 'நன்கொடை விவரங்களைச் சமர்ப்பிக்கவும்',
      'donate.alertRequired': 'முழு பெயர், மின்னஞ்சல் மற்றும் தொகை ஆகிய கட்டாய புலங்களை நிரப்பவும்.',
      'donate.alertTransId': 'பரிவர்த்தனை ஐடி / குறிப்பு எண்ணை உள்ளிடவும்.',
      'donate.alertSuccess': 'நன்றி! உங்கள் நன்கொடை விவரங்கள் சரிபார்ப்பிற்காக சமர்ப்பிக்கப்பட்டுள்ளன.',
      'donate.alertError': 'உங்கள் விவரங்களை சமர்ப்பிப்பதில் பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்.',
      'donate.copied': 'UPI ID நகலெடுக்கப்பட்டது!',

      // Get Involved Page
      'gi.home': 'முகப்பு',
      'gi.getInvolved': 'பங்கேற்க',
      'gi.introText': 'முதியோர்களின் வாழ்வில் தாக்கத்தை ஏற்படுத்துவதற்கும், உங்களை மேம்படுத்திக் கொள்வதற்கும் எங்களோடு இணைந்து பணியாற்ற விரும்பினால், உங்களிடமிருந்து விவரங்களைப் பெற நாங்கள் மகிழ்ச்சியடைவோம். பின்வரும் வழிகளில் ஏதேனும் ஒன்றில் நீங்கள் எங்களோடு இணையலாம்:',
      'gi.everyContribution': 'ஒவ்வொரு பங்களிப்பும் முக்கியமானது',
      'gi.donateSub': 'உங்கள் நன்கொடை, பின்தங்கிய மில்லியன் கணக்கான முதியவர்களுக்காக நடத்தப்படும் சுகாதார, முதியோர் பராமரிப்பு மற்றும் வாழ்வாதார திட்டங்களுக்கு நேரடியாக ஆதரவளிக்கிறது.',
      'gi.donateNow': 'இப்போதே நன்கொடை அளியுங்கள்',
      'gi.contactUs': 'எங்களைத் தொடர்பு கொள்ளவும்',

      // Footer
      'footer.stayUpdated': 'எங்களின் சமீபத்திய செய்திகளைப் பெற எங்களோடு இணைந்திருங்கள்',
      'footer.subscribe': 'சந்தா செலுத்துங்கள்',
      'footer.emailPlaceholder': 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்',
      'footer.aboutUs': 'எங்களைப் பற்றி',
      'footer.aboutAazhi': 'ஆழி பற்றி',
      'footer.awards': 'விருதுகள் & அங்கீகாரம்',
      'footer.financials': 'நிதிநிலை',
      'footer.publications': 'வெளியீடுகள்',
      'footer.partners': 'பங்காளிகள்',
      'footer.news': 'செய்திகள்',
      'footer.supportUs': 'ஆதரவு வழங்க',
      'footer.pwd': 'மாற்றுத்திறனாளிகள்',
      'footer.volunteer': 'தன்னார்வலர்',
      'footer.csr': 'நிறுவன சிஎஸ்ஆர் (CSR)',
      'footer.legacy': 'பாரம்பரிய நன்கொடை',
      'footer.importantLinks': 'முக்கியமான இணைப்புகள்',
      'footer.careers': 'வேலை வாய்ப்புகள்',
      'footer.privacy': 'தனியுரிமைக் கொள்கை',
      'footer.terms': 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
      'footer.refund': 'நன்கொடை திரும்பப் பெறும் கொள்கை',
      'footer.contactUs': 'எங்களைத் தொடர்பு கொள்ளவும்',
      'footer.brochure': 'விளக்கப் புத்தகம்',
      'footer.annualReport': 'ஆண்டு அறிக்கை',
      'footer.payUPI': 'ஏதேனும் UPI செயலிகளைப் பயன்படுத்தி செலுத்தவும்',
      'footer.orgName': 'நிறுவனத்தின் பெயர்',
      'footer.donateNow': 'இப்போதே நன்கொடை அளியுங்கள்',
      'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      'footer.developedBy': 'உருவாக்கியவர்',

      // Dynamic Days & Timings
      'day.Sunday': 'ஞாயிற்றுக்கிழமை',
      'day.Monday': 'திங்கட்கிழமை',
      'day.Tuesday': 'செவ்வாய்க்கிழமை',
      'day.Wednesday': 'புதன்கிழமை',
      'day.Thursday': 'வியாழக்கிழமை',
      'day.Friday': 'வெள்ளிக்கிழமை',
      'day.Saturday': 'சனிக்கிழமை',
      'time.Holiday': 'விடுமுறை',
      'time.Closed': 'மூடப்பட்டுள்ளது'
    }
  };

  private getInitialLanguage(): LangType {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('lang');
      if (stored === 'ta' || stored === 'en') {
        return stored;
      }
    }
    return 'en';
  }

  getCurrentLanguage(): LangType {
    return this.currentLangSubject.value;
  }

  setLanguage(lang: LangType): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', lang);
    }
    this.currentLangSubject.next(lang);
    // Reload the page to load all components and call API with selected lang
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }

  translate(key: string): string {
    const lang = this.getCurrentLanguage();
    return this.translations[lang]?.[key] || key;
  }
}
