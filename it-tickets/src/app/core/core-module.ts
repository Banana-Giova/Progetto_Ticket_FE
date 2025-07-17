import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Layout } from './layout/layout';



@NgModule({
  declarations: [
    Header,
    Footer,
    Layout
  ],
  imports: [
    CommonModule
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