import { Injectable } from '@angular/core';
import {APIS} from '../../../api';

export { ContractService }   from '../contract/contract.service';
import { ContractService }   from '../contract/contract.service';
@Injectable()
export class TestContractService extends ContractService {
     constructor() {
    super(null);
  }

   _get(api){
         return new Promise(resolve => {
             let data = []
             console.log('test')
             if(api =='api/search/getOrgId' || api =='/api/search/getOrgId'){
                 data = [{orgName:'520004_平顶山发电分公司',orgId:'81'}]
             }
             resolve({"data":data}
)
         })

   }

    _post(api,data){
         return new Promise(resolve => {
             resolve({})
         })

   }



}

