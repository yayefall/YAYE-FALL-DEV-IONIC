import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  mySegment = 'Beneficiaire';
retrait = false;
  constructor() { }

  ngOnInit() {
  }

  getRetrait() {
    console.log('cheikh ibra');
    this.retrait = true;
    return this.retrait;
  }
}
