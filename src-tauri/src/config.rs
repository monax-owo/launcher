use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Config {
  test: String,
}

pub fn read_config() -> Config {
  todo!()
}
