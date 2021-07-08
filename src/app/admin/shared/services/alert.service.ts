import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface Alert {
  type: AlertType,
  text: string
}

export type AlertType = 'success' | 'warning' | 'danger';

@Injectable()

export class AlertService {

  private readonly alertSubject: Subject<Alert> = new Subject();
  readonly alert$ = this.alertSubject.asObservable();

  constructor() {
  }

  success(text: string) {
    this.alertSubject.next({
      type: 'success',
      text
    })
  }

  warning(text: string) {
    this.alertSubject.next({
      type: 'success',
      text
    })
  }

  danger(text: string) {
    this.alertSubject.next({
      type: 'success',
      text
    })
  }
}
