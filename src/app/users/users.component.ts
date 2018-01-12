import { Component, OnInit } from '@angular/core';
import {ListService} from '../services/list.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private listService:ListService) { }

  key: string = 'created_at'; //set default
  //apply sorting on list
  reverse: boolean = true;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  listData:any=[];    
  tempData:any=[]   //to store filtered data
  fetchUsersDate=function() {       //function to filter data by date
  var data:any={};
  var date=new Date(this.date)
  
   var filteredData=[]
  this.tempData.map(function(data) {
    
    if(new Date(data.created_at).getDate()== date.getDate() && new Date(data.created_at).getFullYear()== date.getFullYear() && new Date(data.created_at).getMonth()== date.getMonth())
    filteredData.push(data)
  })
  this.listData=filteredData
  
  }

  fetchAllUsers=function() {  //fetch all users
    this.getData()
  }
  ngOnInit() {        //fetch all users on init
    this.getData()
  }
  getData=function() {
    this.listService.fetchAllUsers().subscribe((data)=> {
      this.listData=data.users
      this.tempData=data.users
      this.date=null
    })
  } 
}
