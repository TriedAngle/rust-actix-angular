import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})
export class TodoListComponent implements OnInit {

  public todos = [];
  public curr_text: string;
  public curr_added: string;
  public curr_finished: string;
  public curr_time_finished: string;
  
  constructor(private todo_service: TodoServiceService) {
    this.todo_service = todo_service;
   }

  ngOnInit() {
    this.getTodos()
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

  todo_clicked = (todo) => {
    this.todo_service.getTodoById(todo.id).subscribe(
      data => {
        console.log(todo)
        this.curr_text = todo.todo_text;
        this.curr_added = todo.time_added;
        this.curr_finished = todo.is_finished;
        if(todo.time_finished === ""){
          this.curr_time_finished = "Not finished yet!"
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
