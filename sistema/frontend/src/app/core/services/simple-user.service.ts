import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SimpleUserService {
  users: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  async loadUsers(): Promise<void> {
    this.loading = true;
    this.error = null;
    
    try {
      this.users = await lastValueFrom(
        this.http.get<any[]>(`${environment.apiUrl}/users`)
      );
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async addUser(user: any): Promise<void> {
    try {
      const newUser = await lastValueFrom(
        this.http.post(`${environment.apiUrl}/users`, user)
      );
      this.users.push(newUser);
    } catch (error: any) {
      this.error = error.message;
      throw error;
    }
  }
}