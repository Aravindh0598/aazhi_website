import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{


  activeWorkTab: 'healthcare' | 'agecare' | 'livelihoods' | 'advocacy' = 'healthcare';
  currentSlide = 0;
  private slideInterval: any;
  heroSlide = 0;
  private heroSlideInterval: any;

  workTabs = [
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'agecare',    label: 'Agecare' },
    { id: 'livelihoods', label: 'Livelihoods & Emergencies' },
    { id: 'advocacy',   label: 'Awareness & Advocacy' }
  ];

  programsMap: Record<string, { icon: string; title: string; desc: string; route: string }[]> = {
    healthcare: [
      { icon: '🏥', title: 'Primary Healthcare',            desc: 'Mobile Health Units providing doorstep medical services to elderly in rural and urban areas across India.',       route: '/our-work/healthcare' },
      { icon: '👁️', title: 'Vision Restoration & Correction', desc: 'Screening camps and surgeries to restore vision and reduce blindness among elders.',                          route: '/our-work/healthcare' },
      { icon: '🧠', title: 'Mental Health',                 desc: 'Counselling and awareness programs addressing depression and cognitive decline in elders.',                    route: '/our-work/healthcare' },
      { icon: '📱', title: 'Telehealth',                    desc: 'Remote health consultations bringing specialist care to elders who cannot travel.',                           route: '/our-work/healthcare' },
      { icon: '🌿', title: 'Palliative Care',               desc: 'Compassionate end-of-life care and pain management for seriously ill elders.',                                route: '/our-work/healthcare' },
    ],
    agecare: [
      { icon: '📞', title: 'Elder Helplines',       desc: '24x7 toll-free helpline providing legal, financial, emotional and emergency support to elders.',                      route: '/our-work/agecare' },
      { icon: '🏠', title: 'Senior Care Homes',     desc: 'Residential facilities offering dignified living, healthcare and community for abandoned elders.',                    route: '/our-work/agecare' },
      { icon: '🌟', title: 'Active Ageing Centres', desc: 'Spaces where elders gather for social activities, skill development and health monitoring.',                          route: '/our-work/agecare' },
      { icon: '💪', title: 'Physiocare',            desc: 'Physiotherapy services to restore mobility and independence in elderly patients.',                                    route: '/our-work/agecare' },
      { icon: '❤️', title: 'Caregiving',            desc: 'Training family members and paid caregivers to provide quality care to elders.',                                      route: '/our-work/agecare' },
      { icon: '♿', title: 'Mobility Aids',         desc: 'Distribution of wheelchairs, walkers and other assistive devices to elderly in need.',                                route: '/our-work/agecare' },
    ],
    livelihoods: [
      { icon: '🤝', title: 'Elder Self Help Groups', desc: 'Micro-finance and income generation through peer-led savings groups for elderly.',                                    route: '/our-work/livelihoods' },
      { icon: '🆘', title: 'Disaster Management',   desc: 'Rapid response and relief for elderly affected by floods, cyclones and other disasters.',                             route: '/our-work/livelihoods' },
    ],
    advocacy: [
      { icon: '🎓', title: 'Awareness & Training Workshops', desc: 'Sensitisation workshops for communities, institutions and government bodies on elder rights.',              route: '/our-work/advocacy' },
      { icon: '🎒', title: 'SAVE',                          desc: 'Student Action for Value Education – engaging youth to respect and support the elderly.',                   route: '/our-work/advocacy' },
      { icon: '⚖️', title: 'Policy Advocacy',               desc: 'Working with government to strengthen laws and policies protecting older persons.',                         route: '/our-work/advocacy' },
      { icon: '🔬', title: 'Research',                      desc: 'Generating evidence on ageing to inform policy, programs and public discourse.',                             route: '/our-work/advocacy' },
    ]
  };

  stats = [
    { value: '2,000,000', label: 'Elder lives were transformed' },
    { value: '1,25,000',  label: 'Elders received support through the Elder Helpline' },
    { value: '13,00,000', label: 'Elders received primary healthcare at their doorstep' },
    { value: '40,000',    label: 'Elders became independent through Elder Self Help Groups' },
    { value: '35,000',    label: 'Elders received vision restoration support' },
    { value: '77,000',    label: 'Elders received digital, financial and legal literacy' },
  ];

  impactStories = [
    {
      img: 'https://www.helpageindia.org/wp-content/uploads/2025/08/Angur-Rana.png',
      category: 'Livelihoods',
      date: 'August 2025',
      title: "Angur Rana's Journey from Petals to Profits",
      desc: "At 65, Angur Rana transformed her life through HelpAge India's Elder Self Help Group, turning flower cultivation into a thriving income source."
    },
    {
      img: 'https://picsum.photos/seed/elder2/400/260',
      category: 'Healthcare',
      date: 'July 2025',
      title: 'Seeing the World Again: A Vision Restoration Story',
      desc: "A remarkable journey from vision impairment to restoration through HelpAge India's eye care programme."
    },
    {
      img: 'https://picsum.photos/seed/elder3/400/260',
      category: 'Elder Helpline',
      date: 'June 2025',
      title: 'A Call That Changed Everything',
      desc: 'How one call to our elder helpline rescued a 78-year-old woman from an abusive situation and restored her dignity.'
    },
  ];

  get currentPrograms() {
    return this.programsMap[this.activeWorkTab] ?? [];
  }

  ngOnInit(): void {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.impactStories.length;
    }, 5000);

    this.heroSlideInterval = setInterval(() => {
    this.heroSlide = (this.heroSlide + 1) % this.heroSlides.length;
  }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
    clearInterval(this.heroSlideInterval);
  }

  setTab(tab: string): void {
    this.activeWorkTab = tab as any;
  }

  heroSlides = [
  {
    img: 'https://www.helpageindia.org/wp-content/uploads/2025/08/Angur-Rana.png',
    caption: "Let's fill their lives with the colours of joy"
  },
  {
    img: 'https://picsum.photos/seed/elder-health/600/480',
    caption: 'Healthcare reaching every doorstep'
  },
  {
    img: 'https://picsum.photos/seed/elder-community/600/480',
    caption: 'Building communities of care & dignity'
  },
  {
    img: 'https://picsum.photos/seed/elder-smile/600/480',
    caption: 'Empowering elders to live independently'
  },
];

setHeroSlide(i: number) {
  this.heroSlide = i;
}

}
