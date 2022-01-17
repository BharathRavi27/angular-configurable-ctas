import { Observable } from 'rxjs';
import { ActionConfig } from '../action-button';

export abstract class BaseActionService {
  abstract fireAction(): Observable<unknown>;
  abstract getConfig$(): Observable<ActionConfig>;
}
