import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GetInvolvedComponent } from './pages/get-involved/get-involved.component';
import { ImpactStoriesComponent } from './pages/impact-stories/impact-stories.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { GalleryDetailComponent } from './pages/gallery/gallery-detail/gallery-detail.component';
import { DonateComponent } from './pages/donate/donate.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'about-us', component:AboutComponent},
  { path: 'our-work/healthcare', redirectTo: 'about-us', pathMatch: 'full' },
  { path: 'our-work/agecare', redirectTo: 'about-us', pathMatch: 'full' },
  { path: 'our-work/livelihoods', redirectTo: 'about-us', pathMatch: 'full' },
  { path: 'our-work/advocacy', redirectTo: 'about-us', pathMatch: 'full' },
  { path: 'advantage-60', redirectTo: 'home', pathMatch: 'full' },
  { path: 'walk-in-my-shoes', redirectTo: 'home', pathMatch: 'full' },

  { path: 'partners', redirectTo: 'about-us', pathMatch: 'full' },
  { path: 'contact', component:ContactComponent},
  { path: 'blog', component:BlogComponent},
  { path: 'get-involved', component: GetInvolvedComponent},
  { path: 'impact-stories', component: ImpactStoriesComponent},
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:id', component: GalleryDetailComponent },
  { path: 'donate', component: DonateComponent },
];
