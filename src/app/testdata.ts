import { InMemoryDbService } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Book } from "./book";

export class Testdata {

    createDb()
    {
        let bookDetails:Book[]=[
            {id:100,name:'Angular 15',category:'Angular Book',year:'2020'},

            {id:101,name:'Angular 14',category:'Angular Book',year:'2020'},

            {id:102,name:'React',category:'React Book',year:'2019'},

            {id:103,name:'React',category:'React Book',year:'2019'},

            {id:104,name:'Azure',category:'Azure Book',year:'2021'},

            {id:105,name:'Dot net core',category:'Dot net Book',year:'2021'},

        ]

        return {books:bookDetails};
    }
}
