import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FreelanceModel2 } from '../excel/freelance-excel.modal';
import { ApiService } from '../ajouter/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue!: FormGroup;
  freelanceModelObj: FreelanceModel2 = new FreelanceModel2();
  freelanceData !: any;
  ExcelNb: string = "";
  WebNB: string ="";
  MobileNB: string="";

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
    this.nbexcel();
    this.nbweb();
    this.nbmobile();
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
    
    this.ExcelNb= count.toString();

    })
    
     
}
nbweb() {
    
    
  var count=0 ;
  this.api.getAllFreelance().subscribe(res => {

    try{
    
    for (let r of res) {
     
      if (r.categorie === '2') {
       
        count= count+1;
      }
      
    }
    }catch (error) {
      console.error(error);
  }
  
  this.WebNB= count.toString();

  })
  
   
}

nbmobile() {
    
    
  var count=0 ;
  this.api.getAllFreelance().subscribe(res => {

    try{
    
    for (let r of res) {
     
      if (r.categorie === '1') {
       
        count= count+1;
      }
      
    }
    }catch (error) {
      console.error(error);
  }
  
  this.MobileNB= count.toString();

  })
  
   
}
}
