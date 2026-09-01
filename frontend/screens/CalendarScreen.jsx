import { useState, useEffect, useCallback } from 'react';
import { MentorAPI } from '../apiClient.js';

const MONTH_NAMES_RO = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
const WEEKDAY_LABELS_RO = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];
const WEEKDAY_FULL = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];

const CalendarScreen = ({ onBack, userData }) => {
  const [tab, setTab] = useState('zile');
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [events, setEvents] = useState([]);
  const [orar, setOrar] = useState([]);
  const [connections, setConnections] = useState({ google: { connected: false }, notion: { connected: false } });
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [connecting, setConnecting] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('');
  const [important, setImportant] = useState(false);
  const [slot, setSlot] = useState({ weekday: 0, time: '08:00', endTime: '08:50', title: 'Matematică', subject: 'matematica' });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;

  const loadEvents = useCallback(async () => {
    setLoading(true);
    const result = await MentorAPI.getCalendarEvents({ month: month + 1, year });
    if (result.success) {
      setEvents(result.data.events || []);
      setOrar(result.data.orar || []);
      setConnections(result.data.connections || { google: { connected: false }, notion: { connected: false } });
      setOffline(false);
    } else {
      setEvents([]);
      setOrar([]);
      setOffline(true);
    }
    setLoading(false);
  }, [month, year]);

  useEffect(() => { loadEvents(); }, [loadEvents]);

  const eventsByDay = {};
  events.forEach(ev => {
    const day = Number(String(ev.date || '').slice(8, 10));
    if (!day) return;
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
    const result = await MentorAPI.addCalendarEvent({
      date: dateStr,
      title: newTitle.trim(),
      type: important ? 'important' : 'custom',
      important,
      ...(newTime ? { time: newTime } : {})
    });
    if (result.success) {
      setEvents(prev => [...prev, result.data.event]);
      setNewTitle('');
      setNewTime('');
      setImportant(false);
    }
  };

  const toggleImportant = async ev => {
    const result = await MentorAPI.patchCalendarEvent(ev.id, { important: !ev.important });
    if (result.success && result.data?.event) {
      setEvents(prev => prev.map(item => item.id === ev.id ? result.data.event : item));
    }
  };

  const removeEvent = async id => {
    await MentorAPI.deleteCalendarEvent(id);
    setEvents(prev => prev.filter(e => e.id !== id));
    setOrar(prev => prev.filter(e => e.id !== id));
  };

  const addSlot = async () => {
    if (!slot.title.trim() || !slot.time) return;
    const result = await MentorAPI.addCalendarEvent({
      type: 'orar',
      weekday: Number(slot.weekday),
      time: slot.time,
      endTime: slot.endTime || undefined,
      title: slot.title.trim(),
      subject: slot.subject,
      date: ''
    });
    if (result.success) {
      setOrar(prev => [...prev, result.data.event].sort((a, b) => (a.weekday - b.weekday) || String(a.time).localeCompare(String(b.time))));
    }
  };

  const todayKey = new Date();
  const isToday = day => todayKey.getFullYear() === year && todayKey.getMonth() === month && todayKey.getDate() === day;
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const slotsByDay = WEEKDAY_FULL.map((_, index) => orar.filter(item => Number(item.weekday) === index).sort((a, b) => String(a.time).localeCompare(String(b.time))));

  return (
    <div className="screen-page animate-fadeIn">
      <div className="px-5 pt-6 flex items-center justify-between">
        <button onClick={onBack} className="text-slate-400 text-sm hover:text-white transition" type="button"><i className="fas fa-arrow-left mr-2"></i>Înapoi</button>
        <div className="text-sm text-slate-400">Calendar</div>
      </div>

      <div className="mx-5 mt-4 calendar-tabs" role="tablist">
        <button type="button" className={tab === 'zile' ? 'selected' : ''} onClick={() => setTab('zile')}>Zile importante</button>
        <button type="button" className={tab === 'orar' ? 'selected' : ''} onClick={() => setTab('orar')}>Orarul meu</button>
      </div>

      {userData?.nudge?.body && (
        <p className="mx-5 mt-4 nudge-banner" role="status"><i className="fas fa-bell" /> {userData.nudge.body}</p>
      )}

      <div className="mx-5 mt-4 grid gap-4">
        {tab === 'zile' && (
          <>
            <section className="surface calendar-card" aria-busy={loading}>
              <div className="calendar-card-head">
                <button type="button" className="ghost-button calendar-nav-btn" onClick={() => changeMonth(-1)}><i className="fas fa-chevron-left" /></button>
                <h2 className="display-font">{MONTH_NAMES_RO[month]} {year}</h2>
                <button type="button" className="ghost-button calendar-nav-btn" onClick={() => changeMonth(1)}><i className="fas fa-chevron-right" /></button>
              </div>
              {offline && <div className="subscription-warning">Nu s-a putut contacta calendarul. Grilă goală, locală.</div>}
              <p className="calendar-lead">Notează testul, serbarea, vacanța. Steaua = important: te anunțăm cu o zi înainte, un singur mesaj, scurt.</p>
              <div className="calendar-weekdays">{WEEKDAY_LABELS_RO.map(w => <span key={w}>{w}</span>)}</div>
              <div className="calendar-grid">
                {cells.map((day, i) => {
                  if (day === null) return <div key={`pad-${i}`} className="calendar-cell calendar-cell-empty" />;
                  const dayEvents = eventsByDay[day] || [];
                  const starred = dayEvents.some(e => e.important);
                  return (
                    <button
                      key={day}
                      type="button"
                      className={`calendar-cell ${isToday(day) ? 'is-today' : ''} ${selectedDay === day ? 'is-selected' : ''} ${dayEvents.length ? 'has-events' : ''} ${starred ? 'is-important' : ''}`}
                      onClick={() => setSelectedDay(day)}
                    >
                      <span className="calendar-cell-num">{day}</span>
                      {dayEvents.length > 0 && (
                        <span className="calendar-cell-dots">
                          {dayEvents.slice(0, 3).map(e => <i key={e.id} className={`calendar-dot ${e.important ? 'is-star' : `source-${e.source}`}`} />)}
                        </span>
                      )}
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
                  {(eventsByDay[selectedDay] || []).length === 0 && <p className="calendar-empty-hint">Nimic notat. Adaugă mai jos.</p>}
                  {(eventsByDay[selectedDay] || []).map(ev => (
                    <div key={ev.id} className="calendar-event-row">
                      <button type="button" className={`calendar-star ${ev.important ? 'on' : ''}`} onClick={() => toggleImportant(ev)} aria-label={ev.important ? 'Scoate de la importante' : 'Marchează important'}>
                        <i className={`fas ${ev.important ? 'fa-star' : 'fa-star'}`} />
                      </button>
                      <span className="calendar-event-title">{ev.time ? `${ev.time} · ` : ''}{ev.title}</span>
                      {ev.source === 'manual' && <button type="button" className="calendar-event-remove" onClick={() => removeEvent(ev.id)}><i className="fas fa-trash" /></button>}
                    </div>
                  ))}
                </div>
                <div className="calendar-add-row">
                  <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} aria-label="Ora (opțional)" />
                  <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ex: Test la mate" onKeyDown={e => { if (e.key === 'Enter') addEvent(); }} />
                  <button type="button" className="accent-button" onClick={addEvent} disabled={!newTitle.trim()}><i className="fas fa-plus" /></button>
                </div>
                <label className="calendar-important-check">
                  <input type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} />
                  <span>Important — un reminder cu o zi înainte</span>
                </label>
                <div className="calendar-suggest-row">
                  {['Test la mate', 'Lectură la română', 'Serbare', userData?.dailyHours === '0.5' ? 'Sesiune 30 min' : 'Sesiune 1 oră'].map(label => (
                    <button key={label} type="button" className="ghost-button" onClick={() => setNewTitle(label)}>{label}</button>
                  ))}
                </div>
              </section>
            )}

            <section className="surface calendar-connect-card">
              <div className="calendar-connect-head">
                <div className="eyebrow">Opțional</div>
                <h2 className="display-font">Google sau Notion</h2>
                <p className="form-subtitle" style={{ margin: '6px 0 0' }}>Nu e obligatoriu. Orarul și datele tale stau aici, în aplicație.</p>
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
                <p className="calendar-mock-note"><i className="fas fa-circle-info" /> Conectare demo. Pentru sincronizare live trebuie chei OAuth pe server.</p>
              )}
            </section>
          </>
        )}

        {tab === 'orar' && (
          <section className="surface calendar-orar">
            <div className="eyebrow">Săptămâna ta</div>
            <h2 className="display-font">Orarul de la școală</h2>
            <p>Scrie orele tale. Nu e temă: e harta zilei. Când se apropie o oră, poți primi un mesaj scurt — maxim unul pe zi.</p>
            <div className="orar-grid">
              {WEEKDAY_FULL.slice(0, 5).map((label, index) => (
                <div key={label} className="orar-day">
                  <strong>{label}</strong>
                  {(slotsByDay[index] || []).length === 0 && <small>gol</small>}
                  {(slotsByDay[index] || []).map(item => (
                    <div key={item.id} className="orar-slot">
                      <span>{item.time}{item.endTime ? `–${item.endTime}` : ''} · {item.title}</span>
                      <button type="button" className="calendar-event-remove" onClick={() => removeEvent(item.id)} aria-label="Șterge ora"><i className="fas fa-trash" /></button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="orar-add">
              <select value={slot.weekday} onChange={e => setSlot(prev => ({ ...prev, weekday: e.target.value }))} aria-label="Ziua">
                {WEEKDAY_FULL.slice(0, 5).map((label, index) => <option key={label} value={index}>{label}</option>)}
              </select>
              <input type="time" value={slot.time} onChange={e => setSlot(prev => ({ ...prev, time: e.target.value }))} aria-label="De la" />
              <input type="time" value={slot.endTime} onChange={e => setSlot(prev => ({ ...prev, endTime: e.target.value }))} aria-label="Până la" />
              <input value={slot.title} onChange={e => setSlot(prev => ({ ...prev, title: e.target.value }))} placeholder="Materia" />
              <button type="button" className="accent-button" onClick={addSlot}>Adaugă ora</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CalendarScreen;
