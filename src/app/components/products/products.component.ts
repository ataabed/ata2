import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { products } from 'src/app/interfaces/products-lst';
import { BaseurlbackendService } from 'src/app/services/baseurlbackend.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { MyLocalStorageService } from 'src/app/services/my-local-storage.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { WishlistService } from 'src/app/services/wishlist.service';

declare let $:any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsLst:products[]=[];
  searchKeyword:string="";
  searchcategory:string="";
  err:string='';
  showLoader=true;
  constructor( private _products:ProductService ,private _Router:Router,
    private _httpClient:HttpClient,
    private _BaseurlbackendService:BaseurlbackendService,
    private _ShoppingCartService :ShoppingCartService,
    private _mylocalStorage:MyLocalStorageService,
    private _HttpClientService:HttpClientService,
    private _WishlistService:WishlistService,
    private toastr: ToastrService){

  }

btn_Wishlist:string="btn  d-inline-block main-color"
btn_NotWishlist:string="btn  d-inline-block "

ngOnInit(): void {
  this._products.getAllProducts().subscribe({
    next:(response)=>{
      this.productsLst=response.data;
    this._WishlistService.GetUserWishlist().subscribe({
next:(wlist)=>{
 // console.log("w",wlist.data.length)
  this._mylocalStorage.saveData('wishListId',wlist.data);
  this._HttpClientService.updateUserWishlist();
  if(wlist.data.length>0)
  {
    this.productsLst.forEach(prod => {
      let pId=prod._id;
      wlist.data.forEach((w: { _id: string; }) => {
        if(w._id===pId)
        {
prod.isInWishList=true;
        }
        
      });
    });

  }
  this.showLoader=false;
}

    })

   /*    console.log(this.productsLst) */
    },
    error:(error)=>{ this.err=error;
      this.showLoader=false;

    }
  })




}

showProductDetail(id:string)

{
this._httpClient.get(`${this._BaseurlbackendService.baseURL}${this._BaseurlbackendService.productsEndPoint}/${id}`).subscribe({
next:(response)=>{
  this._Router.navigate(["productDetails",id])
}

})
//  this._Router.navigate(["productDetails"])
}



addProductToCart(id:string)
{
this._ShoppingCartService.add_product(id).subscribe({
  next:(response)=>{
    this.toastr.success(response.message,"Done",{progressBar:true,
      timeOut:1000,
      positionClass:'toast-bottom-right'});
     this._mylocalStorage.saveData('cartProductsNumber',response.numOfCartItems);
   this._HttpClientService.updateUserCart();
    console.log(response)
  },
  error:(err)=>{
    console.log(err)
  }
})
}


addProductToWishList(id:string)
{  
  $(`#${id}`).toggleClass("main-color")


 this._WishlistService.wishList_Products.forEach(element => {
  element._id===id;

  console.log("in wishlist")
 });
this._WishlistService.addProduct(id).subscribe({
  next:(response)=>{
 
    this.toastr.success(response.message,"Done",{progressBar:true,
      timeOut:1000,
      positionClass:'toast-bottom-right'});
      
/*      this._mylocalStorage.saveData('cartProductsNumber',response.numOfCartItems);
   this._HttpClientService.updateUserCart(); */
  // console.log(response)
  },
  error:(err)=>{
    console.log(err)
  }
})
}
}


