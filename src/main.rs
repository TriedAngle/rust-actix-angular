#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate chrono;

use dotenv::dotenv;
use std::env;
use diesel::prelude::*;
use diesel::pg::PgConnection;

mod schema;
mod models;

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("set DATABASE_URL");
    let con = PgConnection::establish(&database_url).unwrap();

    let test_todo = models::NewTodo {
        todo_text: String::from("finish this project lol"),
        time_added: String::from(get_current_time_rfc3339()),
        time_finished: String::from(""),
        finished: false,
    };

    if models::Todo::insert(test_todo, &con) {
        println!("successfully inserted todo");
    } else {
        println!("failed inserting todo")
        
    }
}

fn get_current_time_rfc3339() -> String {
    use chrono::prelude::*;
    let current_time: DateTime<Utc> = Utc::now();
    String::from(current_time.to_rfc3339())
}
