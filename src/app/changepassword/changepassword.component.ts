import { Component, OnInit ,Inject,TemplateRef,ViewChild, Pipe,PipeTransform} from '@angular/core';
import {ListService} from '../services/list.service';
import { ToastrService } from 'ngx-toastr';
import {Router, CanActivate} from '@angular/router';
//importing classes
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private listService:ListService,public toastr: ToastrService,private router:Router) { }
  //initialzing variables 
  changePassword:any={}
  newPassword:any;
  obj:any={}
  ngOnInit() {

  }

  changePasswordFunc(data) {      //function to change password 
    this.obj.id=JSON.parse(localStorage.getItem('user'))._id
    this.obj.newPassword=data.newPassword
    this.obj.oldPassword=data.oldPassword
    this.listService.changeAdminPassword(this.obj).subscribe((response)=> {
        if(response.responseCode==200) {
        this.toastr.success('Password Successfully changed')
        this.router.navigate(['/profile'])
        }
        else
        this.toastr.error(response._body.responseMessage)
    },(err)=> {
      this.toastr.error(err._body.responseMessage)
    })
  }

}
