import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// import './Calendar.css'; 
import EventModal from './EventModal';

const CalendarPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative">
      
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">マイカレンダー</h2>
          <p className="text-sm text-slate-500">個人の予定とタスクを管理します</p>
        </div>
      </div>

      {/* ▼▼▼ 修正: 高さを750pxに固定して広さを確保 ▼▼▼ */}
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
          
          // ▼▼▼ 修正: contentHeight="auto" を削除し、親要素の高さいっぱいに広げる ▼▼▼
          height="100%" 
          fixedWeekCount={false} // 余分な行を消す設定は便利なので残しますが、好みで消してもOKです

          events={[
            { 
              title: 'プロジェクト会議', 
              start: new Date().toISOString().split('T')[0],
              color: '#6366f1',
              extendedProps: {
                groupName: '開発部',
                location: '部室A',
                description: '新規アプリ開発の進捗報告と、次週のタスク割り当てについて話し合います。'
              }
            },
            { 
              title: 'デザインレビュー', 
              start: '2026-01-15T14:00:00',
              end: '2026-01-15T16:00:00',
              color: '#ec4899',
              extendedProps: {
                groupName: 'デザインチーム',
                location: 'オンライン (Zoom)',
                description: 'UIデザインの初稿レビュー。Figmaのリンクを事前に確認しておいてください。'
              }
            },
            { 
              title: '冬合宿', 
              start: '2026-01-20', 
              end: '2026-01-23', 
              color: '#10b981',
              extendedProps: {
                groupName: 'MMA 全体',
                location: '山梨県 セミナーハウス',
                description: '2泊3日の開発合宿です。PCと延長コードを忘れずに。\n参加費: 15,000円'
              }
            },
            {
              title: 'レポート提出',
              start: '2026-01-28T13:00:00',
              color: '#f59e0b',
              extendedProps: {
                groupName: '個人タスク',
                location: 'LMS',
                description: '情報通信工学実験の最終レポート締め切り。'
              }
            }
          ]}
          eventClick={handleEventClick}
          editable={true}
          selectable={true}
          dayMaxEvents={true}
        />
      </div>

      <EventModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        event={selectedEvent} 
      />

    </div>
  );
};

export default CalendarPage;