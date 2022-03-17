import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ApiService } from '../ajouter/api.service';
import { FreelanceModel } from './freelance-excel.modal';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  formValue!: FormGroup;
  freelanceModelObj: FreelanceModel = new FreelanceModel();
  freelanceData !: any;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      categorie: [''],
      Titre: [''],
      Salaire: [''],
      payer: [''],
      date:[''],
      duree:[''],
      mots: [''],
      Description: ['']
    })
    this.getAllFreelance();
    
  }

  postFreelanceDetails() {
    this.freelanceModelObj.categorie = this.formValue.value.categorie;
    this.freelanceModelObj.Titre = this.formValue.value.Titre;
    this.freelanceModelObj.Salaire = this.formValue.value.Salaire;
    this.freelanceModelObj.Description = this.formValue.value.Description;
    this.freelanceModelObj.payer = this.formValue.value.payer;
    this.freelanceModelObj.date = this.formValue.value.date;
    this.freelanceModelObj.duree = this.formValue.value.duree;
    this.freelanceModelObj.mots = this.formValue.value.mots;
    this.api.postFreelance(this.freelanceModelObj)
      .subscribe(res => {
        console.log(res);
        alert("projet ajouté avec succès")
        this.formValue.reset();
        this.getAllFreelance();
        location.reload();
      }, err => {
        alert("Quelque chose s'est mal passé");
      })
  }

  getAllFreelance() {
    this.api.getAllFreelance().subscribe(res => {
      this.freelanceData = res;
    })
  }

  deletFreelance(row: any) {
    this.api.deletFreelance(row.id).subscribe(res => {
      alert("Project deleted");
      this.getAllFreelance();
    })
  }

  onEdit(row: any) {
    console.log("its workingggggggggg")
      this.freelanceModelObj.id = row.id;
      this.formValue.controls['categorie'].setValue(row.categorie);
      this.formValue.controls['Titre'].setValue(row.Titre);
      this.formValue.controls['Salaire'].setValue(row.Salaire);
      this.formValue.controls['Description'].setValue(row.Description);
      this.formValue.controls['mots'].setValue(row.mots);
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhoooo',row.Titre,row.categorie,row.Salaire,row.Description,row.mots)
    
  }


  updateFreelanceDetails() {
    this.freelanceModelObj.Titre = this.formValue.value.Titre;
    this.freelanceModelObj.Salaire = this.formValue.value.Salaire;
    this.freelanceModelObj.Description = this.formValue.value.Description;
    this.freelanceModelObj.mots = this.formValue.value.mots;


    this.api.updateFreelance(this.freelanceModelObj, this.freelanceModelObj.id)
      .subscribe(res => {
        alert("Update successfuly");
        this.getAllFreelance();
      })
  }

}
