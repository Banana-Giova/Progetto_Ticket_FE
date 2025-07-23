import { Injectable } from "@angular/core";

export const TOKEN_KEY = 'jwtToken'
@Injectable ({
    
    providedIn: "root"
})


export class UserStorageService {

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  }

  

}