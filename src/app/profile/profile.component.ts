import {
  Component,
  OnInit,
  Inject,
  TemplateRef,
  ViewChild,
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import {
  ListService
} from '../services/list.service';
//import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  ActivatedRoute
} from '@angular/router';
import {
  ToastrService
} from 'ngx-toastr';
//importing classes
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //intialzing variables to store data
  adminData: any = {}
  dataToEdit: any = {}
  img: string
  obj: any = {}
  data: any = {}
  pickupType: any;
  recyclewastetype: any;
  show_recyclewastetype: boolean = false;
  show_pickuptype: boolean = false;
  obj1: any = {}
  constructor(private route: ActivatedRoute, private listService: ListService, public toastr: ToastrService, private fb: FormBuilder) {}

  ngOnInit() { //fetch admin info
    this.fetchAdminInfo();

    this.listService.getPickyptypes().subscribe((data) => { //pickup type list
      this.pickupType = data.response
    })
    this.listService.getRecycleWasteType().subscribe((data) => { //recyclewaste type list on init
      this.recyclewastetype = data.response
    })


  }

  fetchAdminInfo() { //fetch admin info function
    var data: any = {};
    data._id = JSON.parse(localStorage.getItem('user'))._id
    this.listService.getAdminInfo(data).subscribe((data) => {
      if (data.response)
        this.adminData = data.response
    })

  }

  public fileChangeEvent(fileInput: any) { //function to show image when selected
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (e: any) => {
        ( < HTMLImageElement > document.getElementById('OpenImgUpload')).src = e.target.result
        this.data.img = e.target.result
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  addRecyclewastetype() { //function to add recycle waste type

    this.show_recyclewastetype = !this.show_recyclewastetype
    if (this.obj1.wasteType) {
      this.listService.addRecycleWasteType(this.obj1).subscribe((data) => {
        if (data.responseCode == 200) {
          this.recyclewastetype = data.response
          this.toastr.success("Successfully added")
          this.obj1.wasteType = null

        } else {
          this.toastr.error('Something went wrong')
        }

      }, (err) => {

        this.toastr.error(JSON.parse(err._body).responseMessage)
      })
    }

  }
  addPickyptype() { //function to add pickup type

    this.show_pickuptype = !this.show_pickuptype
    if (this.obj1.pickupType) {
      this.listService.addPickyptypes(this.obj1).subscribe((data) => {
        if (data.responseCode == 200) {
          this.pickupType = data.response
          this.toastr.success("Successfully added")
          this.obj1.pickupType = null

        } else {
          this.toastr.error('Something went wrong')
        }
      }, (err) => {

        this.toastr.error(JSON.parse(err._body).responseMessage)
      })
    }
  }

  deleteRecyclewastetype(type) { //function to delete recycle waste type
    this.obj1.wasteType = type;


    if (this.obj1.wasteType) {
      this.listService.deleteRecycleWasteType(this.obj1).subscribe((data) => {
        if (data.responseCode == 200) {
          this.recyclewastetype = data.response
          this.toastr.success("Successfully Removed")
          this.obj1.wasteType = null

        } else {
          this.toastr.error('Something went wrong')
        }

      }, (err) => {

        this.toastr.error(JSON.parse(err._body).responseMessage)
      })
    }

  }
  deletePickyptype(type) { //function to delete pickup type
    this.obj1.pickupType = type

    if (this.obj1.pickupType) {
      this.listService.deletePickyptypes(this.obj1).subscribe((data) => {
        if (data.responseCode == 200) {
          this.pickupType = data.response
          this.toastr.success("Successfully removed")
          this.obj1.pickupType = null

        } else {
          this.toastr.error('Something went wrong')
        }
      }, (err) => {

        this.toastr.error(JSON.parse(err._body).responseMessage)
      })
    }
  }
  changeImage() { //function to change image of admin	
    if (!this.data.img) {
      this.toastr.error('Please first select your image');
    } else {
      this.data.adminId = JSON.parse(localStorage.getItem('user'))._id


      this.listService.changeAdminPic(this.data).subscribe((response) => {
          if (response.responseCode == 200) {
            this.toastr.success('Image Successfully changed')
            this.fetchAdminInfo()
          } else
            this.toastr.error(response._body.responseMessage)
        },
        (err) => {

          this.toastr.error(JSON.parse(err._body).responseMessage)

        })
    }
  }

  imageIsLoaded(e) { //function to load image 
    this.img = e.target.result;
    ( < HTMLImageElement > document.getElementById('OpenImgUpload')).src = this.img
    this.dataToEdit.img = this.img
  }
  clicked() { //function to change admin info
    this.obj.userId = JSON.parse(localStorage.getItem('user'))._id;
    this.obj.dataToUpdate = {}
    this.obj.dataToUpdate.username = this.adminData.username
    this.obj.dataToUpdate.email = this.adminData.email
    this.obj.dataToUpdate.phone = this.adminData.phone
    this.listService.editAdminInfo(this.obj).subscribe((data) => {
      if (data.responseCode == 200) {
        this.toastr.success("Admin Details Changed Successfully")
        this.fetchAdminInfo()
      } else
        this.toastr.error(data.responseMessage)
    }, (err) => {
      this.toastr.error("Something went wrong")
    })
  }


}
