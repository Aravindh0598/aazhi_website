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
