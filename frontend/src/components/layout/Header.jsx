import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 仮の所属グループデータ
  const mockGroups = [
    { id: '1', name: '開発部' },
    { id: '2', name: 'デザインチーム' },
    { id: '99', name: '全社イベント実行委員' },
  ];

  const handleGroupClick = (groupId) => {
    setIsGroupMenuOpen(false);
    navigate(`/group/${groupId}`);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* 左側：ロゴとナビゲーション */}
      <div className="flex items-center gap-8">
        <Link to="/calendar" className="text-xl font-bold text-blue-600">
          GeekCamp App
        </Link>
        
        {/* グローバルナビゲーション */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/calendar" className="hover:text-blue-600">マイカレンダー</Link>
          <Link to="/tasks" className="hover:text-blue-600">タスク一覧</Link>
          
          {/* グループ切り替えドロップダウン */}
          <div className="relative">
            <button 
              onClick={() => setIsGroupMenuOpen(!isGroupMenuOpen)}
              className="flex items-center gap-1 hover:text-blue-600 focus:outline-none"
            >
              参加グループ
              <span className="text-xs">▼</span>
            </button>

            {isGroupMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                {mockGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => handleGroupClick(group.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {group.name}
                  </button>
                ))}
                <div className="border-t border-gray-100 my-1"></div>
                <Link 
                  to="/group/new" 
                  className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 font-medium"
                  onClick={() => setIsGroupMenuOpen(false)}
                >
                  + グループ作成
                </Link>
              </div>
            )}
          </div>

          <Link to="/instagram" className="hover:text-blue-600">画像生成</Link>
        </nav>
      </div>

      {/* 右側：ユーザープロフィールリンク */}
      <div className="flex items-center gap-4">
        <Link 
          to="/user/me/profile" 
          className="text-sm font-bold text-gray-600 hover:text-blue-600 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          Your Profile
        </Link>
      </div>
    </header>
  );
};