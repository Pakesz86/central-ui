import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../schemas/user.schema";
import {CreateUser} from "../schemas/create-user.schema";
import {PaginationService} from "./pagination.service";
import {saveAs} from "file-saver";
import {SharedData} from './shared.data';

export interface UserPage {
  content: User[],
  totalElements: number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
              private paginationService: PaginationService,
              private sharedData: SharedData) { }

  getAll(page: number, size: number, sortBy: string, sortDirection: string): Observable<UserPage> {
    return this.paginationService.getPaginated<any>(`${this.sharedData.apiUrl}/api/admin/users`, page, size, sortBy, sortDirection).pipe(
      map(response => ({
        content: response.content.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles.map((role: any) => role.name)
        })),
        totalElements: response.totalElements
      }))
    );
  }

  create(user: CreateUser): Observable<User> {
    return this.http.post<User>(`${this.sharedData.apiUrl}/api/admin/users`, user);
  }

  update(userId: number, roles: string[]): Observable<User> {
    return this.http.put<User>(`${this.sharedData.apiUrl}/api/admin/users/${userId}`, { roles: roles });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<{ success: boolean, message: string }> {
    return this.http.put<{ success: boolean, message: string }>(`${this.sharedData.apiUrl}/api/user/me/change-password`, { oldPassword: oldPassword, newPassword: newPassword });
  }

  remove(userId: number): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(`${this.sharedData.apiUrl}/api/admin/users/${userId}`);
  }
}
