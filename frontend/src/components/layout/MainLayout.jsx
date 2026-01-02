import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* ここに子ルート（CalendarPageやTasksPage）が入ります */}
        <Outlet />
      </main>
    </div>
  );
};