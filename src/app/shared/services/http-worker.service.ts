import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyWorker } from '../worker.models';

@Injectable({
  providedIn: 'root'
})
export class HttpWorkerService {

  routeApi = "http://localhost:3000/workers";
  constructor(private http: HttpClient) { }

  getWorkers(): Promise<any> {
    return this.http.get(this.routeApi).toPromise();
  }

  postWorkers(data: MyWorker) {
    return this.http.post(this.routeApi, data).toPromise();
  }

  deleteWorkers(id: number) {
    return this.http.delete(this.routeApi + '/' + id).toPromise();
  }

  saveWorkers(data: MyWorker, id: number) {
    return this.http.put(this.routeApi + '/' + id, data).toPromise();
  }
}
