import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any) {
    await this.init();
    return this._storage?.set(key, value);
  }

  async get(key: string) {
    await this.init();
    return this._storage?.get(key);
  }

  async remove(key: string) {
    await this.init();
    return this._storage?.remove(key);
  }

  async clear() {
    await this.init();
    return this._storage?.clear();
  }

  async keys() {
    await this.init();
    return this._storage?.keys();
  }

  async login(username: string, password: string) {
    await this.init();
    const users = await this.get('users') || [];
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      await this.set('currentUser', user);
      return true;
    }
    return false;
  }

  async logout() {
    await this.init();
    await this.remove('currentUser');
  }

  async getCurrentUser() {
    await this.init();
    return this.get('currentUser');
  }
}
