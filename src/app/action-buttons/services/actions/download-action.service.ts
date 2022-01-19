import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { BaseActionService } from '../base-action.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadActionService implements BaseActionService {
  fireAction(): Observable<string> {
    return EMPTY;
  }
  getConfig$() {
    return of({
      label: 'Download',
      disabled: false,
      hintText: 'Click to download',
    });
  }
}
