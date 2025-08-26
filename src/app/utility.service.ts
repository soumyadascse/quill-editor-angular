import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  formatAddress(addr: any): string {
    return `${addr.suite}, ${addr.street}, ${addr.city}, ${addr.zipcode} (Lat: ${addr.geo.lat}, Lng: ${addr.geo.lng})`;
  }
}
