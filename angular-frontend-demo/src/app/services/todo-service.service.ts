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
    return this.http.get<Todo>(this.url + '/' + id, {headers: this.http_headers});
  }

  updateTodo(todo: Todo): Observable<any> {
    const body = {id: todo.id, todo_text: todo.todo_text, time_added: todo.time_added, time_finished: todo.time_finished, is_finished: todo.is_finished};
    return this.http.put(this.url + '/' + todo.id, body, {observe: 'response', headers: this.http_headers});
  }

  createTodo(todo: Todo): Observable<any> {
    const body = {id: todo.id, todo_text: todo.todo_text, time_added: todo.time_added, time_finished: todo.time_finished, is_finished: todo.is_finished};
    return this.http.post(this.url, body, {headers: this.http_headers});
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id, {headers: this.http_headers});
  }
}
