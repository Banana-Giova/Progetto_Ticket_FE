import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-spinner',
  standalone: false,
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.css']
})
export class Spinner implements OnInit {
  loading$: any;

  constructor(public loader: LoaderService) { }
  
  ngOnInit(): void {
      this.loading$ = this.loader.isLoading$;
  }
}