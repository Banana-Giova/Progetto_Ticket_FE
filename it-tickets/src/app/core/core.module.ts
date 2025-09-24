import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Layout } from './layout/layout';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenuDefaultOptions, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider'
import { UserNotificationModule } from './notifications/user-notification.module';

@NgModule({
  declarations: [
    Header,
    Footer,
    Layout
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    UserNotificationModule
  ],
    providers: [
    {
      provide: MAT_MENU_DEFAULT_OPTIONS,
      useValue: <MatMenuDefaultOptions>{
        overlapTrigger: false,
        xPosition: 'before',
        yPosition: 'below',
        overlayPanelClass: 'my-menu-overlay-pane'
      }
    }
  ]
})
export class CoreModule {
  // Previene il re-import accidentale del CoreModule in altri feature module
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule è già stato importato. Importalo soltanto in AppModule.'
      );
    }
  }
}