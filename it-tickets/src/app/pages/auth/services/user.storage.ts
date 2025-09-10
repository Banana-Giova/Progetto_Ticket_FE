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

  /*
  // ---------------------------
  // JWT helpers: decode + roles
  // ---------------------------

  private parseJwt(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payload = parts[1];
      // base64url -> base64
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      // atob returns a binary string; need to decode utf-8 safely
      const binary = window.atob(base64);
      const decoded = decodeURIComponent(Array.prototype.map.call(binary, (c: string) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));
      return JSON.parse(decoded);
    } catch (e) {
      // malformato o non decodificabile
      return null;
    }
  }

   * Ritorna i ruoli estratti dalla claim "roles" del token.
   * Se non ci sono ruoli o token assente/malformato, ritorna array vuoto.
   
  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const claims = this.parseJwt(token);
    if (!claims) return [];

    const rolesClaim = claims['roles'];
    if (!rolesClaim) return [];

    if (Array.isArray(rolesClaim)) {
      return rolesClaim.map(r => String(r));
    }

    if (typeof rolesClaim === 'string') {
      // a volte il server mette i ruoli in una stringa separata da virgole
      if (rolesClaim.includes(',')) {
        return rolesClaim.split(',').map(r => r.trim());
      }
      return [rolesClaim];
    }

    // altro tipo (numero, oggetto) -> prova a serializzare
    try {
      return [JSON.stringify(rolesClaim)];
    } catch {
      return [];
    }
  }


   * Utility: ritorna true se l'utente ha quel ruolo

  hasRole(roleName: string): boolean {
    const roles = this.getRoles();
    return roles.includes(roleName);
  }
  */
}
