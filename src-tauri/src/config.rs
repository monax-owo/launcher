use std::{
  env,
  fs::{create_dir_all, File},
  io::{BufReader, BufWriter, Read, Write},
  path::Path,
};

use anyhow::anyhow;
use serde::{Deserialize, Serialize};
use toml::Value;

const CONFIGFILE_NAME: &str = ".lunerc.toml";
const DEFAULT_CONFIGFILE: &str = include_str!("assets/.lunerc.toml");

#[derive(Debug, Deserialize, Serialize)]
pub struct Config {
  pub test: String,
  pub theme: Theme,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum Theme {
  Auto,
  Dark,
  White,
}

impl Config {
  pub fn new() -> Self {
    Config {
      test: "".to_string(),
      theme: Theme::Auto,
    }
  }
}

// pub fn read_config() -> anyhow::Result<()> {
//   let exe = env::current_exe()?;
//   let exe_dir = exe.parent().expect("parent directory is none");
//   let configfile_path = exe_dir.join(CONFIGFILE_NAME);
//   let configfile: File;
//   if configfile_path.is_file() {
//     println!("file found");
//     configfile = File::open(&configfile_path)?;
//   } else {
//     println!("file not found");
//     println!("{}", configfile_path.to_string_lossy());
//     configfile = File::create_new(&configfile_path)?;
//     BufWriter::new(&configfile)
//       .write_all(DEFAULT_CONFIGFILE.as_bytes())
//       .unwrap();
//   }
//   let mut buf = String::new();
//   BufReader::new(&configfile).read_to_string(&mut buf)?;
//   println!("{:?}", toml::from_str::<Config>(&buf)?);
//   // todo!()
//   // let parsed_config = todo!();

//   Ok(())
// }

pub fn asset_config_gen<T>(dir_path: &Path, content: &T) -> anyhow::Result<()>
where
  T: ?Sized + serde::ser::Serialize,
{
  let config_dir_path = env::current_dir()?.join(dir_path);
  create_dir_all(&config_dir_path)?;
  let config_path = config_dir_path.join(CONFIGFILE_NAME);
  println!("config_path = {:?}", &config_path);

  let config_file = File::options()
    .read(true)
    .write(true)
    .create(true)
    .truncate(false)
    .open(&config_path)?;

  let mut config_buf_writer = BufWriter::new(&config_file);
  let mut config_buf_reader = BufReader::new(&config_file);

  let text_toml = toml::to_string(&content)?;
  let text_toml = text_toml.trim();

  let mut buf_toml = String::new();
  config_buf_reader.read_to_string(&mut buf_toml)?;
  let buf_toml = buf_toml.trim();

  println!("buf = \n{}\n", buf_toml);
  println!("text = \n{}\n", text_toml);

  // パースできなかった場合の処理を追加する
  let res = (|| {
    let Ok(text_value) = toml::from_str::<Value>(text_toml) else {
      return Err(anyhow!("could not parse text_toml"));
    };
    let Ok(buf_value) = toml::from_str::<Value>(buf_toml) else {
      return Err(anyhow!("could not parse buf_toml"));
    };
    if buf_value != text_value {
      config_buf_writer.write_all(text_toml.as_bytes()).err();
    }
    Ok(())
  })();
  println!("{:?}", res);
  // config_buf_writer.write_all(toml::to_string(&Config::new())?.as_bytes())?;

  config_buf_writer.flush()?;
  Ok(())
}
