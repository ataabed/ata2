import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from 'src/app/services/http-client.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , AfterViewInit {
  islogged:boolean=false;
  userName:string="";
  cartProductCount=new BehaviorSubject(this.registerAPI.userData.cartProductsNumber);
 @ViewChild('mainNavBar') mainNavBar!:ElementRef;
@ViewChildren('mainNavBarLinks') mainNavBarLinks!:QueryList<any>;
 
  constructor(public registerAPI:HttpClientService){


}

ngAfterViewInit(): void {
/* console.log(this.mainNavBarLinks) */
}
ngOnInit(): void {
this.registerAPI.userData.userToken.subscribe({

  next:()=>{

    if(this.registerAPI.userData.userToken.getValue()!==null)
    {
this.islogged=true;
    }
    else
    {
      this.islogged=false;
    }
  }
})

this.registerAPI.userData.userName.subscribe({

  next:()=>{

    if(this.registerAPI.userData.userToken.getValue()!==null)
    {
this.userName=this.registerAPI.userData.userName.getValue();
    }
    this.userName="";
  }
});
this.registerAPI.userData.cartProductsNumber.subscribe({
  next:()=>{
    if(this.registerAPI.userData.cartProductsNumber.getValue()!==null)
    {
      this.cartProductCount=this.registerAPI.userData.cartProductsNumber.getValue();
    }
  }
})

}
links:string[]=['home','cart','wishlist','products','categories','brands']

 @HostListener('window:scroll')
scrollWindow()
{
  if(window.scrollY>100)
  {
      this.mainNavBar.nativeElement.classList.add("px-5")
  }
  else
  {
    this.mainNavBar.nativeElement.classList.remove("px-5")

  }

} 
}
