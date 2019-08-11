import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';
import { Todo } from './todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})
export class TodoListComponent implements OnInit {

  private todos_async: Observable<Todo[]>;
  private todos_loading: boolean = false;
  private todos: Todo[]
  private selected_todo: Todo;
  
  constructor(private todo_service: TodoServiceService) {
    this.todo_service = todo_service;
    this.setSelectedEmpty();
   }

  ngOnInit() {
    this.getTodosAsync()
  }

  getTodos = () => {
    this.todo_service.getTodos().subscribe(
      data => {
        this.todos = data;
      },
      error => {
        console.log(error);
      })
  }

  getTodosAsync = () => {
    this.todos_loading = true;
    this.todos_async = this.todo_service.getTodos();
  }

  todoClicked = (todo: Todo) => {
    this.todo_service.getTodoById(todo.id).subscribe(
      data => {
        this.selected_todo = data;
        if(this.selected_todo.time_finished === ""){
          this.selected_todo.time_finished= "Not finished yet!"
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  todoUpdate = () => {
    this.todo_service.updateTodo(this.selected_todo).subscribe(
      data => {
        this.selected_todo = data;
        // this.getTodos();
        this.getTodosAsync();
      },
      error => {
        console.log(error);
      }
    )
  }
  
  todoCreate = () => {
    this.todo_service.createTodo(this.selected_todo).subscribe(
      data => {
        this.getTodosAsync();
      },
      error => {
        console.log(error);
      }
    )
  }

  todoDelete = () => {
    this.todo_service.deleteTodo(this.selected_todo.id).subscribe(
      data => {
        this.getTodosAsync();
        this.setSelectedEmpty();
      },
      error => {
        console.log(error);
      }
    )
  }

  setSelectedEmpty = () => this.selected_todo = {id: -1, todo_text: '', is_finished: false, time_added: '', time_finished: ''};

}
