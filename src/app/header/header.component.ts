import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public username = '';

  isActiveModalProduct = false;

  constructor() { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username') ?? '';
  }

  onNotification(){
    alert('Notifications available from version 2!')
  }

  openModalProduct(value : boolean){
    this.isActiveModalProduct = value;
  }

  onProfile(){
    alert('Profile Detail available from version 2!')
  }

  logout() {
    sessionStorage.clear();
    location.reload()
  }
}
