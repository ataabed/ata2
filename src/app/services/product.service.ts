import { Injectable, OnInit } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { BaseurlbackendService } from './baseurlbackend.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

 url=`${this._baseurlbackend.baseURL}${this._baseurlbackend.productsEndPoint}`;
  constructor(private _baseurlbackend:BaseurlbackendService ,
    private _HttpClient:HttpClient) 
    { }

  getAllProducts():Observable<any>
  {
   
  return this._HttpClient.get(this.url)
   
  }
   

}
