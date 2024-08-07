use serde::{Deserialize, Serialize};
use serde_json::{from_str, Value};

pub async fn suggest(service: &str, query: &str) -> anyhow::Result<String> {
  let res = match service {
    "google" => google(&query).await?,
    _ => String::from(""),
  };
  println!("{}", &res);
  Ok(res)
}

#[derive(Serialize, Deserialize, Debug)]
struct Google {
  result: Value,
}

async fn google(query: &str) -> anyhow::Result<String> {
  let text = reqwest::get(
    "https://suggestqueries.google.com/complete/search?output=toolbar&client=chrome&hl=jp&q="
      .to_string()
      + query,
  )
  .await?
  .text()
  .await?;
  let temp = format!("{{\"result\":{}}}", text);
  Ok(serde_json::to_string(
    &from_str::<Google>(temp.as_str())?.result[1],
  )?)
}
