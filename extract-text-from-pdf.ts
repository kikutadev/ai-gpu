// PDFからテキストを抽出する関数
import { extractText, getDocumentProxy } from 'unpdf';
import { readFile } from 'fs/promises';

/**
 * 指定したPDFファイルからテキストを抽出する
 * @param pdfPath PDFファイルのパス
 * @returns 抽出したテキスト
 */
async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    // PDFファイルを読み込む
    const buffer = await readFile(pdfPath);
    // PDFデータをUint8Arrayに変換し、PDF.jsのドキュメントプロキシを取得
    const pdf = await getDoccumentProxy(new Uint8Array(buffer));
    // テキストを抽出（全ページをマージして1つの文字列として取得）
    const { totalPages, text } = await extractText(pdf, { mergePages: true });
    
    console.log(`総ページ数: ${totalPages}`);
    console.log(`抽出したテキスト: ${text.slice(0, 100)}...`); // 最初の100文字のみ表示
    
    return text;
  } catch (error) {
    console.error('PDFテキスト抽出中にエラーが発生しました:', error);
    throw error;
  }
}

// 使用例
const pdfPath = './path/to/your/file.pdf';
extractTextFromPDF(pdfPath)
  .then((text) => {
    console.log('テキスト抽出が完了しました。');
    // 必要に応じてテキストを保存や処理
  })
  .catch((error) => {
    console.error('処理に失敗しました:', error);
  });
