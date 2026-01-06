import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ▼▼▼ 追加 1: 作成した PrivateRoute をインポート ▼▼▼
import PrivateRoute from '../components/PrivateRoute';

// レイアウト
import { MainLayout } from '../components/layout/MainLayout';
import { GroupLayout } from '../components/layout/GroupLayout';

// 公開ページ
import SigninPage from '../pages/signin';
import SignupPage from '../pages/signup';

// ユーザー保護ページ
import UserProfilePage from '../pages/user/UserProfile';

// メイン機能
import CalendarPage from '../pages/calendar';
import InstagramPage from '../pages/instagram';

// タスク関連
import TasksListPage from '../pages/tasks';
import TaskCreatePage from '../pages/tasks/new';
import TaskDetailPage from '../pages/tasks/[taskId]';

// 管理者ページ
import AdminDashboard from '../pages/admin/dashboard';
import AdminMembers from '../pages/admin/members';

// グループ関連ページ
import GroupCalendarPage from '../pages/group/[groupId]';
import GroupMembersPage from '../pages/group/[groupId]/members';
import GroupInfoPage from '../pages/group/[groupId]/info';
import GroupRequestsPage from '../pages/group/[groupId]/join_requests';

export const AppRouter = () => {
  return (
    <Routes>
      {/* --- 公開ルート (ここは誰でもアクセス可能) --- */}
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* デフォルトはログイン画面へリダイレクト */}
      <Route path="/" element={<Navigate to="/signin" replace />} />

      {/* ▼▼▼ 追加 2: ここから下を PrivateRoute で囲む ▼▼▼ */}
      {/* これにより、内部にあるすべてのページでログインチェックが自動で行われます */}
      <Route element={<PrivateRoute />}>

        {/* ▼ メインレイアウト適用エリア (ヘッダーのみ) */}
        <Route element={<MainLayout />}>
          {/* --- ユーザー専用ルート (/user) --- */}
          <Route path="/user/:userId/profile" element={<UserProfilePage />} />

          {/* --- 機能ルート (トップレベル) --- */}
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/instagram" element={<InstagramPage />} />

          {/* --- タスクルート (/tasks) --- */}
          <Route path="/tasks" element={<TasksListPage />} />
          <Route path="/tasks/new" element={<TaskCreatePage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />

          {/* --- 管理者ルート (/admin) --- */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/members" element={<AdminMembers />} />
        </Route>

        {/* ▼ グループレイアウト適用エリア (ヘッダー + サイドバー) */}
        <Route element={<GroupLayout />}>
          {/* --- グループ関連ルート (/group) --- */}
          <Route path="/group/:groupId" element={<GroupCalendarPage />} />
          <Route path="/group/:groupId/members" element={<GroupMembersPage />} />
          <Route path="/group/:groupId/info" element={<GroupInfoPage />} />
          <Route path="/group/:groupId/join_requests" element={<GroupRequestsPage />} />
        </Route>

      </Route>
      {/* ▲▲▲ 追加 2: PrivateRoute 終了タグ ▲▲▲ */}

      {/* 404 Not Found (マッチしない場合) */}
      <Route path="*" element={<div className="p-4">404: ページが見つかりません</div>} />
    </Routes>
  );
};