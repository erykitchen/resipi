"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; 
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [showIngredients, setShowIngredients] = useState<string[] | null>(null);

  useEffect(() => {
    const q = query(collection(db, "recipes"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setRecipes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Recipe[]);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert("料理名を入れてね！");
    setLoading(true);

    try {
      await addDoc(collection(db, "recipes"), {
        title,
        ingredients: ingredients.filter(i => i !== ""),
        steps: steps.filter(s => s !== ""),
        createdAt: serverTimestamp(),
      });
      setTitle(""); setIngredients([""]); setSteps([""]);
    } catch (e) {
      alert("保存に失敗しました。Firestoreのルールを確認してね！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-4 bg-orange-50 min-h-screen pb-24 text-black">
      <h1 className="text-xl font-bold text-orange-600 mb-4 text-center">🍳 お母さんと私のレシピ帳</h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm space-y-4 mb-8 border border-orange-100">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="料理名（例：ハンバーグ）" className="w-full p-2 border-b-2 border-orange-100 outline-none text-lg font-bold" />
        
        <div>
          <p className="font-bold text-sm mb-2 text-orange-500">材料</p>
          {ingredients.map((ing, i) => (
            <input key={i} value={ing} onChange={(e) => {
              const n = [...ingredients]; n[i] = e.target.value; setIngredients(n);
            }} placeholder={`材料 ${i+1}`} className="w-full p-1 text-sm border-b mb-1 outline-none" />
          ))}
          <button type="button" onClick={() => setIngredients([...ingredients, ""])} className="text-xs text-blue-500 font-bold mt-1">+ 材料を追加</button>
        </div>

        <div>
          <p className="font-bold text-sm mb-2 text-orange-500">作り方</p>
          {steps.map((step, i) => (
            <textarea key={i} value={step} onChange={(e) => {
              const n = [...steps]; n[i] = e.target.value; setSteps(n);
            }} placeholder={`工程 ${i+1}`} className="w-full p-1 text-sm border-b mb-1 outline-none resize-none" />
          ))}
          <button type="button" onClick={() => setSteps([...steps, ""])} className="text-xs text-blue-500 font-bold mt-1">+ 工程を追加</button>
        </div>

        <button disabled={loading} className="w-full py-3 bg-orange-500 text-white rounded-lg font-bold shadow-md active:bg-orange-600 transition">
          {loading ? "保存中..." : "レシピを保存する"}
        </button>
      </form>

      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
              <button onClick={() => setShowIngredients(recipe.ingredients)} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold">材料を見る</button>
            </div>
            <div className="space-y-3">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="bg-orange-400 text-white w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-[10px]">{i + 1}</span>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showIngredients && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 shadow-2xl max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-orange-600">材料リスト</h3>
              <button onClick={() => setShowIngredients(null)} className="text-gray-400 text-2xl">✕</button>
            </div>
            <ul className="space-y-3">
              {showIngredients.map((ing, i) => (
                <li key={i} className="border-b border-gray-100 pb-2 text-gray-800">・{ing}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}