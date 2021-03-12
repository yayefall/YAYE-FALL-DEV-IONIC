import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {RetraitService} from '../Services/retrait.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  mySegment = 'Beneficiaire';
 retrait = false;
  retire;
  code: string;

  formRetrait = this.formbuilder.group({
    CNIBeneficiaire: ['', [Validators.required]],
  });
  constructor(private formbuilder: FormBuilder,
              private retraitService: RetraitService,
              private route: Router) { }

  ngOnInit() {
  }

  getCode() {
    this.retrait = true;
    this.retraitService.getClient({code: this.code}).subscribe(
      data => {
        this.retire = data;
        console.log(this.retire);
      });
  }

  doRetrait(){
    const retrais = {
      code: this.code,
      CNIBeneficiaire: this.formRetrait.controls.CNIBeneficiaire.value
    };
    this.retraitService.putRetrait(retrais).subscribe(
      data => {
        alert('retrait avec succes');
        this.route.navigate(['/depot']);
      },
      (error: any) => {
        alert('erreur dinsertion');
      }
  );

  }

}
