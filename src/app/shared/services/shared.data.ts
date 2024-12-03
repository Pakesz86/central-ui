import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedData {

  private _apiUrl = 'https://95.85.160.58:8080';

  // Getter for the shared string
  public get apiUrl(): string {
    return this._apiUrl;
  }

  // Setter for the shared string
  public set apiUrl(value: string) {
    this._apiUrl = value;
  }
}
