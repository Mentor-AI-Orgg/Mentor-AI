import { useState, useEffect, useCallback } from 'react';
import { MentorAPI } from '../apiClient.js';

const MONTH_NAMES_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
const WEEKDAY_LABELS_RO = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];

const CalendarScreen = ({ onBack }) => {
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [events, setEvents] = useState([]);
  const [connections, setConnections] = useState({ google: { connected: false }, notion: { connected: false } });
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [connecting, setConnecting] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // luni = 0

  const loadEvents = useCallback(async () => {
    setLoading(true);
    const result = await MentorAPI.getCalendarEvents({ month: month + 1, year });
    if (result.success) {
      setEvents(result.data.events || []);
      setConnections(result.data.connections || { google: { connected: false }, notion: { connected: false } });
      setOffline(false);
    } else {
      setEvents([]);
      setOffline(true);
    }
    setLoading(false);
  }, [month, year]);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  const eventsByDay = {};
  events.forEach(ev => {
    const day = Number(ev.date.slice(8, 10));
    if (!eventsByDay[day]) eventsByDay[day] = [];
    eventsByDay[day].push(ev);
  });

  const changeMonth = delta => {
    setCursor(prev => { const d = new Date(prev); d.setMonth(d.getMonth() + delta); return d; });
    setSelectedDay(null);
  };

  const connect = async provider => {
    setConnecting(provider);
    const result = await MentorAPI.connectCalendarProvider(provider);
    if (result.success && result.data?.oauth_url) {
      window.location.href = result.data.oauth_url;
      return;
    }
    if (result.success) {
      setConnections(prev => ({ ...prev, [provider]: result.data.connection }));
      await loadEvents();
    }
    setConnecting('');
  };

  const disconnect = async provider => {
    await MentorAPI.disconnectCalendarProvider(provider);
    await loadEvents();
  };

  const addEvent = async () => {
    if (!selectedDay || !newTitle.trim()) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const result = await MentorAPI.addCalendarEvent({ date: dateStr, title: newTitle.trim(), type: 'custom' });
    if (result.success) {
      setEvents(prev => [...prev, result.data.event]);
      setNewTitle('');
    }
  };

  const removeEvent = async id => {
    await MentorAPI.deleteCalendarEvent(id);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const todayKey = new Date();
  const isToday = day => todayKey.getFullYear() === year && todayKey.getMonth() === month && todayKey.getDate() === day;

  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="screen-page animate-fadeIn">
      <div className="px-5 pt-6 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Calendar</div>
      </div>

      <div className="mx-5 mt-6 grid gap-4">
        <section className="surface calendar-connect-card">
          <div className="calendar-connect-head">
            <div className="eyebrow">Sincronizare</div>
            <h2 className="display-font">Conectează-ți calendarul</h2>
            <p className="form-subtitle" style={{ margin: '6px 0 0' }}>Leagă Google Calendar sau Notion Calendar și evenimentele se adaugă automat aici.</p>
          </div>
          <div className="calendar-connect-row">
            <div className={`calendar-provider ${connections.google?.connected ? 'connected' : ''}`}>
              <div className="calendar-provider-copy"><i className="fab fa-google"></i><span>Google Calendar</span></div>
              {connections.google?.connected ? (
                <button type="button" className="ghost-button" onClick={() => disconnect('google')}>Deconectează</button>
              ) : (
                <button type="button" className="accent-button" onClick={() => connect('google')} disabled={connecting === 'google'}>
                  {connecting === 'google' ? <i className="fas fa-spinner fa-spin" /> : 'Conectează'}
                </button>
              )}
            </div>
            <div className={`calendar-provider ${connections.notion?.connected ? 'connected' : ''}`}>
              <div className="calendar-provider-copy"><i className="fas fa-book-bookmark"></i><span>Notion Calendar</span></div>
              {connections.notion?.connected ? (
                <button type="button" className="ghost-button" onClick={() => disconnect('notion')}>Deconectează</button>
              ) : (
                <button type="button" className="accent-button" onClick={() => connect('notion')} disabled={connecting === 'notion'}>
                  {connecting === 'notion' ? <i className="fas fa-spinner fa-spin" /> : 'Conectează'}
                </button>
              )}
            </div>
          </div>
          {(connections.google?.mocked || connections.notion?.mocked) && (
            <p className="calendar-mock-note"><i className="fas fa-circle-info" /> Conectare mock — activă doar demonstrativ. Adaugă credențiale OAuth reale în backend pentru sincronizare live.</p>
          )}
        </section>

        <section className="surface calendar-card" aria-busy={loading}>
          <div className="calendar-card-head">
            <button type="button" className="ghost-button calendar-nav-btn" onClick={() => changeMonth(-1)}><i className="fas fa-chevron-left" /></button>
            <h2 className="display-font">{MONTH_NAMES_RO[month]} {year}</h2>
            <button type="button" className="ghost-button calendar-nav-btn" onClick={() => changeMonth(1)}><i className="fas fa-chevron-right" /></button>
          </div>

          {offline && <div className="subscription-warning">Nu s-a putut contacta backend-ul de calendar. Se afișează o grilă goală, locală.</div>}

          <div className="calendar-weekdays">
            {WEEKDAY_LABELS_RO.map(w => <span key={w}>{w}</span>)}
          </div>

          <div className="calendar-grid">
            {cells.map((day, i) => {
              if (day === null) return <div key={`pad-${i}`} className="calendar-cell calendar-cell-empty" />;
              const dayEvents = eventsByDay[day] || [];
              return (
                <button
                  key={day}
                  type="button"
                  className={`calendar-cell ${isToday(day) ? 'is-today' : ''} ${selectedDay === day ? 'is-selected' : ''} ${dayEvents.length ? 'has-events' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <span className="calendar-cell-num">{day}</span>
                  {dayEvents.length > 0 && <span className="calendar-cell-dots">{dayEvents.slice(0, 3).map(e => <i key={e.id} className={`calendar-dot source-${e.source}`} />)}</span>}
                </button>
              );
            })}
          </div>
        </section>

        {selectedDay && (
          <section className="surface calendar-day-panel animate-fadeIn">
            <div className="calendar-day-panel-head">
              <h3 className="display-font">{selectedDay} {MONTH_NAMES_RO[month]}</h3>
              <button type="button" className="ghost-button" onClick={() => setSelectedDay(null)}><i className="fas fa-xmark" /></button>
            </div>
            <div className="calendar-day-events">
              {(eventsByDay[selectedDay] || []).length === 0 && <p className="calendar-empty-hint">Nicio activitate. Adaugă una mai jos.</p>}
              {(eventsByDay[selectedDay] || []).map(ev => (
                <div key={ev.id} className="calendar-event-row">
                  <span className={`calendar-dot source-${ev.source}`} />
                  <span className="calendar-event-title">{ev.title}</span>
                  {ev.source === 'manual' && <button type="button" className="calendar-event-remove" onClick={() => removeEvent(ev.id)}><i className="fas fa-trash" /></button>}
                </div>
              ))}
            </div>
            <div className="calendar-add-row">
              <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ex: Test la fizică" onKeyDown={e => { if (e.key === 'Enter') addEvent(); }} />
              <button type="button" className="accent-button" onClick={addEvent} disabled={!newTitle.trim()}><i className="fas fa-plus" /></button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CalendarScreen;
