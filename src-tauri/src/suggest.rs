use anyhow::{bail, Ok};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::{from_str, Value};

const RESULT_LENGTH: usize = 9;
pub async fn get_suggest(
  service: &str,
  query: &str,
  client: &Client,
) -> anyhow::Result<Vec<String>> {
  let res = match service {
    "google" => google(&query, client).await?,
    _ => bail!("missing service"),
  };
  println!("{:?}", &res);
  Ok(res)
}

#[derive(Serialize, Deserialize, Debug)]
struct Google {
  result: (String, Vec<String>, Vec<String>, Value, Value),
}

async fn google(query: &str, client: &Client) -> anyhow::Result<Vec<String>> {
  let text = format!(
    "{{\"result\":{}}}",
    client
      .get("https://suggestqueries.google.com/complete/search")
      .query(&[
        ("q", query),
        ("output", "toolbar"),
        ("client", "chrome"),
        ("hl", "jp")
      ])
      .send()
      .await?
      .text()
      .await?
  );
  let value = from_str::<Google>(text.as_str())?;
  let array = value.result.1;
  Ok(array[..array.len().min(RESULT_LENGTH)].to_vec())
}
