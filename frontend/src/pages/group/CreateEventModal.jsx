import React, { useState } from 'react';
// ▼▼▼ 追加: Portalを使うために必要 ▼▼▼
import ReactDOM from 'react-dom';

const CreateEventModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    location: '',
    description: '',
    isAllDay: false
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // ▼▼▼ 修正: モーダルの中身を変数に入れる ▼▼▼
  const modalContent = (
    // z-index を 50 から [9999] に変更 (ヘッダーより前に出すため)
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* クリックしたら閉じるための透明な背景レイヤー */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>

      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 relative z-10">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">新規タスク作成</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* タイトル */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">タイトル <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="例: 第3回 定例ミーティング"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* 日時 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">開始日時 <span className="text-red-500">*</span></label>
              <input
                type="datetime-local"
                name="start"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.start}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">終了日時</label>
              <input
                type="datetime-local"
                name="end"
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                value={formData.end}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 場所 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">場所</label>
            <input
              type="text"
              name="location"
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="例: 部室A / オンライン"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* 詳細 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">詳細・メモ</label>
            <textarea
              name="description"
              rows="3"
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="タスクの詳細や持ち物などを記入してください"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm transition-colors"
            >
              作成する
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // ▼▼▼ 修正: createPortalを使ってbody直下に描画 ▼▼▼
  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default CreateEventModal;