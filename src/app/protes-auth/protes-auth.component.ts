import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-protes-auth',
  templateUrl: './protes-auth.component.html',
  styleUrls: ['./protes-auth.component.scss']
})
export class ProtesAuthComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private dataService: DataService) { }

  @Output() token = new EventEmitter<string>();

  ngOnInit(): void {
  }

  login() {
    this.dataService.login(
      this.loginForm.get('email')?.value ?? '',
      this.loginForm.get('password')?.value ?? ''
    ).subscribe((data) => {
      if (data.token) {
        sessionStorage.setItem('username', data.username);
        this.token.emit(data.token);
      }
    })
  }
}
