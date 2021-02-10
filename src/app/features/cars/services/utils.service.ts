import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public deepCopy(arg: any): any {
    return JSON.parse(JSON.stringify(arg));
  }

}
