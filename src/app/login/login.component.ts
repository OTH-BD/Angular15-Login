import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userdata:any;

  constructor(private builder: FormBuilder,private toaster:ToastrService, private service: AuthService, private router: Router ){
    sessionStorage.clear();
  }

  loginform=this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  })

  proceedLogin(){
    
    if(this.loginform.valid){
    //   this.service.Proceedregister(this.loginform.value).subscribe(res =>{
    //     this.toaster.success('please Contact admin for enable access ','Registered Successfully');
    //     this.router.navigate(['login']);
    //   });

    // }else{
    //   this.toaster.warning('Please entre Valid Data');

    // }
    this.service.Getbycode(this.loginform.value.username).subscribe(res =>{
      this.userdata=res;
      // console.log(this.userdata);
      if(this.userdata.password === this.loginform.value.password && this.userdata.isactive==true){
        sessionStorage.setItem('username', this.userdata.id);
        sessionStorage.setItem('userrole', this.userdata.role);
        this.router.navigate(['']);

        


      }else{
        this.toaster.error('Please contact admin','In Active User')
      }

    })
  }
 }

}
