// サジェストを実装するための親クラス
// 文字を入れたら配列を返す？
// abstract,interface,?
export abstract class Suggest {
  public static async getSuggest(text: string): Promise<string[]> {
    return await ["Please implement the method"];
  }
}
