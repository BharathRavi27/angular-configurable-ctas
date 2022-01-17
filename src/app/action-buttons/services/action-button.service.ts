import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IButtonAction } from '../action-button';
import { DownloadActionService } from './actions/download-action.service';
import { SendActionService } from './actions/send-action.service';

@Injectable({
  providedIn: 'root'
})
export class ActionButtonService {

  constructor(private sendActionService: SendActionService, private downloadActionService: DownloadActionService) { }

  onAction(action: IButtonAction): Observable<unknown> {
    switch (action) {
      case IButtonAction.SEND:
        return this.sendActionService.fireAction();
      case IButtonAction.DOWNLOAD:
        return this.downloadActionService.fireAction();
    }
  }
  
}
