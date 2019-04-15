import { Injectable } from '@angular/core';
import {APIS} from '../../../api';
import { _HttpClient } from '@delon/theme';
 
@Injectable({
  providedIn: 'root',
})
export class ContractService {
   constructor(
        private http: _HttpClient,
   ){}

   _get(api){
         return new Promise(resolve => {
             console.log('ts')
       this.http.get(api).subscribe((res:any) => {
             resolve(res);
        })
         })

   }

    _post(api,data){
         return new Promise(resolve => {
       this.http.post(api,data).subscribe((res:any) => {
             resolve(res);
        })
         })

   }



}

