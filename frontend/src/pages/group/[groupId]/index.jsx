import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// ▼▼▼ パス修正: 2つ上の階層(pages)まで戻ってから calendar へ ▼▼▼
import EventModal from '../../calendar/EventModal';

// ▼▼▼ パス修正: 1つ上の階層(group)に戻って CreateEventModal へ ▼▼▼
import CreateEventModal from '../CreateEventModal';

const GroupCalendarPage = () => {
  // ★重要: 管理者権限シミュレーション
  const isAdmin = true; // 管理者なら true、一般メンバーなら false に切り替えて動作確認してください

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsDetailModalOpen(true);
  };

  const handleCreateEvent = (formData) => {
    console.log('新規タスク作成:', formData);
    alert('タスクを作成しました（仮）');
  };

  return (
    <div className="space-y-6">
      
      {/* グループヘッダー */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              Dev
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">開発部</h1>
              <p className="text-sm text-slate-500">メンバー: 12名</p>
            </div>
          </div>
        </div>

        {/* 管理者のみ表示 */}
        {isAdmin && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all transform hover:scale-105"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            新規タスク作成
          </button>
        )}
      </div>

      {/* グループカレンダー */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="h-[750px]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek'
            }}
            locale="ja"
            firstDay={1}
            height="100%"
            eventColor="#6366f1"
            
            events={[
              { 
                title: '定例開発ミーティング', 
                start: new Date().toISOString().split('T')[0] + 'T18:00:00',
                extendedProps: {
                  groupName: '開発部',
                  location: '部室A',
                  description: '今週の進捗確認を行います。'
                }
              },
              { 
                title: 'LT大会リハーサル', 
                start: '2026-01-25T13:00:00',
                extendedProps: {
                  groupName: '開発部',
                  location: 'オンライン',
                  description: '新入生歓迎LTのリハーサルです。'
                }
              }
            ]}
            eventClick={handleEventClick}
            editable={isAdmin}
            selectable={isAdmin}
          />
        </div>
      </div>

      <EventModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        event={selectedEvent} 
      />

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
  );
};

export default GroupCalendarPage;