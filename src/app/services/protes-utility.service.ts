import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class protesUtilityService {

  getSessionVariableNumber(sessionVariableName: string): number {
    const sessionStorageValue = sessionStorage.getItem(sessionVariableName);
    if (sessionStorageValue !== null) {
      const sessionStorageNumber = Number(sessionStorageValue);
      if (!isNaN(sessionStorageNumber)) {
        return sessionStorageNumber;
      } else {
        console.error(`Il valore per la variabile di sessione ${sessionVariableName} non è stato trovato.`);
        return 1;
      }
    } else {
      console.error(`Il valore per la variabile di sessione ${sessionVariableName} non è stato trovato.`);
      return 1;
    }
  }

  getSessionVariableString(sessionVariableName: string): string {
    const sessionValue = sessionStorage.getItem(sessionVariableName);
    if (sessionValue !== null) {
      return sessionValue;
    } else {
      console.error(`Il valore per la variabile di sessione ${sessionVariableName} non è stato trovato.`);
      return '';
    }
  }

  getSessionVariableOnekeyString(sessionVariableName: string): string {
    const sessionValue = sessionStorage.getItem(sessionVariableName);
    if (sessionValue !== null) {
      return sessionValue;
    } else {
      console.error(`Il valore per la variabile di sessione ${sessionVariableName} non è stato trovato.`);
      return 'AB1236';
    }
  }

  formatDate(date: Date): string {
    var
      month = '' + (date.getMonth() + 1),
      day = '' + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
