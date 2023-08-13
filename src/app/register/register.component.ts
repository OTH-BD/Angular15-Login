import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder,private toaster:ToastrService, private service: AuthService, private router: Router ){

  }
  registerform=this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    genre:this.builder.control('male'),
    role:this.builder.control(''),
    isactive:this.builder.control(false),
  });

  proceedregisterition(){
    if(this.registerform.valid){
      this.service.Proceedregister(this.registerform.value).subscribe(res =>{
        this.toaster.success('please Contact admin for enable access ','Registered Successfully');
        this.router.navigate(['login']);
      });

    }else{
      this.toaster.warning('Please entre Valid Data');

    }
  }



}
