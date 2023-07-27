import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component {

  constructor(private _cookie:CookieService)
  {

  }

  getdata()
  {
    console.log(localStorage.getItem("employeeid"));
    console.log(sessionStorage.getItem("userid"));

    console.log(localStorage.getItem("empobj")); //String mein dega

    console.log(JSON.parse(localStorage.getItem("empobj")));

  }


  deletedata()
  {
   localStorage.removeItem("employeeid");
   //agar sab delete karna hai, localstorage se aur session storage se toh clear use kage ge
  }


  cleardata()
  {
    localStorage.clear();

  }

  clearsessiondata()
  {
    sessionStorage.clear();
  }


  getlen()
  {
    console.log(localStorage.length);

  }

  getalldata(){
    for(let i=0;i<localStorage.length;i++)
    {
      let key = localStorage.key(i);
      let value=localStorage.getItem(key);
      console.log(key +" "+value);

    }
  }

  getCookie()
  {
    console.log(this._cookie.get("name"));
  }

  chkCookie()
  {
    console.log(this._cookie.check("name"));
  }

  delCookie()
  {
    this._cookie.delete("name");
  }

  getAllCookie()
  {
    console.log(this._cookie.getAll());
  }

  deleteAll()
  {
    console.log(this._cookie.deleteAll());
  }


}


















