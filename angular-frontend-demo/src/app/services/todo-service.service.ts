import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../todo-list/todo.model'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private url: string = "http://127.0.0.1:8080/todos";
  private http_headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url, {headers: this.http_headers});
  }

  getTodoById(id: number): Observable<Todo>{
    return this.http.get<Todo>(this.url + '/' + id, {headers: this.http_headers})
  }
}
