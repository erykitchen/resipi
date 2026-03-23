import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "母さんのレシピ帳",
  description: "ふたりのための大切なレシピ集",
};

export default function RootLayout({
  children,
} : Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {/* ヘッダーを追加 */}
        <header className="bg-white shadow-sm border-b border-stone-100">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <h1 className="text-2xl font-bold text-stone-800 tracking-tight">
                母さんのレシピ帳
              </h1>
            </div>
            {/* ここに将来的にログアウトボタンなどを追加できます */}
          </nav>
        </header>
        
        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}