import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, EMPTY, map, Observable, of } from 'rxjs';
import { AccessControlService } from 'src/app/services/access-control.service';
import { SendDialogComponent } from '../../../actions/send-dialog/send-dialog.component';
import { ActionConfig } from '../../action-button';
import { BaseActionService } from '../base-action.service';

@Injectable({
  providedIn: 'root',
})
export class SendActionService implements BaseActionService {
  constructor(
    public dialog: MatDialog,
    private acceessControlService: AccessControlService
  ) {}
  fireAction(): Observable<any> {
    debugger;
    return combineLatest([this.acceessControlService.isEditPermitted$()]).pipe(
      map(([isEditPermitted]) => {
        if (isEditPermitted) {
          return this.dialog.open(SendDialogComponent).afterClosed();
        }
        return EMPTY;
      })
    );
  }

  getConfig$(): Observable<ActionConfig> {
    return of({ label: 'Send', disabled: false, hintText: 'Send it now!' });
  }
}
