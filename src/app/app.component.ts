import { Component } from '@angular/core';
import { IButtonAction } from './action-buttons/action-button';
import { ActionButtonService } from './action-buttons/services/action-button.service';
import { DownloadActionService } from './action-buttons/services/actions/download-action.service';
import { SendActionService } from './action-buttons/services/actions/send-action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public actionButtonService: ActionButtonService,
    public sendActionService: SendActionService,
    public downloadActionService: DownloadActionService
  ) {}
  sendAction = IButtonAction.SEND;
  downloadAction = IButtonAction.DOWNLOAD;

  get sendConfig$() {
    return this.sendActionService.getConfig$();
  }
  onSend() {
    this.actionButtonService.onAction(IButtonAction.SEND).subscribe((data) => {
      console.log(data);
    });
  }
  onDownload() {
    this.actionButtonService
      .onAction(IButtonAction.DOWNLOAD)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
