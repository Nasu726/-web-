import React from 'react';
import { Outlet, NavLink, useParams } from 'react-router-dom';
import { Header } from './Header';

export const GroupLayout = () => {
  const { groupId } = useParams(); // URLからIDを取得 (例: 123)

  // サイドバーのリンク定義
  const menuItems = [
    { label: '予定表', path: `/group/${groupId}` }, // index
    { label: 'メンバー一覧', path: `/group/${groupId}/members` },
    { label: '参加申請', path: `/group/${groupId}/join_requests` },
    { label: 'グループ情報', path: `/group/${groupId}/info` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* === 左サイドバー === */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <div className="p-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Group Menu
            </h2>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === `/group/${groupId}`} // トップページだけ完全一致判定
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* === メインコンテンツエリア === */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};