import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {
  editdata: any;
  constructor(private builder:FormBuilder,private service:AuthService,
    @Inject(MAT_DIALOG_DATA)public data:any,private toaster:ToastrService,private dialog:MatDialogRef<UpdatepopupComponent>){}
  ngOnInit(): void {
   this.service.GetAllRole().subscribe(res=>{
    this.rolelist=res;
   });
   if(this.data.usercode!=null && this.data.usercode!=''){
    this.service.Getbycode(this.data.usercode).subscribe(res=>{
      this.editdata = res;
      this.registerform.setValue({id:this.editdata.id,name:this.editdata.name, email:this.editdata.email, password:this.editdata.password, role:this.editdata.role, genre:this.editdata.genre, isactive:this.editdata.isactive})

    })
   }
  }
  rolelist:any;
  registerform=this.builder.group({
    id:this.builder.control(''),
    name:this.builder.control(''),
    password:this.builder.control(''),
    email:this.builder.control(''),
    genre:this.builder.control('male'),
    role:this.builder.control(''),
    isactive:this.builder.control(false),
  });

  updateUser(){
    if(this.registerform.valid){

      this.service.Updateuser(this.registerform.value.id,this.registerform.value).subscribe(res=>{
        this.toaster.success('Update Sccessfully.');
        this.dialog.close();
      })
    }else{
      this.toaster.warning('Please Select Role.')

    }

  }

}
