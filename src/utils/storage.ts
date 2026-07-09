import Dexie, { Table } from 'dexie'

export interface StoredData {
  id?: number
  key: string
  value: any
  timestamp: number
  synced: boolean
}

export class AppDB extends Dexie {
  storage!: Table<StoredData>

  constructor() {
    super('ESHPETCODb')
    this.version(1).stores({
      storage: '++id, key, synced',
    })
  }
}

const db = new AppDB()

export async function setStorageItem(key: string, value: any): Promise<void> {
  await db.storage.put({
    key,
    value,
    timestamp: Date.now(),
    synced: false,
  })
}

export async function getStorageItem(key: string): Promise<any> {
  const item = await db.storage.where('key').equals(key).first()
  return item?.value ?? null
}

export async function removeStorageItem(key: string): Promise<void> {
  await db.storage.where('key').equals(key).delete()
}

export async function clearStorage(): Promise<void> {
  await db.storage.clear()
}

export async function getAllUnsynced(): Promise<StoredData[]> {
  return db.storage.where('synced').equals(false).toArray()
}

export async function markAsSynced(id: number): Promise<void> {
  await db.storage.update(id, { synced: true })
}
