
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee/employeedata';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  subject = new Subject<Employee[]>();

  constructor(private http: HttpClient) { 
  }

  setAllEmployees() {
    this.http.get("http://localhost:3000/posts")
    .subscribe((data: any) => {

      this.subject.next(data);

    }, 
    error => {
      console.log("Error while fetching all employees");
    });

  }

  getAllEmployees(): Observable<Employee[]> {
    this.setAllEmployees();
    return this.subject.asObservable();         
  }

  addNewEmployee(formData: Employee) {
    let data = this.cleanData(formData);
    this.http.post("http://localhost:3000/posts/", data)
    .subscribe((data: any) => {
      console.log(data);
      this.getAllEmployees();
    },
    error => {
      console.log("Error while adding new user");
    })
  }

  cleanData(formData: Employee): Employee {
    let data: Employee = formData;
    if(data.odcNonOdc == '')
      delete data.odcNonOdc;
    if(data.bu == '')
      delete data.bu;
    if(data.project == '')
      delete data.project;
    
    return data;

  }

  deleteEmployee(formData : Employee) {
    let id = formData.id;
    this.http.delete(`http://localhost:3000/posts/${id}`)
    .subscribe((data: any) => {
      console.log(data);
      this.getAllEmployees();
    }, 
    error => {
      console.log("Error while deleting employee");
    })

  }

  updateEmployee(formData: Employee, id: string) {
    let data = this.cleanData(formData);
    this.http.put(`http://localhost:3000/posts/${id}`, data)
    .subscribe((data: any) => {
      console.log(data);
      this.getAllEmployees();
    }, 
    error => {
      console.log("Error while updating employee")
    })
  }

}
