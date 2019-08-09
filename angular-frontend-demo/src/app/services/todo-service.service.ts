import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from './../todo-item/todo-interface'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private _url: string = "http://127.0.0.1:8080/todos";

  constructor(private http: HttpClient) { }

  getTodos(): Observable<ITodo[]>{
    return this.http.get<ITodo[]>(this._url);
  }

    // return [
    //   {"id": 1,
    //    "text": "please add a http service here !!", 
    //    "time_added": "YYYY::MM::DD::T::HH::mm::ss::...", 
    //    "time_finished":"2YYYY::2MM::2DD::2T::2HH::2mm::2ss::2...",
    //    "is_finished": false
    //   },
    //   {"id": 2,
    //   "text": "2please 2add a2 http2 serv2ice here !!", 
    //   "time_added": "YYYY::M2M::DD::2T::HH:2:mm::s2s::...", 
    //   "time_finished":"2YYY2Y::22MM::2DD2::2T2::22HH::2m2m::2ss::2...",
    //   "is_finished": true
    //  },
    //  {"id": 3,
    //  "text": "ple3ase add a3 http se3rvice he3re !!", 
    //  "time_added": "YYYY3::MM3::DD::T3::HH::m3m::s3s::...", 
    //  "time_finished":"2YYY3Y:33:2MM::2D3D::2T::32HH::2m33m::2ss::2...",
    //  "is_finished": false
    // }
    // ]
  
}
