import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GroupValidatorComponent } from './group-validator.component';
import { ValidatorEnableIfComponent } from './validator-enable-if.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupValidatorComponent,
    ValidatorEnableIfComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
