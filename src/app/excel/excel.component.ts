import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ApiService } from '../ajouter/api.service';
import { FreelanceModel2 } from './freelance-excel.modal';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  formValue!: FormGroup;
  freelanceModelObj: FreelanceModel2 = new FreelanceModel2();
  freelanceData !: any;
  getExcel: string = "";
  categorie : string = "";
  Titre: string = "";
  Salaire: string = "";
  Description: string = "";
  mots: string = "";
  duree: string = "";
  date: string = "";

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  

  ngOnInit(): void {
    

    this.formValue = this.formbuilder.group({
      categorie: [''],
      Titre: [''],
      Salaire: [''],
      mots: [''],
      Description: [''],
      
    })
    this.getAllFreelance();
    this.nbexcel();
  
    
    
  }

  postFreelanceDetails() {
    this.freelanceModelObj.categorie = this.formValue.value.categorie;
    this.freelanceModelObj.Titre = this.formValue.value.Titre;
    this.freelanceModelObj.Salaire = this.formValue.value.Salaire;
    this.freelanceModelObj.Description = this.formValue.value.Description;
    this.freelanceModelObj.mots = this.formValue.value.mots;
    this.api.postFreelance(this.freelanceModelObj)
      .subscribe(res => {
        console.log(res);
        alert("projet ajouté avec succès")
        this.formValue.reset();
        this.getAllFreelance();
      }, err => {
        alert("Quelque chose s'est mal passé");
      })
  }

  getAllFreelance() {
  
    this.api.getAllFreelance().subscribe(res => {
      this.freelanceData = res;
           })
      
  }

  nbexcel() {
    
    
    var count=0 ;
    this.api.getAllFreelance().subscribe(res => {

      try{
      
      for (let r of res) {
       
        if (r.categorie === '3') {
         
          count= count+1;
        }
        
      }
      }catch (error) {
        console.error(error);
    }
    console.log('nombre des projets excel',count);
    this.getExcel= count.toString();

    })
    
   

    
   
    
}

  

  deletFreelance(row: any) {
    this.api.deletFreelance(row.id).subscribe(res => {
      alert("Project deleted");
      this.getAllFreelance();
      location.reload();
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

  show(row: any) {
    console.log("its workingggggggggg")
      this.freelanceModelObj.id = row.id;
      this.categorie=(row.categorie);
      this.Titre=(row.Titre);
      this.Salaire=(row.Salaire);
      this.Description=(row.Description);
      this.mots=(row.mots);
      this.date=(row.date);
      this.duree=(row.duree);
      console.log('detaille',row.Titre,row.categorie,row.Salaire,row.Description,row.mots);
    
  }
 


  updateFreelanceDetails() {
    this.freelanceModelObj.categorie=this.formValue.value.categorie;
    this.freelanceModelObj.Titre = this.formValue.value.Titre;
    this.freelanceModelObj.Salaire = this.formValue.value.Salaire;
    this.freelanceModelObj.Description = this.formValue.value.Description;
    this.freelanceModelObj.mots = this.formValue.value.mots;


    this.api.updateFreelance(this.freelanceModelObj, this.freelanceModelObj.id)
      .subscribe(res => {
        alert("Update successfuly");
        this.getAllFreelance();
        location.reload();
      })
  }

    

 

}
