import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Plus, Trash2, Download, Upload, CalendarDays, Save, RotateCcw } from 'lucide-react';
import './style.css';

const initialTasks = [
  // Vakıfbank
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Tehlikeli Hastalıklar Sigortası', start: '2025-06-01', end: '2025-06-30', status: 'Tamamlandı', owner: 'Bankasürans', note: 'Haz. 2025' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Ticari Koruma Sigortası', start: '2025-05-01', end: '2025-05-31', status: 'Tamamlandı', owner: 'Bankasürans', note: 'May. 2025' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Poliçe İptal (mevcut ekrana ek olarak)', start: '2025-06-01', end: '2025-06-30', status: 'Tamamlandı', owner: 'BT / Banka', note: 'Haz. 2025' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Limit Koruma Sigortası', start: '2025-06-20', end: '2025-06-20', status: 'Tamamlandı', owner: 'BT', note: '20.06.2025' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Komisyonların Sisteme Alınması', start: '2025-09-01', end: '2025-09-30', status: 'Tamamlandı', owner: 'Mali İşler / BT', note: 'Eylül 2025' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Bireysel Güvence Sigortası', start: '2025-07-01', end: '2025-07-31', status: 'Tamamlandı', owner: 'Bankasürans', note: 'Tem. 2025' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Referans Bazlı Sigorta Satış', start: '2026-01-01', end: '2026-01-31', status: 'Tamamlandı', owner: 'BT / Banka', note: 'Ocak 2026' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Yenileme', start: '2026-01-01', end: '2026-01-31', status: 'Devam', owner: 'BT / Banka', note: 'Ocak 2026' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Zeyil Sorgula, Poliçe İptal / Zeyil Talep', start: '2026-06-26', end: '2026-06-26', status: 'Devam', owner: 'BT', note: '26.06.2026' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'DASK (KKT Sürecinde)', start: '2026-08-01', end: '2026-08-31', status: 'KKT', owner: 'SBM / DASK / BT', note: 'KKT desteği' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Uzun Süreli Yıllık Hayat Satış (KKT Sürecinde)', start: '2026-08-01', end: '2026-08-14', status: 'KKT', owner: 'İş Birimi / BT', note: '14.08 hedef' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Tahsilat Mutabakatı', start: '2026-08-01', end: '2026-08-14', status: 'Devam', owner: 'Tahsilat / BT', note: '14.08 hedef' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Kasko', start: '2026-08-01', end: '2026-08-12', status: 'Devam', owner: 'Banka İş Birimi', note: '12.08 hedef' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Konut', start: '2026-09-01', end: '2026-09-30', status: 'Bekliyor', owner: 'Bankasürans / Banka', note: 'Ürün soru ve kural seti bekleniyor' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'İşyeri', start: '2026-09-01', end: '2026-09-30', status: 'Karar Bekliyor', owner: 'Banka İş Birimi', note: 'Cam bedeli / enflasyon teminatı kararı bekleniyor' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Revizyon Süreçleri (Plan Dışı)', start: '2026-09-01', end: '2026-09-30', status: 'Plan Dışı', owner: 'BT / Banka', note: '30.09.2026' },
  { id: crypto.randomUUID(), bank: 'Vakıfbank', title: 'Proje Kapanışı', start: '2026-10-30', end: '2026-10-30', status: 'Planlandı', owner: 'PMO', note: '30.10.2026' },

  // Ziraat
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Ferdi Kaza Katılım Sigortası', start: '2025-11-01', end: '2025-11-30', status: 'Tamamlandı', owner: 'Bankasürans', note: 'Kasım 2025' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Konut Sigortası Satışı', start: '2026-03-01', end: '2026-03-31', status: 'Tamamlandı', owner: 'BT / Banka', note: 'Mart 2026' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'TKS Ürünlerinin ZSGRPOLG Ekranında Görüntülenmesi (1271377 / AG:30)', start: '2026-08-01', end: '2026-08-31', status: 'Test', owner: 'BT / ZT', note: 'Ağustos test teslimi hedefi' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'TKS Eşleme Ekranı Tanımları (1262234 / AG:64)', start: '2026-08-01', end: '2026-08-31', status: 'Test', owner: 'BT / ZT', note: 'Ağustos hedef, testler devam' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Katılım Ticari Koruma Ekran Entegrasyonu (1280563 / AG:40)', start: '2026-08-01', end: '2026-08-31', status: 'Test Teslim', owner: 'BT / ZT', note: 'Ağustos test teslimi hedefi' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Katılım Ferdi Kaza İnternet ve Mobil Bankacılık Entegrasyonu (1274012 / AG:90)', start: '2026-07-01', end: '2026-09-30', status: 'Planlandı', owner: 'BT / Banka', note: 'Q3 2026' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Ortak Kasko Poliçe Giriş Ekranı (1277736 / AG:20)', start: '2026-10-01', end: '2026-12-31', status: 'Planlandı', owner: 'BT / Banka', note: 'Q4 2026' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Mutabakat Süreçleri / Komisyon / Üretim Hesap', start: '2026-08-01', end: '2026-09-30', status: 'Talep Açılacak', owner: 'Tahsilat / BT', note: 'Talep açılacak' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Teknik Altyapı Çalışmaları / MPLS Kurulumu', start: '2026-07-01', end: '2026-09-30', status: 'Devam', owner: 'BT Altyapı', note: 'Q3 içinde tamamlanması için plan görüşmeleri' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Kasko Sigortası (Genel Süreç)', start: '2026-10-01', end: '2026-12-31', status: 'Planlandı', owner: 'Bankasürans / BT', note: 'Q4 2026' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'TARSİM / Kullanıcı Cep Telefonu Bilgisi', start: '2026-09-01', end: '2026-09-30', status: 'Bekliyor', owner: 'Teknoloji / Banka', note: 'Eylül ayında tamamlanacağı iletildi' },
  { id: crypto.randomUUID(), bank: 'Ziraat Bankası', title: 'Genel Proje Kapanışı', start: '2027-01-01', end: '2027-12-31', status: 'Planlandı', owner: 'PMO', note: '2027' },

  // Halkbank
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Faz 1 Tamamlanma / İlk Poliçe', start: '2023-12-29', end: '2023-12-29', status: 'Tamamlandı', owner: 'BT / Banka', note: '29.12.2023' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Faz 2 Başlangıcı (Iframe içerisinde tüm ürün entegrasyonu)', start: '2024-01-29', end: '2024-01-29', status: 'Tamamlandı', owner: 'BT / Banka', note: '29.01.2024' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Otomatik Kullanıcı / Login / Token', start: '2024-02-01', end: '2024-03-31', status: 'Tamamlandı', owner: 'BT', note: 'Tamamlandı' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Müşteri Bilgileri Web Servisi', start: '2024-03-01', end: '2024-04-30', status: 'Tamamlandı', owner: 'BT / Banka', note: 'Tamamlandı' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Hesaptan Tahsilat / Taksitli Yapı', start: '2024-05-01', end: '2024-06-30', status: 'Tamamlandı', owner: 'Tahsilat / BT', note: 'Tamamlandı' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'SADE Hedef / Performans Ekranı', start: '2024-10-15', end: '2024-10-15', status: 'Tamamlandı', owner: 'Banka / BT', note: '15.10.2024' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Hayat ve Sağlık Üretimleri SADE’ye Yansıması', start: '2025-01-01', end: '2025-03-31', status: 'Tamamlandı', owner: 'BT', note: 'Tamamlandı' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Hızlı Ekranlarda Hesaptan Tahsilat', start: '2025-04-01', end: '2025-06-30', status: 'Tamamlandı', owner: 'BT', note: 'Tamamlandı' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'İade / TransferYap Entegrasyonu', start: '2025-07-01', end: '2025-09-30', status: 'Tamamlandı', owner: 'BT / Banka', note: 'Tamamlandı' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'İzleme (Web Servis Entegrasyonu)', start: '2026-10-01', end: '2026-12-31', status: 'Planlandı', owner: 'BT / Banka', note: '2026 Q4' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Yenileme (Web Servis Entegrasyonu)', start: '2026-10-01', end: '2026-12-31', status: 'Devam', owner: 'BT / Banka', note: 'Banka üretim servis hedefini 2027 konumlandırıyor' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Poliçe İzleme', start: '2026-10-01', end: '2026-12-31', status: 'Planlandı', owner: 'BT / Banka', note: '2026 Q4' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Poliçe Yenileme (manuel-Otomatik)', start: '2026-10-01', end: '2026-12-31', status: 'Planlandı', owner: 'BT / Banka', note: '2026 Q4' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Kredili İşler SMS', start: '2026-08-01', end: '2026-09-30', status: 'Netleşecek', owner: 'Banka / Bankasürans', note: 'SmsGonder servisi, süreç kurgusu toplantısı' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Kredisiz İşler SMS', start: '2026-08-01', end: '2026-09-30', status: 'Görüş Bekliyor', owner: 'TKS / Hukuk / KVKK', note: 'Konut, İşyeri, DASK, Trafik, Kasko, TARSİM, TSS, ÖSS' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Sağlık FTP', start: '2026-08-01', end: '2026-12-31', status: 'Bekliyor', owner: 'Bankasürans / BT', note: 'Sağlık inputları Elementer yapı ile paralel geliştirilecek' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Faz 3 / ANKA Tam Entegrasyon', start: '2027-01-01', end: '2027-12-31', status: 'Planlama Bekleniyor', owner: 'Banka / TKS', note: 'Planlama bekleniyor' },
  { id: crypto.randomUUID(), bank: 'Halkbank', title: 'Genel Proje Kapanışı', start: '2028-01-01', end: '2028-12-31', status: 'Planlandı', owner: 'PMO', note: '2028' },
];

function monthRange(start, end) {
  const a = new Date(start + 'T00:00:00');
  const b = new Date(end + 'T00:00:00');
  const out = [];
  let d = new Date(a.getFullYear(), a.getMonth(), 1);
  while (d <= b) {
    out.push({ key: d.toISOString().slice(0,7), label: d.toLocaleDateString('tr-TR', { month:'short', year:'2-digit' }) });
    d = new Date(d.getFullYear(), d.getMonth()+1, 1);
  }
  return out;
}

function clampDate(v, fallback) { return v || fallback; }
function monthKey(date) { return (date || '').slice(0,7); }
function statusClass(s='') {
  const x = s.toLowerCase();
  if (x.includes('tamam')) return 'done';
  if (x.includes('bek') || x.includes('net')) return 'wait';
  if (x.includes('test') || x.includes('kkt')) return 'test';
  if (x.includes('plan')) return 'plan';
  return 'run';
}

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('bankasuransTasks') || 'null') || initialTasks);
  const [timelineStart, setTimelineStart] = useState('2024-01-01');
  const [timelineEnd, setTimelineEnd] = useState('2028-12-31');
  const [bank, setBank] = useState('Tümü');
  const [query, setQuery] = useState('');
  const [grouped, setGrouped] = useState(true);

  const months = useMemo(() => monthRange(timelineStart, timelineEnd), [timelineStart, timelineEnd]);
  const banks = ['Tümü', ...Array.from(new Set(tasks.map(t => t.bank)))];
  const visible = tasks.filter(t => (bank === 'Tümü' || t.bank === bank) && (t.title + t.status + t.owner + t.note).toLowerCase().includes(query.toLowerCase()));

  function update(id, field, value) { setTasks(ts => ts.map(t => t.id === id ? { ...t, [field]: value } : t)); }
  function addTask(bankName = bank === 'Tümü' ? 'Vakıfbank' : bank) {
    const row = { id: crypto.randomUUID(), bank: bankName, title: 'Yeni Takvim Maddesi', start: timelineStart, end: timelineStart, status: 'Planlandı', owner: '', note: '' };
    setTasks(ts => [row, ...ts]);
  }
  function remove(id) { setTasks(ts => ts.filter(t => t.id !== id)); }
  function save() { localStorage.setItem('bankasuransTasks', JSON.stringify(tasks)); alert('Kaydedildi. Tarayıcıda saklandı.'); }
  function reset() { if (confirm('Varsayılan sunum verisine dönülsün mü?')) { setTasks(initialTasks); localStorage.removeItem('bankasuransTasks'); } }
  function exportJson() {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'bankasurans-takvim-verisi.json'; a.click(); URL.revokeObjectURL(url);
  }
  function importJson(e) {
    const f = e.target.files?.[0]; if(!f) return;
    const r = new FileReader(); r.onload = () => { try { setTasks(JSON.parse(r.result)); } catch { alert('JSON okunamadı'); } }; r.readAsText(f);
  }
  function exportCsv() {
    const header = ['Banka','Baslik','Baslangic','Bitis','Durum','Sorumlu','Not'];
    const rows = tasks.map(t => [t.bank,t.title,t.start,t.end,t.status,t.owner,t.note].map(v => '"' + String(v??'').replaceAll('"','""') + '"').join(';'));
    const blob = new Blob(['\ufeff' + header.join(';') + '\n' + rows.join('\n')], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'bankasurans-takvim.csv'; a.click(); URL.revokeObjectURL(url);
  }

  const renderRows = (rows) => rows.map(t => {
    const startM = monthKey(clampDate(t.start, timelineStart));
    const endM = monthKey(clampDate(t.end, t.start || timelineStart));
    return <tr key={t.id}>
      <td className="sticky taskcell"><input value={t.bank} onChange={e=>update(t.id,'bank',e.target.value)} /></td>
      <td className="sticky2 titlecell"><textarea value={t.title} onChange={e=>update(t.id,'title',e.target.value)} /></td>
      <td><input type="date" value={t.start} onChange={e=>update(t.id,'start',e.target.value)} /></td>
      <td><input type="date" value={t.end} onChange={e=>update(t.id,'end',e.target.value)} /></td>
      <td><input value={t.status} onChange={e=>update(t.id,'status',e.target.value)} /></td>
      <td><input value={t.owner} onChange={e=>update(t.id,'owner',e.target.value)} /></td>
      <td><input value={t.note} onChange={e=>update(t.id,'note',e.target.value)} /></td>
      {months.map(m => <td key={m.key} onDoubleClick={() => { update(t.id,'start',m.key+'-01'); update(t.id,'end',m.key+'-28'); }} className="monthcell">{m.key >= startM && m.key <= endM ? <span className={'bar '+statusClass(t.status)} title="Çift tıklama: bu aya taşı" /> : null}</td>)}
      <td><button className="icon danger" onClick={()=>remove(t.id)}><Trash2 size={16}/></button></td>
    </tr>
  });

  const groupedBanks = Array.from(new Set(visible.map(t=>t.bank)));

  return <div>
    <header>
      <div><h1>Bankasürans Takvim Yönetimi</h1><p>Sunumdaki takvimleri düzenle, satır ekle, tarih aralığını değiştir, JSON/CSV olarak dışa aktar.</p></div>
      <div className="actions"><button onClick={save}><Save size={16}/> Kaydet</button><button onClick={exportJson}><Download size={16}/> JSON</button><button onClick={exportCsv}><Download size={16}/> CSV</button><label className="button"><Upload size={16}/> JSON Al<input hidden type="file" accept=".json" onChange={importJson}/></label></div>
    </header>

    <section className="panel controls">
      <div><label>Takvim Başlangıç</label><input type="date" value={timelineStart} onChange={e=>setTimelineStart(e.target.value)} /></div>
      <div><label>Takvim Bitiş</label><input type="date" value={timelineEnd} onChange={e=>setTimelineEnd(e.target.value)} /></div>
      <div><label>Banka</label><select value={bank} onChange={e=>setBank(e.target.value)}>{banks.map(b=><option key={b}>{b}</option>)}</select></div>
      <div><label>Arama</label><input placeholder="Başlık / durum / not ara" value={query} onChange={e=>setQuery(e.target.value)} /></div>
      <button onClick={()=>addTask()}><Plus size={16}/> Yeni Satır</button>
      <button onClick={()=>setGrouped(!grouped)}><CalendarDays size={16}/> {grouped ? 'Gruplamayı Kapat' : 'Bankaya Göre Grupla'}</button>
      <button className="ghost" onClick={reset}><RotateCcw size={16}/> Sıfırla</button>
    </section>

    <section className="summary">
      <div><strong>{tasks.length}</strong><span>Toplam madde</span></div>
      <div><strong>{visible.length}</strong><span>Filtrelenen madde</span></div>
      <div><strong>{months.length}</strong><span>Görünen ay/sütun</span></div>
    </section>

    <section className="tablewrap">
      <table>
        <thead><tr><th className="sticky">Banka</th><th className="sticky2">Ürün / Talep</th><th>Başlangıç</th><th>Bitiş</th><th>Durum</th><th>Sorumlu</th><th>Not</th>{months.map(m=><th className="rot" key={m.key}>{m.label}</th>)}<th>Sil</th></tr></thead>
        <tbody>
          {grouped ? groupedBanks.map(b => <React.Fragment key={b}><tr className="group"><td colSpan={8+months.length}>{b} <button onClick={()=>addTask(b)}><Plus size={14}/> Bu bankaya satır ekle</button></td></tr>{renderRows(visible.filter(t=>t.bank===b))}</React.Fragment>) : renderRows(visible)}
        </tbody>
      </table>
    </section>

    <footer>İpucu: Satırdaki başlangıç/bitiş tarihlerini değiştirince takvim barı otomatik uzar/kısalır. Ay hücresine çift tıklarsan ilgili madde o aya taşınır.</footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
