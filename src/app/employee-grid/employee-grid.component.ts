import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription} from 'rxjs';
import gql from 'graphql-tag';
import {Employee, allEmployees} from '../shared/employee.interface';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent implements OnInit {
cols:any[];
emp: Employee[];
empSubscription: Subscription;

constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.cols = [
    { field: 'employee_id', header: 'S.No' },
    { field: 'firstname', header: 'First Name' },
    { field: 'lastname', header: 'Last Name' }
  ];

  this.empSubscription = this.apollo.watchQuery<allEmployees>({
       query: gql`
         query allEmployees{
           allEmployees {
             employee_id
             firstname
             lastname
           }
         }
       `
     }).valueChanges
       .subscribe(({ data, loading }) => {
          this.emp = data.allEmployees;
      });
   }

   ngOnDestroy() {
    this.empSubscription.unsubscribe();
  }



}
