import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export const Header = () => {
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
  // ▼ 追加: ログアウト確認画面を出すかどうかのスイッチ
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const mockGroups = [
    { id: '1', name: '開発部' },
    { id: '2', name: 'デザインチーム' },
    { id: '99', name: '全社イベント実行委員' },
  ];

  const handleGroupClick = (groupId) => {
    setIsGroupMenuOpen(false);
    navigate(`/group/${groupId}`);
  };

  // ▼ 追加: ログアウトボタンが押されたら確認画面を開く
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  // ▼▼▼ 実装したいメイン機能: トークンを破棄してログアウト ▼▼▼
  const confirmLogout = () => {
    // 1. トークンを削除（最重要）
    localStorage.removeItem('token'); 
    
    // 2. 確認画面を閉じる
    setIsLogoutModalOpen(false);

    // 3. サインイン画面へ移動
    navigate('/signin');
  };
  // ▲▲▲ 実装ここまで ▲▲▲

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40">
        {/* ... (ヘッダーの中身は以前と同じですが、ログアウトボタンだけ書き換えます) ... */}
        <div className="h-full px-6 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/calendar" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-md flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-primary-700 transition-colors">G</div>
              <span className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-primary-700 transition-colors">GeekCamp</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
              <Link to="/calendar" className="px-3 py-2 rounded-md hover:bg-slate-50 hover:text-primary-600 transition-colors">マイカレンダー</Link>
              <div className="relative">
                <button onClick={() => setIsGroupMenuOpen(!isGroupMenuOpen)} className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-50 hover:text-primary-600 transition-colors">
                  参加グループ <span className="text-[10px] opacity-60">▼</span>
                </button>
                {/* グループメニューの中身（省略なしでそのまま使ってください） */}
                {isGroupMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsGroupMenuOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-100 py-1 z-50">
                      {mockGroups.map((group) => (
                        <button key={group.id} onClick={() => handleGroupClick(group.id)} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          {group.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <Link to="/instagram" className="px-3 py-2 rounded-md hover:bg-slate-50 hover:text-primary-600 transition-colors">画像生成</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/user/me/profile" className="text-sm font-medium text-slate-600 hover:text-primary-600 flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-50">
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">U</div>
              <span>Profile</span>
            </Link>

            {/* ▼ 修正: ここで handleLogoutClick を呼びます */}
            <button
              onClick={handleLogoutClick}
              className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors px-2 py-1"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* ▼▼▼ 追加: ログアウト確認用ポップアップ ▼▼▼ */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold text-slate-900">ログアウトしますか？</h3>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                キャンセル
              </button>
              {/* ▼ ここで先ほどの confirmLogout を実行します */}
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};