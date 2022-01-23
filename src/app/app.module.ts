import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SendDialogComponent } from './actions/send-dialog/send-dialog.component';
import { DownloadDialogComponent } from './actions/download-dialog/download-dialog.component';
import { CtaConfigWrapperComponent } from './action-buttons/cta-config-wrapper/cta-config-wrapper.component';
import { CtaActionDirective } from './action-buttons/cta-action.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SendDialogComponent,
    DownloadDialogComponent,
    CtaConfigWrapperComponent,
    CtaActionDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
