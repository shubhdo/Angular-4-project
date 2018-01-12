import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ListService
} from '../services/list.service';
import {
  DatePipe
} from '@angular/common';
import {
  FlashMessagesService
} from 'angular2-flash-messages';
import {
  ToastrService
} from 'ngx-toastr';
import {
  DateTimePickerComponent
} from "ng-pick-datetime/picker.component"
//importing classes 

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrls: ['./customer-request.component.css']
})
export class CustomerRequestComponent implements OnInit {
  @ViewChild(DateTimePickerComponent) picker: DateTimePickerComponent;


  constructor(private listService: ListService, public toastr: ToastrService) {}
  //sorting list using selected key
  key: string = 'created_at'; //set default
  reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  //intialzing variables to store data
  listData: any = [];
  obj: any = {}
  obj1: any = {}
  data: any = {}
  selectedStatus: any;
  postId: String;
  sellerId: String;
  getInfo: any = {};
  customerCode: String;
  tempData: any = [];
  updatedCount: number;
  link: any
  status = [
    "Pending",
    "In Progress",
    "Successful"
  ]
  myVar: Boolean = false
  changeFn = function () {
    this.myVar = true
  }


  fetchRequestsByDate = function () { //function to filter user data by date
    var data: any = {};
    var data: any = {};
    var date = new Date(this.date)

    var filteredData = []
    this.tempData.map(function (data) {

      if (new Date(data.created_at).getDate() == date.getDate() && new Date(data.created_at).getFullYear() == date.getFullYear() && new Date(data.created_at).getMonth() == date.getMonth())
        filteredData.push(data)
    })
    this.listData = filteredData
    this.selectedStatus = this.status[0]
    for (var i = 0; i < this.listData.length; i++) {
      if (this.listData[i].status == 0) { // to show request status on list
        this.listData[i].selectStatus = 'Pending'
      } else if (this.listData[i].status == 1) {
        this.listData[i].selectStatus = 'In Progress'
      } else {
        this.listData[i].selectStatus = 'Successful'
      }

    }

  }

  fetchAllRequest = function () { //fetch all request 
    this.date = null

    this.getData()
  }

  ngOnInit() { //function to fetch all request info on init
    this.obj1 = {}
    this.getData()

  }

  onDateChange = function () {
    document.getElementById('dateStyle').removeAttribute("style")
  }

  downloadImage(url) { //function to download image by url
    let name = Date.now() + ".jpg"
    this.link = document.createElement("a");
    this.link.download = name;
    this.link.href = url;
    document.body.appendChild(this.link);
    this.link.click();
    document.body.removeChild(this.link);
    delete this.link;
  }
  changePickupStatus = function (data) { //function to change pick up status 
    data.postId = data._id;
    data.status = this.status.indexOf(data.selectStatus);
    this.listService.changePickupStatus(data).subscribe(response => {
      if (response.responseCode == 200)
        this.toastr.success('Successfully Updated');
      else
        this.toastr.error("Something went wrong")
    })

  }

  currentPost(postId, customerCode, updatedCount) { //show data of a  request when modal opens
    this.postId = postId;
    this.customerCode = customerCode;
    this.updatedCount = updatedCount
    this.data.haulerId = this.obj1.haulerId;
    if (this.data.haulerId) {
      this.listService.getHaulerInfo(this.data).subscribe((response) => {
        if (response.responseCode == 200) {
          this.obj1 = response.response
          this.obj1.approxTime = new Date(response.response.approxTime)
        } else
          this.obj1 = {}
      })
    } else {
      this.obj1 = {}
    }
  }

  assignHauler() { //function to assign hauler 
    this.obj.postId = this.postId;
    this.obj.haulerId = this.obj1.haulerId
    this.obj.approxTime = new Date(this.obj1.approxTime)
    this.obj.totalPayment = this.obj1.totalPayment;
    this.obj.weightbyHauler = this.obj1.weightbyHauler;
    this.listService.assignHauler(this.obj).subscribe(data => {
      if (data.responseCode == 200) {
        this.toastr.success('Successfully Updated');
        this.listService.sendNotificationToUser(this.sellerId).subscribe(data => {
          if (data.success)
            this.toastr.success('Notification sent');
          else
            this.toastr.error('Notification is not sent to user')

        })

        this.getData();
      } else
        this.toastr.error("Something went wrong")

    }, err => {
      this.toastr.error(JSON.parse(err._body).responseMessage)

    })
  }

  closeForm() {}

  getHaulerInfo() { //function to load hauler info
    if (this.obj1.haulerId.length > 4)
      this.getInfo.haulerId = this.obj1.haulerId
    if (this.getInfo.haulerId) {
      this.listService.getHaulerInfo(this.getInfo).subscribe((response) => {
        if (response.response) {
          this.obj1 = response.response
          this.obj1.approxTime = new Date(response.response.approxTime)
        } else {
          var haulerId = this.obj1.haulerId
          this.obj1 = {}
          this.obj1.haulerId = haulerId
        }
      })
    }
  }
  getData = function () { //function to load all requests
    this.selectedStatus = this.status[0]
    this.listService.fetchCustomerRequest().subscribe(data => {
      this.listData = data.response
      for (var i = 0; i < this.listData.length; i++) {
        if (this.listData[i].status == 0) {
          this.listData[i].selectStatus = 'Pending'
        } else if (this.listData[i].status == 1) {
          this.listData[i].selectStatus = 'In Progress'
        } else {
          this.listData[i].selectStatus = 'Successful'
        }

      }
      this.tempData = this.listData

    })

  }

}
