import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})
export class TodoListComponent implements OnInit {

  public todos = [];
  private todo_service: TodoServiceService;
  
  constructor(todo_service: TodoServiceService) {
    this.todo_service = todo_service;
   }

  ngOnInit() {
    this.todos = this.todo_service.getTodos();
  }

}
