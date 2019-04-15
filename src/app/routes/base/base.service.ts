import {Injectable} from '@angular/core';
import {_HttpClient} from "@delon/theme";
import {ContextService} from "../context.service";

@Injectable()
export class BaseService {

  constructor(protected http: _HttpClient,
              protected ctx:ContextService) {}


  protected async get(url:string) {
    return await this.asyncGeta(url);
  }

  private async asyncGeta(url:string): Promise<any> {
    console.log(`[Do Post][URL:${url}]`);
    return this.http.get(url)
      .toPromise()
      .then((result: any) => {
        console.log('[Post Result]:', result);
        return (result);
      })
      .catch(error => {console.log(error); throw (error);});
  }

  protected async post(url:string, params:any) {
    return await this.asyncPosta(url, params);
  }

  private asyncPosta(url:string, params:any): Promise<any> {
    console.log(`[URL:${url}][Before Post]`, JSON.stringify(params));
    console.log(params);
    return this.http.post(url, params)
      .toPromise()
      .then((result: any) => {
        console.log(`[URL:${url}][After  Post]:`, result);
        return (result);
      })
      .catch(error => {console.log(error); throw (error);});
  }
}
