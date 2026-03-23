'use client';

import { useState } from 'react';

// 仮のデータ（あとでFirebaseと繋ぎます）
const initialRecipes = [
  { id: 1, title: 'お母さんの唐揚げ', description: '秘伝のタレに漬け込んだ、冷めても美味しい唐揚げ。', isFavorite: true, imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=400' },
  { id: 2, title: '肉じゃが（基本）', description: 'お父さんが大好きな、少し甘めの懐かしい味。', isFavorite: false, imageUrl: 'https://images.unsplash.com/photo-1630129759364-f65582c6110a?q=80&w=400' },
  { id: 3, title: '出し巻き卵', description: 'じっくり焼いて、ふわふわに仕上げる。', isFavorite: false, imageUrl: 'https://images.unsplash.com/photo-1614352226227-377726af60f0?q=80&w=400' },
];

export default function Page() {
  const [recipes] = useState(initialRecipes);

  return (
    <div>
      {/* 上部のタイトルエリア */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-extrabold text-stone-900 tracking-tighter">
            みんなのレシピ
          </h2>
          <p className="text-stone-600 mt-2">
            今日のごはんは何にする？お母さんの味を再現しよう。
          </p>
        </div>
        
        {/* レシピ追加ボタン */}
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition-all">
          <span className="text-lg">＋</span>
          新しいレシピを追加
        </button>
      </div>

      {/* レシピのカードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-shadow group">
            {/* レシピ画像 */}
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* レシピ情報 */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-2xl font-bold text-stone-800 leading-tight">
                  {recipe.title}
                </h3>
                {recipe.isFavorite && (
                  <span className="text-amber-500 text-2xl" title="お気に入り">★</span>
                )}
              </div>
              <p className="text-stone-600 text-sm mb-5 line-clamp-2">
                {recipe.description}
              </p>
              
              {/* レシピを見るボタン */}
              <button className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium px-4 py-3 rounded-xl transition-colors text-sm">
                レシピを見る
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}