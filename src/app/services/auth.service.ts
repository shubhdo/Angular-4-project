import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	
	authToken:any;
	user:any;
  
  constructor(private http:Http) { }
  //all authentication logic
  authenticate(user){
  	let headers = new Headers();
  	headers.append('Content-Type','application/json');
  	return this.http.post('http://ec2-52-76-162-65.ap-southeast-1.compute.amazonaws.com:5000/api/v1/admin/adminLogin',user,{headers:headers}).map(res => res.json());
  }
  storeUserData(token,user){
  	localStorage.setItem('id_token',token);
  	localStorage.setItem('user',JSON.stringify(user));
  	this.authToken=token;
  	this.user=user;
  }
  logout(){
  	this.authToken=null;
  	this.user=null;
  	localStorage.clear();
  }
  loadToken(){
  	const token=localStorage.getItem('id_token');
  	this.authToken=token;
  }
  loggedIn(){
  	return tokenNotExpired('id_token');
  }
}
