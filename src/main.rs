extern crate actix;
extern crate actix_web;
#[macro_use]
extern crate diesel;
extern crate r2d2;
extern crate r2d2_diesel;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate serde_json;
extern crate dotenv;
extern crate chrono;

use actix_web::{HttpServer, App, web, HttpRequest, HttpResponse};
use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use std::env;

mod schema;
mod models;
mod db_handler;

fn index(_req: HttpRequest) -> HttpResponse {
    HttpResponse::Ok().json("Hello Json!")
}

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("set DATABASE_URL");
    let con = PgConnection::establish(&database_url).unwrap();

    HttpServer::new(|| App::new().service(
        web::resource("/").route(web::get().to_async(index))))
            .bind("127.0.0.1:8080")
            .unwrap()
            .run();

    // let test_todo = models::NewTodo {
    //     todo_text: String::from("finish this project lol"),
    //     time_added: String::from(get_current_time_rfc3339()),
    //     time_finished: String::from(""),
    //     finished: false,
    // };

    // if models::Todo::insert(test_todo, &con) {
    //     println!("successfully inserted todo");
    // } else {
    //     println!("failed inserting todo")
        
    // }
}

fn get_current_time_rfc3339() -> String {
    use chrono::prelude::*;
    let current_time: DateTime<Utc> = Utc::now();
    String::from(current_time.to_rfc3339())
}
