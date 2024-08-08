use anyhow::{bail, Ok};
use serde::{Deserialize, Serialize};
use serde_json::{from_str, Value};

pub async fn suggest(service: &str, query: &str) -> anyhow::Result<Vec<String>> {
  let res = match service {
    "google" => google(&query).await?,
    
    _ => bail!("missing service"),
  };
  println!("{:?}", &res);
  Ok(res)
}

//
#[derive(Serialize, Deserialize, Debug)]
struct Google {
  result: (String, Vec<String>, Vec<String>, Value, Value),
}

async fn google(query: &str) -> anyhow::Result<Vec<String>> {
  let text = format!(
    "{{\"result\":{}}}",
    reqwest::get(
      "https://suggestqueries.google.com/complete/search?output=toolbar&client=chrome&hl=jp&q="
        .to_string()
        + query,
    )
    .await?
    .text()
    .await?
  );
  let value = from_str::<Google>(text.as_str())?;
  let array = value.result.1;
  Ok(array[..10].to_vec())
}
