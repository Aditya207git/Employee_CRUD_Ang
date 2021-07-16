import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddempdataComponent } from './addempdata/addempdata.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { RemoveempdataComponent } from './removeempdata/removeempdata.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './menu/menu.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    AddempdataComponent,
    MenuComponent,
    RemoveempdataComponent,
  ],
  entryComponents: [
    AddempdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule, 
    MatDialogModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
