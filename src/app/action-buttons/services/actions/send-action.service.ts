import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, EMPTY, map, Observable, of, switchMap } from 'rxjs';
import { AccessControlService } from 'src/app/services/access-control.service';
import { SendDialogComponent } from '../../../actions/send-dialog/send-dialog.component';
import { ActionConfig } from '../../action-button';
import { BaseActionService } from '../base-action.service';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SendActionService implements BaseActionService {
  constructor(
    public dialog: MatDialog,
    private acceessControlService: AccessControlService,
    private http: HttpClient
  ) {}
  fireAction(): Observable<unknown> {
    return combineLatest([this.acceessControlService.isEditPermitted$()]).pipe(
      switchMap(([isEditPermitted]) => {
        if (isEditPermitted) {
          return this.dialog.open(SendDialogComponent).afterClosed();
        }
        return this.http.get('https://jsonplaceholder.typicode.com/todos');
      })
    );
  }

  getConfig$(): Observable<ActionConfig> {
    return of({ label: 'Send', disabled: false, hintText: 'Send it now!' });
  }
}
