import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { GetInvolvedComponent } from './pages/get-involved/get-involved.component';
import { ImpactStoriesComponent } from './pages/impact-stories/impact-stories.component';

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
  { path: 'contact', component:ContactComponent},
  { path: 'blog', component:BlogComponent},
  { path: 'get-involved', component: GetInvolvedComponent},
  { path: 'impact-stories', component: ImpactStoriesComponent},
];
