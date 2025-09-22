import { Injectable } from "@angular/core";

export const TOKEN_KEY = 'jwtToken'
export const USER_KEY = 'userInfo'

export interface StoredUser {
  id: number
  email: string
  name: string
  surname: string
  roles: string[];
}

@Injectable({
  providedIn: "root"
})
export class UserStorageService {

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY)
  }

  saveUser(response: any) {
    let user: StoredUser = {
      id: response.id,
      email: response.email,
      name: response.name,
      surname: response.surname,
      roles: response.roles
    } as StoredUser;
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  getUser(): StoredUser | null {
    const raw_user = localStorage.getItem(USER_KEY)
    return raw_user ? JSON.parse(raw_user) as StoredUser : null
  }

  clearUser(): void {
    localStorage.removeItem(USER_KEY)
  }

  clearAll(): void {
    localStorage.clear()
  }
}