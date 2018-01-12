import { Component, OnInit,Inject,TemplateRef,ViewChild, Pipe,PipeTransform} from '@angular/core';
import {ListService} from '../services/list.service';
import {Router} from '@angular/router';
import {Http,Headers} from '@angular/http';
//importing classes
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
//client code ===========no changes done===================================
export class DashboardComponent implements OnInit {
	filterargs:any =new Date().getMonth();
	displayMonth:any =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	listData:any=[];
	displayData:any=[];
	choosen:any =0;
	public barChartOptions:any = {
    		scaleShowVerticalLines: false,
    		responsive: true,
         title: {
            display: true,
            text: 'Analysis post data for this year'
          }
  		};
      public barUserChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
         title: {
            display: true,
            text: 'Analysis user data for this year'
          }
      };
       public lineChartColors:Array<any> = [
    'red',    // color for data at index 0
    'blue',   // color for data at index 1
    'green',  // color for data at index 2
    'black',  // color for data at index 3
    //...
];
  	public barChartLabels:string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  	public barChartType:string = 'bar';
  	public barChartLegend:boolean = true;
    public totalArr:any=[0,0,0,0,0,0,0,0,0,0,0,0];
    public sucArr:any=[0,0,0,0,0,0,0,0,0,0,0,0];
    public penArr:any=[0,0,0,0,0,0,0,0,0,0,0,0];
	public barChartData:any[] = [
    		{data: this.totalArr, label: 'Total'},
    		{data: this.sucArr, label: 'Success'},
    		{data: this.penArr, label: 'Pending'}
  		];
  	public barChartDataUser:any[] = [
    		{data: this.sucArr, label: 'User'}
  		];
  	public stat:any;	
	constructor(private http:Http, private listService:ListService,private router:Router) { }
	ngOnInit() {
		  const user={};
  		this.listService.fetchList(user).subscribe(data=>{
  				this.displayData=data;
  				var temp=[0,0,0,0,0,0,0,0,0,0,0,0];
  				for(var i=0;i<data.length;i++)
  				{	var tempDate=new Date(data[i].created_at).getMonth();
  					temp[tempDate]++;
  				}
  				this.barChartDataUser=[
  				{data: temp, label: 'User'}
  			];
  		});
  		this.listService.fetchPost(user).subscribe(data=>{
	  		this.listData=data;
	  		for(var i=0;i<data.length;i++)
  			{		var tempDate=new Date(data[i].created_at).getMonth();
  					this.totalArr[tempDate]++;
  					if(data[i].weight==null)
  					{		this.penArr[tempDate]++
  					}
  					else
  					{		this.sucArr[tempDate]++
  					}
  			}
  			
  			this.barChartData = [
	    		{data: this.totalArr, label: 'Total'},
	    		{data: this.sucArr, label: 'Success'},
	    		{data: this.penArr, label: 'Pending'}
  			];
  			
  		})
  	}
  	refresh(){
		const user={};
  		this.listService.fetchList(user).subscribe(data=>{
  			this.listData=data;
  			
  		})
  	}
  	openDialog(template: TemplateRef<any>,a:any): void {
  	 	this.displayData=a;
  	}
  	
  	go(){
  		this.router.navigate(['/profile']);
  	}
     public chartClicked(e:any):void {

  }
 
  public chartHovered(e:any):void {
    
  }
}

@Pipe({
    name: 'myfilter'
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {

       

        
        return items.filter(item => new Date(item.created_at).getMonth()+1==filter);
    }

}
