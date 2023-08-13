import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {
  constructor(private service:AuthService,private dialog:MatDialog){
    this.Loaduser();
  }
  

  userlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  Loaduser(){
    this.service.GetAll().subscribe(res=>{
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
  displayedColumns: string[] = ['username','name','email','role','status','action'];

  UpdateUser(code:any){
    const popup =this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'50%',
      data:{
        usercode:code
      }


    })
    popup.afterClosed().subscribe(res=>{

      this.Loaduser();
    })

  }
  OpenDialoge(){
   

  }


}
