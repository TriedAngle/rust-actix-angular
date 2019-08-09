use diesel;
use diesel::prelude::*;
use diesel::pg::PgConnection;


use crate::schema::todos;
use crate::schema::todos::dsl::todos as all_todos;

#[derive(Queryable)]
pub struct Todo {
    pub id: i32,
    pub todo_text: String,
    pub time_added: String,
    pub time_finished: String,
    pub finished: bool,
}

#[derive(Insertable)]
#[table_name = "todos"]
pub struct NewTodo {
    pub todo_text: String,
    pub time_added: String,
    pub time_finished: String,
    pub finished: bool,
}

impl Todo {
    pub fn get_all(con: &PgConnection) -> Vec<Todo> {
        all_todos
            .order(todos::id.desc())
            .load::<Todo>(con)
            .expect("Error loading todos")
    }
    
    pub fn get_by_id(id: i32, con: & PgConnection) -> Vec<Todo> {
        all_todos
            .find(id)
            .load::<Todo>(con)
            .expect("Error loading todo")
    }

    pub fn update(id: i32, con: &PgConnection, todo: NewTodo) -> bool {
        use crate::schema::todos::dsl::{todo_text as tt, time_added as ta, time_finished as tf, finished as f};
        let NewTodo {
            todo_text,
            time_added,
            time_finished,
            finished,
        } = todo;

        diesel::update(all_todos.find(id))
            .set((tt.eq(todo_text), ta.eq(time_added), tf.eq(time_finished), f.eq(finished)))
            .get_result::<Todo>(con)
            .is_ok()
    }

    pub fn insert(todo: NewTodo, con: &PgConnection) -> bool {
        diesel::insert_into(todos::table)
            .values(&todo)
            .execute(con)
            .is_ok()
    }

    pub fn delete_by_id(id: i32, con: &PgConnection) -> bool {
        if Todo::get_by_id(id, con).is_empty() {
            return false;
        };
        diesel::delete(all_todos.find(id)).execute(con).is_ok()
    }

    pub fn get_all_by_finished(finished: bool, con: &PgConnection) -> Vec<Todo> {
        all_todos
            .filter(todos::finished.eq(finished))
            .load::<Todo>(con)
            .expect("Error loading books by bool finished")
    }

}