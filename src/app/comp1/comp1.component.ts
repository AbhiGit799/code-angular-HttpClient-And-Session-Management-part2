import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component {

  constructor(private _cookie:CookieService)
  {
    if(window.localStorage)
    {
      alert("Browser Supported");
    }else{
        alert("Browser Not Supported");
    }
  }
  

  ngOnInit()
  {
    localStorage.setItem("employeeid","EMP-007");
    sessionStorage.setItem("userid","Ram-751");
  }

  setdata()
  {
    localStorage.setItem("empcode","Dom-099");
    sessionStorage.setItem("usercode","C-088");

    let obj={employeeid:501,name:"Pawan"}

    localStorage.setItem("empobj",JSON.stringify(obj)); //string mein dega
    

  }

  //Cookie
  setcookie()
  {
    this._cookie.set("name","Vijay Cookie");
  }



}


















