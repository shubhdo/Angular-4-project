import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ListService {
  url:string="http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:5000";
  //url:string="http://localhost:5000"		
  //services to fetch data from api
  constructor(private http:Http) { }
  fetchList(user){			//api call for fetching users in dashboard
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('https://gargeoncontact.herokuapp.com/lists',user,{headers:headers}).map(res => res.json());
  }
  fetchPost(post){			//api call for fetching posts in dashboard
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('https://gargeoncontact.herokuapp.com/posts',post,{headers:headers}).map(res => res.json());
  }

  fetchCustomerRequest() {  //api call for fetching all customer requests
	return this.http.get(this.url+'/api/v1/admin/getAllRequests').map(res => res.json());
 }

 changePickupStatus(data) {		//api call for changing pick up status in admin panel
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	 return this.http.post(this.url+'/api/v1/admin/changePickupStatus',data,{headers:headers}).map(res => res.json())
 }

 fetchAllUsers() {			//api call for fetching all users
	 return this.http.get(this.url+'/api/v1/users').map(res=>res.json())
 }

 fetchUserByDate(data) {		//fetching user by date
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	 return this.http.post(this.url+'/api/v1/admin/getUsersByDate',data,{headers:headers}).map(res=> res.json())
 }

 fetchRequestsByDate(data) {	//fetching requests by date
   let headers = new Headers();
   headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/admin/getRequestsByDate',data,{headers:headers}).map(res=> res.json())
}

fetchHaulersByDate(data) {		//fetching haulers by date
   let headers = new Headers();
   headers.append('Content-Type','application/json');
	return this.http.post('http://localhost:5000/api/v1/admin/getHaulersByDate',data,{headers:headers}).map(res=> res.json())
}

addHauler(data) {				//api call for adding haulers
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	 return this.http.post(this.url+'/api/v1/users/',data,{headers:headers}).map(res=> res.json(),err=> err)
}

fetchAllHaulers() {				//api call for fetching all hauelers in admin panel
	return this.http.get(this.url+'/api/v1/admin/getHaulerList').map(res=>res.json())
}

assignHauler(data) {			//api call for assigning hauler
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/admin/assignHauler',data,{headers:headers}).map(res=>res.json(),
err=> err)
}

getHaulerInfo(data) {		//api call for fetching hauler info
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/admin/getHaulerInfo',data,{headers:headers}).map(res=>res.json())
}

sendNotificationToUser(data) {			//api call for sending notifications to user
	let headers = new Headers();
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/push-notification/seller/'+data,headers).map(res=>res.json())
}

getAdminInfo(data) {					//api call for fetching admin info
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/admin/getAdminInfo',data,{headers:headers}).map(res=>res.json())
}

changeAdminPassword(data) {				//api call for changing admin password
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/admin/changePassword',data,{headers:headers}).map(res=>res.json(),
	err=> err)
}

editAdminInfo(data) {				//api call for edit admin info
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.put(this.url+'/api/v1/users/',data,{headers:headers}).map(res=>res.json(),
	err=> err)
}

changeAdminPic(data) {			//api call for changing admin pic
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/admin/changeAdminImage',data,{headers:headers}).map(res=>res.json(),
	err=> err.json())
}


getPickyptypes() {			//api call for fetching pick up types
	return this.http.get(this.url+'/api/v1/content/').map(res=>res.json())
}


getRecycleWasteType() {		//api call for fetching recycle waste types	
	return this.http.get(this.url+'/api/v1/content/getRecycleWasteType').map(res=>res.json())
}

addPickyptypes(data) {		//api call for adding pick up types
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/content/addPickupType',data,{headers:headers}).map(res=>res.json(),
	err=> err)
}

addRecycleWasteType(data) {   	//api call for adding recycle waste types
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/content/addRecycleWasteType',data,{headers:headers}).map(res=>res.json(),
	err=> err)
}

deletePickyptypes(data) {			//api call for delete pickup types
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/content/deletePickupType',data,{headers:headers}).map(res=>res.json(),
	err=> err)
}

deleteRecycleWasteType(data) {		//api call for delete recycle waste type
	let headers = new Headers();	
	headers.append('Content-Type','application/json');
	return this.http.post(this.url+'/api/v1/content/deleteRecycleWasteType',data,{headers:headers}).map(res=>res.json(),
	err=> err)
}

}