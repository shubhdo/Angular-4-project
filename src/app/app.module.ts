import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MyFilterPipe } from './dashboard/dashboard.component'
import { ProfileComponent } from './profile/profile.component';

import {AuthService} from './services/auth.service';
import {ListService} from './services/list.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {ChartsModule} from 'ng2-charts';
import {AuthGuard} from './guard/auth.guard';
import { CustomerRequestComponent } from './customer-request/customer-request.component';
import { UsersComponent } from './users/users.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { HaulerComponent } from './hauler/hauler.component';
import {ModalModule} from "ng2-modal";
import {DpDatePickerModule} from 'ng2-date-picker';
import {MatNativeDateModule} from '@angular/material';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { DateTimePickerModule} from 'ngx-datetime-picker';

const appRoutes:Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'requestPanel',component:CustomerRequestComponent,canActivate:[AuthGuard]},
  {path:'users',component:UsersComponent,canActivate:[AuthGuard]},
  {path:'haulers',component:HaulerComponent,canActivate:[AuthGuard]},
  {path:'changePassword',component:ChangepasswordComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/', pathMatch: 'full' }
]
//importing modules
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    MyFilterPipe,
    ProfileComponent,
    CustomerRequestComponent,
    UsersComponent,
    HaulerComponent,
    ChangepasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpModule,
    ChartsModule,
    FormsModule,
    ModalModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
    }), // ToastrModule added
    NgxPaginationModule,
    Ng2OrderModule,
    //BsModalModule
    //BootstrapModalModule
    DpDatePickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateTimePickerModule,
    Ng2DatetimePickerModule,
    ReactiveFormsModule,
    NguiDatetimePickerModule
  ],
  providers: [AuthService,ListService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
//exporting class 