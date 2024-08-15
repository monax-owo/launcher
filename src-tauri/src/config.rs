use serde::{Deserialize, Serialize};

const CONFIGFILE_PATH: &str = ".lunerc.toml";
const DEFAULT_CONFIGFILE: &str = include_str!("./static/.lunerc.toml");

#[derive(Debug, Deserialize, Serialize)]
pub struct Config {
  test: String,
}

pub fn read_config() -> anyhow::Result<Config> {
  // let parsed_config = todo!();
  // let test=
  // Ok(test)
  // println!("{}", DEFAULT_CONFIGFILE);
  todo!()
}
