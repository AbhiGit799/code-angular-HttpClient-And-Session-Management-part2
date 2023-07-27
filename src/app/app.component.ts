import { preserveWhitespacesDefault } from '@angular/compiler';
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,filter,map, mergeMap } from 'rxjs';
import { BookService } from './book.service';
import { Book } from './book';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';


interface emp {
  Id: number;
  Name: string;
}

class Abc {
  constructor() {
    console.log('abc constructor called ..');
  }
  display(name: string) {
    console.log('Hello : ' + name + 'from Abc Class');
  }
}

class EmployeeSameAppComp {
  private empCode: String;
  empName: String;

  private fun() {
    let name = 'Ajeet';
    console.log(name);
  }
}

class MyClass {
  name1: String; //Here, name1 is public by default

  private name2: string;

  protected name3: string;

  fun3() {
    console.log(this.name2);
  }
}

class MySubClass extends MyClass {
  fun() {
    console.log(this.name1);
    //console.log(this.name2); //Give error because name2 is private
    console.log(this.name3);
  }
}

class MySubChildClass extends MySubClass {
  fun2() {
    console.log(this.name3);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  preserveWhitespaces: true,
  viewProviders: [Abc, EmployeeSameAppComp], //viewProviders is for using class.
  encapsulation: ViewEncapsulation.None,

  providers: [], //Making service component level ; //21-March-2023
})


export class AppComponent {

  title="Angular Learning";
  //Variables for storing data returned from methods
  Allbooks:Book[];
  Allbooks$: Observable<Book[]>; //<------- for async pipe
  searchbook:Book[];
  searchbook1:Book[];

 Obfullresponse:Book[] ;
 REfullresponse:HttpResponse<Book[]>;
  bookaftersaved: Book[];
  bookafterupdate: Book[];
  bookafterdelete: Book[];

   
  constructor(private _bookService:BookService)
  {}

  ngOnInit()
  {
    this.getmyAllbooks();
    this.filterAllbooks('Angular Book','2020');
    this.filterAllbooks1('React Book','2019');
    this.OBgetfullbookresponse();
    this.REgetfullbookresponse();
   //below is for event optional parameter that only works with realtime api
    //this.getfullbookresponse();
  
    //22 APRIL 2023
    this.invalidcall();
    this.invalidcallBest();

  }

  getmyAllbooks()
  {
    this._bookService.getAllBooks().subscribe(response=>{
      this.Allbooks=response;
    })

    this.Allbooks$ = this._bookService.getAllBooks();
    
  }


  // Example Sending Header as optional parameter
  filterAllbooks(category:string,year:string)
  {

    this._bookService.filterbooks(category,year)
    .subscribe(response=>{
      this.searchbook=response;
    })

  }

   //Param Example
  filterAllbooks1(category: string, year: string) {
    this._bookService.filterbooks(category, year).subscribe(res => {
      this.searchbook1 = res;
    })
  }


  //For debugging purpose we use Observe "body"
  OBgetfullbookresponse() {
    this._bookService.Obgetfullresponse().subscribe(res => {
        //  debugger;
       this.Obfullresponse=res;
    })
  }


//For debugging purpose we use Observe "response"

  REgetfullbookresponse() {
    this._bookService.REgetfullresponse().subscribe(res => {
        //  debugger;
       this.REfullresponse=res;

    })
  }


  getfullbookresponse() {
    // this._bookService.getfullresponse().subscribe(res => {
    //     debugger;
   
    //   if (res.type == HttpEventType.Sent) {
    //     console.log("Resquest has been sent to server");
    //   } else if (res.type == HttpEventType.UploadProgress) {
    //     console.log("upload in progress");
    //   } else if (res.type == HttpEventType.ResponseHeader) {
    //     console.log("Header received");
    //   } else if (res.type == HttpEventType.DownloadProgress) {
    //     console.log('download in progress');
    //   } else if (res.type == HttpEventType.Response) {
    //     console.log("full response obtained");
    //   }


    //   // if(res.status==200){
    //   //   this.fullresponse=res;
    //   // }else{
    //   //   console.log("No Data Found");
    //   // }

    // })
  }

  

  //22 APRIL 2023
  invalidcall()
  {
    this._bookService.getdataforerror().subscribe(response=>{
      console.log(response);
    },
    
    //not recommended , not a best practice for handling error
    err=>{
      alert("Data Maintenance Activity is going on. Please try after sometime.");
    }
    
    )

  }

  //Best way to handle error.

  invalidcallBest()
  {
    this._bookService.getdataforerror().subscribe(response=>{
      console.log(response);
    },
    
    (err:HttpErrorResponse)=>{
      if(err.error instanceof Error)
      {
        //Client side or network related issue
        console.log("An error occurred: "+err.error.message);

      }
      else{
        //backend related error like 404;  Now we need to customize this and put our own messages
        console.log("Status code: "+err.status);
        console.log("Status text = "+err.statusText);
        console.log("Invalid API URL");
        
        console.log(err);
      }
    }
    )
  }



  savebook()
  {

    let newbook = {id:106,name:'Azure',category:'Azure Book',year:'2015'};
    this.createbook(newbook);
    this.getbookaftersaved();
  }


  getbookaftersaved()
  {
   this._bookService.getAllBooks().subscribe(res=>{
    this.bookaftersaved=res;
   })
  }

  createbook(book:Book){
    this._bookService.createBook(book).subscribe(res=>{
      console.log("On Click of Save Book");
      
      console.log(res);
    },
    (err:HttpErrorResponse)=>{
      if(err.error instanceof Error)
      {
        //Client side or network related issue
        console.log("An error occurred: "+err.error.message);

      }
      else{
        //backend related error like 404
        console.log("Status code: "+err.status);
        console.log("Status text = "+err.statusText);
        console.log(err);
      }
    }
    
    )
  }


  updatebook()
  {
    let changebook =   {id:102,name:'React Native',category:'React Native Book',year:'2020'};
    this._bookService.updateBook(changebook).subscribe(response=>{
      console.log(response)
    },
    
    (err:HttpErrorResponse)=>{
      if(err.error instanceof Error)
      {
        //Client side or network related issue
        console.log("An error occurred: "+err.error.message);

      }
      else{
        //backend related error like 404
        console.log("Status code: "+err.status);
        console.log("Status text = "+err.statusText);
        console.log(err);
      }
    }
    
    )

    this.getbookafterupdate();

  }


  getbookafterupdate()
  {
   this._bookService.getAllBooks().subscribe(res=>{
    this.bookafterupdate=res;
   })
  }


  //bookafterdelete
  deletebook(){
     this.bookdelete(103);
     this.getbookafterdelete();
     
  }

  bookdelete(id:number)
  {
    this._bookService.deleteBook(id).subscribe(response=>{
      console.log(response);
    },
    (err:HttpErrorResponse)=>{
      if(err.error instanceof Error)
      {
        //Client side or network related issue
        console.log("An error occurred: "+err.error.message);

      }
      else{
        //backend related error like 404
        console.log("Status code: "+err.status);
        console.log("Status text = "+err.statusText);
        console.log(err);
      }
    }
    
    )
  }

  getbookafterdelete()
  {
   this._bookService.getAllBooks().subscribe(res=>{
    this.bookafterdelete=res;
   })
  }


}




























