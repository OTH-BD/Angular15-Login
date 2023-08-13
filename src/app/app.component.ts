import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'Login15';
  ismenurequired=false;
  user:any;
  isadminuser=false;
  username :any;

  
  

  constructor(private router:Router, private service:AuthService){
    
  

  }

  

  ngDoCheck(): void {
    
    this.username=sessionStorage.getItem('username');
    
    
    let currenturl=this.router.url;
    if(currenturl=='/login' || currenturl=='/register'){
      this.ismenurequired=false;

     

    }else{
      this.ismenurequired=true;
     

    }
    if(this.service.GetUserrole()=='admin'){
      this.isadminuser=true;
    }else{
      this.isadminuser=false;
    }
  
  }
  

}
