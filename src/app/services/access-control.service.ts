import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { userPermissions } from '../fake.state';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {

  constructor() { }

  isEditPermitted$(): Observable<boolean> {
    return of(userPermissions.edit);
  }
}
