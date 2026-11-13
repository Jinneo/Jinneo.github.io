// Set TRACKING_SECRET in Project Settings > Script properties.
// Deploy as a web app executing as you, accessible to Anyone.
const SPREADSHEET_ID = '1GOzgc-ut6CPa_nREgRXKCSwInaZlbRlUAwZkhSXZqU0';

function doPost(e) {
  const reply = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  let payload;
  try { payload = JSON.parse(e.postData.contents); } catch { return reply({ ok: false }); }
  const secret = PropertiesService.getScriptProperties().getProperty('TRACKING_SECRET');
  if (!secret || payload.secret !== secret || payload.event !== 'view_projects' || typeof payload.ip !== 'string' || !/^[0-9a-fA-F:.]{2,45}$/.test(payload.ip)) return reply({ ok: false });
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    // Deduplicate repeated clicks from a network within one minute.
    const cache = CacheService.getScriptCache();
    const key = 'project:' + payload.ip;
    if (cache.get(key)) return reply({ ok: true });
    const book = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = book.getSheetByName('Project clicks');
    if (!sheet) {
      sheet = book.insertSheet('Project clicks');
      sheet.appendRow(['Timestamp (UTC)', 'Event', 'Public IP address']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([new Date().toISOString(), 'view_projects', payload.ip]);
    cache.put(key, '1', 60);
    return reply({ ok: true });
  } finally { lock.releaseLock(); }
}
