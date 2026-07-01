import initSqlJs from 'sql.js';

const DB_KEY = 'taxpilot-ai-sqlite-db';

let dbInstance: any = null;
let sqlPromise: Promise<any> | null = null;

async function getSql() {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({ locateFile: (file: string) => `/${file}` });
  }
  return sqlPromise;
}

function saveDbToStorage(db: any) {
  const data = db.export();
  const base64 = arrayBufferToBase64(data);
  window.localStorage.setItem(DB_KEY, base64);
}

function loadDbFromStorage(): Uint8Array | null {
  const base64 = window.localStorage.getItem(DB_KEY);
  if (!base64) return null;
  return base64ToArrayBuffer(base64);
}

function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = '';
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): Uint8Array {
  const binary = window.atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function initDb() {
  if (dbInstance) return dbInstance;

  const SQL = await getSql();
  const stored = loadDbFromStorage();

  if (stored) {
    dbInstance = new SQL.Database(stored);
  } else {
    dbInstance = new SQL.Database();
    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS tax_workspace (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        pan TEXT,
        financial_year TEXT,
        income TEXT,
        deductions TEXT,
        notes TEXT,
        updated_at TEXT
      );
    `);
    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS tax_documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        doc_type TEXT,
        content TEXT,
        created_at TEXT
      );
    `);
    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS deductions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section TEXT,
        amount REAL,
        description TEXT,
        created_at TEXT
      );
    `);
    saveDbToStorage(dbInstance);
  }

  return dbInstance;
}

export type TaxWorkspaceData = {
  pan: string;
  financialYear: string;
  income: string;
  deductions: string;
  notes: string;
};

export async function getTaxWorkspace(): Promise<TaxWorkspaceData> {
  const db = await initDb();
  const stmt = db.prepare('SELECT * FROM tax_workspace WHERE id = 1');
  const row = stmt.getAsObject();
  stmt.free();

  if (!row || Object.keys(row).length === 0) {
    return {
      pan: '',
      financialYear: '2025-26',
      income: '',
      deductions: '',
      notes: '',
    };
  }

  return {
    pan: (row.pan as string) || '',
    financialYear: (row.financial_year as string) || '2025-26',
    income: (row.income as string) || '',
    deductions: (row.deductions as string) || '',
    notes: (row.notes as string) || '',
  };
}

export async function saveTaxWorkspace(data: TaxWorkspaceData): Promise<void> {
  const db = await initDb();
  const now = new Date().toISOString();

  db.run(`
    INSERT OR REPLACE INTO tax_workspace (id, pan, financial_year, income, deductions, notes, updated_at)
    VALUES (1, $pan, $financialYear, $income, $deductions, $notes, $updatedAt)
  `, {
    $pan: data.pan,
    $financialYear: data.financialYear,
    $income: data.income,
    $deductions: data.deductions,
    $notes: data.notes,
    $updatedAt: now,
  });

  saveDbToStorage(db);
}

export async function clearTaxWorkspace(): Promise<void> {
  const db = await initDb();
  db.run('DELETE FROM tax_workspace WHERE id = 1');
  saveDbToStorage(db);
}

export async function addDocument(name: string, docType: string, content: string): Promise<void> {
  const db = await initDb();
  const now = new Date().toISOString();
  db.run(`
    INSERT INTO tax_documents (name, doc_type, content, created_at)
    VALUES ($name, $docType, $content, $createdAt)
  `, {
    $name: name,
    $docType: docType,
    $content: content,
    $createdAt: now,
  });
  saveDbToStorage(db);
}

export async function getDocuments(): Promise<any[]> {
  const db = await initDb();
  const stmt = db.prepare('SELECT * FROM tax_documents ORDER BY created_at DESC');
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export async function addDeduction(section: string, amount: number, description: string): Promise<void> {
  const db = await initDb();
  const now = new Date().toISOString();
  db.run(`
    INSERT INTO deductions (section, amount, description, created_at)
    VALUES ($section, $amount, $description, $createdAt)
  `, {
    $section: section,
    $amount: amount,
    $description: description,
    $createdAt: now,
  });
  saveDbToStorage(db);
}

export async function getDeductions(): Promise<any[]> {
  const db = await initDb();
  const stmt = db.prepare('SELECT * FROM deductions ORDER BY created_at DESC');
  const rows: any[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}
