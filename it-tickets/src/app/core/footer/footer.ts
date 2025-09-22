import { Component } from '@angular/core';
import { reactiveLinks } from '../../shared/router-links/router-links';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  public reactiveLinks = reactiveLinks;
}