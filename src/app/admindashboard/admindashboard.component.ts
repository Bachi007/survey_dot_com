import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css'
})
export class AdmindashboardComponent {
  
title = 'material-responsive-sidenav';
@ViewChild(MatSidenav)
sidenav!: MatSidenav;
isMobile= true;
isCollapsed = false;

constructor(private observer: BreakpointObserver,private router:Router) {}
username:any;

logoutme(){
  localStorage.removeItem('user');
  this.router.navigateByUrl('/login');
}

ngOnInit() {
  if(localStorage.getItem('user') == null){
    this.router.navigateByUrl('/login');
  }
  else{
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.userName;
    
  }
  this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
    if(screenSize.matches){
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  });
}

toggleMenu() {
  if(this.isMobile){
    this.sidenav.toggle();
    this.isCollapsed = false; // On mobile, the menu can never be collapsed
  } else {
    this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
    this.isCollapsed = !this.isCollapsed;
  }
}

}
