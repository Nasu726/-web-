import React from 'react';

// 日付フォーマット用のヘルパー関数
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const EventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const { title, start, end, extendedProps, backgroundColor } = event;
  
  // extendedPropsから独自データを取得 (groupNameを追加)
  const description = extendedProps?.description || '説明はありません';
  const location = extendedProps?.location || '未定';
  const groupName = extendedProps?.groupName || '個人予定'; // デフォルト値

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* ヘッダー部分 */}
        <div className="px-6 py-4 border-b border-slate-100 relative overflow-hidden">
          {/* アクセントカラーの装飾バー（左側） */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: backgroundColor }}></div>

          <div className="pl-2">
            {/* ▼▼▼ 追加: グループ名バッジ ▼▼▼ */}
            <span 
              className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white mb-1 tracking-wide"
              style={{ backgroundColor: backgroundColor }}
            >
              {groupName}
            </span>

            <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {formatDate(start)} {end && ` - ${formatDate(end)}`}
            </p>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors bg-white rounded-full p-1 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* コンテンツ部分 */}
        <div className="px-6 py-6 space-y-5">
          {/* 場所情報 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
              {/* マップピンアイコン */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">場所</p>
              <p className="text-sm font-medium text-slate-800 mt-0.5">{location}</p>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
              {/* テキストアイコン */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">詳細</p>
              <p className="text-sm text-slate-600 mt-0.5 whitespace-pre-wrap leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors"
          >
            閉じる
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm transition-colors"
            onClick={() => alert('参加機能は未実装です')}
          >
            参加する
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};

export default EventModal;