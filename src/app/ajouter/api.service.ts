import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postFreelance(data : any){
  return this.http.post<any>("http://localhost:3000/posts", data)
  .pipe(map((res:any)=>{ return res;
  }))
 
  }
  getFreelance(id : number){
  return this.http.get<any>("http://localhost:3000/posts/"+id)
  .pipe(map((res:any)=>{ return res;
  }))
 
  }
  

 
  getAllFreelance(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{ return res;
  }))
  }


  deletFreelance(id :number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{ return res;
  }))
  }

  updateFreelance(data :any,id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{return res;
  }))
  } 

}
