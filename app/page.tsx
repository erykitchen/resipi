'use client';

import { useState } from 'react';

// 仮のデータ（あとでFirebaseと繋ぎます）
const initialRecipes = [
  { id: 1, title: 'お母さんの唐揚げ', description: '秘伝のタレに漬け込んだ、冷めても美味しい唐揚げ。', isFavorite: true },
  { id: 2, title: '肉じゃが（基本）', description: 'お父さんが大好きな、少し甘めの懐かしい味。', isFavorite: false },
  { id: 3, title: '出し巻き卵', description: 'じっくり焼いて、ふわふわに仕上げる。', isFavorite: false },
  { id: 4, title: 'ポテトサラダ', description: '隠し味に酢を入れるのがポイント。', isFavorite: false },
];

export default function Page() {
  const [recipes] = useState(initialRecipes);

  return (
    <div className="max-w-md mx-auto"> {/* スマホで見やすい幅に制限 */}
      
      {/* タイトルエリア：スマホで見やすく中央寄せ */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl font-black text-stone-900 tracking-tight">
          みんなのレシピ
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          お母さんの味をいつでも。
        </p>
      </div>

      {/* レシピのリスト：画像なしでシンプルに */}
      <div className="space-y-3 px-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 flex items-center justify-between active:scale-[0.98] transition-transform">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-stone-800">
                  {recipe.title}
                </h3>
                {recipe.isFavorite && (
                  <span className="text-amber-500 text-xl">★</span>
                )}
              </div>
              <p className="text-stone-500 text-sm line-clamp-1">
                {recipe.description}
              </p>
            </div>
            
            {/* 詳細を見る矢印（スマホでの操作感を出すため） */}
            <div className="text-stone-300 text-2xl ml-4">
              ›
            </div>
          </div>
        ))}
      </div>

      {/* スマホで押しやすい「固定ボタン」を下部に配置 */}
      <div className="fixed bottom-8 left-0 right-0 px-6">
        <button className="w-full bg-stone-900 text-white font-bold py-4 rounded-2xl shadow-xl active:bg-stone-800 transition-colors flex items-center justify-center gap-2">
          <span className="text-xl">＋</span>
          レシピを追加する
        </button>
      </div>

      {/* 下部の余白（ボタンに被らないように） */}
      <div className="h-32"></div>
    </div>
  );
}