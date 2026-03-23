import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyBuI8jhOH9Ujvy9p6fQViKy--1YNYBcFbQ",
  authDomain: "recipe-book-fd2ef.firebaseapp.com",
  projectId: "recipe-book-fd2ef",
  storageBucket: "recipe-book-fd2ef.firebasestorage.app",
  messagingSenderId: "476965834988",
  appId: "1:476965834988:web:9a40a7ba78fec1dfba15c9"
};

// 二重に初期化されないようにチェック
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 使う機能をエクスポート
export const db = getFirestore(app);
export const storage = getStorage(app);