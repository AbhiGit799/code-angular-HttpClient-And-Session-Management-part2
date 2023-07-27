import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookUrl = "/api/books";

  constructor(private _http:HttpClient) { }


  // getAllBooks():Observable<Book[]>
  // {
  //   return this._http.get<Book[]>(this.bookUrl);

  // }


  //Example Response type = json
  getAllBooks():Observable<Book[]>
  {
    return this._http.get<Book[]>(this.bookUrl,{responseType:'json'});

  }

   // Example Sending Header as optional parameter <------ For sending external information
  filterbooks(cate:String,yr:String)
  {
    //Setting Header
    let httpHe = new HttpHeaders().set("Accept","application/json") 

   // return this._http.get<Book[]>(this.bookUrl+"?category="+cate+"&year=") ;  // <--------Passing Parameter

   return this._http.get<Book[]>(this.bookUrl+"?category="+cate+"&year="+yr,{headers:httpHe}) ;                          

  }


  //Example with Param
  filterbooks1(cate: string, yr: string) {
    let httpheaders = new HttpHeaders()
      .set("Accept", "application/json")   //<-----------------For get we use Accept

    let httpParams = new HttpParams() //<----------------------Passing parameters using .set()
      .set("category", cate)
      .set("year", yr)

    return this._http.get<Book[]>(this.bookUrl, {
      headers: httpheaders,
      params: httpParams
    });
  }

  // For debugging,passing  body
  Obgetfullresponse(): Observable<Book[]> {
    return this._http.get<Book[]>(this.bookUrl, {
      observe: 'body'
    })
  }

//For debugging, passing response
    REgetfullresponse(): Observable<HttpResponse<Book[]>> {
    return this._http.get<Book[]>(this.bookUrl, {
      observe: 'response'
    })
  }

    //for event parameter, we need realtime api.
 private apiurl="http://sahosoftweb.com/api/ProductMaster/GetProductList";

 getfullresponse(): Observable<HttpEvent<Book[]>> {
   return this._http.get<Book[]>(this.apiurl, {
     observe: 'events',
     reportProgress:true
   })
 }

 //22 april 2023
 //for error handling example
 private myurl = "/api/invalid";

 getdataforerror()
 {
  return this._http.get(this.myurl);
 }



 createBook(book:Book):Observable<Book>
 {
  let httpheader = new HttpHeaders()
  .set("Content-Type","application/json")  //For post we use Content-Type

   return this._http.post<Book>(this.bookUrl,book,{
    headers:httpheader

   })
 }

 //UPDATE BASED ON ID

 updateBook(book:Book):Observable<Book>
 {
  let httpheader = new HttpHeaders()
  .set("Content-Type","application/json")

   return this._http.put<Book>(this.bookUrl+"/"+book.id,book,{
    headers:httpheader

   })
 }

 deleteBook(bookid:number):Observable<Book>
 {
  let httpheader = new HttpHeaders()
  .set("Content-Type","application/json")

   return this._http.delete<Book>(this.bookUrl+"/"+bookid,{
    headers:httpheader

   })
 }
 
 
}
