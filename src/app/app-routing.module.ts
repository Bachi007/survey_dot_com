import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { FormsComponent } from './forms/forms.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ViewformComponent } from './viewform/viewform.component';
import { ResponsesComponent } from './responses/responses.component';
import { HomeComponent } from './home/home.component';
import { DisplayallComponent } from './displayall/displayall.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdmindashboardComponent,
  children:[
    {path:'home',component:HomeComponent},
    {path:'display',component:DisplayallComponent},
    {path:'forms',component:FormsComponent},
    {path:'responses',component:ResponsesComponent}
  ]
  },
  {path:'form/:formId',component:ViewformComponent},
  {path:'admin',component:AdmindashboardComponent},
  {path:'forms',component:FormsComponent},
  {path:'user',component:UserdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
