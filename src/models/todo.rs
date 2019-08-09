use crate::schema::todos;

#[derive(Queryable, Serialize, Deserialize)]
pub struct Todo {
    pub id: i32,
    pub todo_text: String,
    pub time_added: String,
    pub time_finished: String,
    pub finished: bool,
}

#[derive(Insertable, Deserialize)]
#[table_name = "todos"]
pub struct NewTodo {
    pub todo_text: String,
    pub time_added: String,
    pub time_finished: Option<String>,
    pub finished: Option<bool>,
}

impl NewTodo {
    pub fn create(&self) -> Result<Todo, diesel::result::Error> {
        use diesel::RunQueryDsl;
        use crate::db_handler::connect;

        let connection = connect();
        diesel::insert_into(todos::table)
            .values(self)
            .get_result(&connection)
    }
}

#[derive(Serialize, Deserialize)]
pub struct TodoList(pub Vec<Todo>);

impl TodoList {
    pub fn get_all() -> Self {
        use diesel::RunQueryDsl;
        use diesel::QueryDsl;
        use crate::schema::todos::dsl::*;
        use crate::db_handler::connect;

        let connection = connect();

        let result = todos
            .limit(100)
            .load::<Todo>(&connection)
            .expect("Error loading todos");

        TodoList(result)
    }
}