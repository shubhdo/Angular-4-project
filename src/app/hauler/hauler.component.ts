import {
  Component,
  OnInit
} from '@angular/core';
import {
  ListService
} from '../services/list.service';
import {
  ToastrService
} from 'ngx-toastr';
//importing classes 
@Component({
  selector: 'app-hauler',
  templateUrl: './hauler.component.html',
  styleUrls: ['./hauler.component.css']
})
export class HaulerComponent implements OnInit {

  constructor(private listService: ListService, public toastr: ToastrService) {}
  key: string = 'created_at'; //set default
  //sort user in list
  reverse: boolean = true;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  obj: any
  tempData: any = []
  getData = function () { //function to fetch all haulers
    this.listService.fetchAllHaulers().subscribe((data) => {
      this.listData = data.users
      this.tempData = data.users
      this.date = null
    })
  }
  fetchAllHaulers = function () {
    this.getData()
  }

  fetchHaulersDate = function () { //function to filter data by date
    var data: any = {};
    var date = new Date(this.date)

    var filteredData = []
    this.tempData.map(function (data) {

      if (new Date(data.created_at).getDate() == date.getDate() && new Date(data.created_at).getFullYear() == date.getFullYear() && new Date(data.created_at).getMonth() == date.getMonth())
        filteredData.push(data)
    })
    this.listData = filteredData


  }

  add() { //function to add hauler in admin panel
    var user = {
      user: this.obj
    }
    this.listService.addHauler(user).subscribe((data) => {
      if (data.responseCode == 201) {
        this.toastr.success("User created Successfully")
        this.getData()
      } else {
        this.toastr.error("Something went wrong")
        this.getData()
      }
    }, (err) => {
      if (JSON.parse(err._body).responseMessage == 11000)
        this.toastr.error("Hauler Id should be unique")
      else
        this.toastr.error(JSON.parse(err._body).responseMessage)

    })
  }
  ngOnInit() { //Variable initialization
    this.getData()
    this.obj = {}
    this.obj.role = 'Hauler'
    this.obj.password = "123"
    this.obj.location = {}
    this.obj.location.coordinates = [12, 55]
  }



}
