import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../globalService';
import { Console } from '@angular/core/src/console';
import { Message } from 'primeng/components/common/api';


@Component({
    selector: 'login-app',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit {

    myForm: FormGroup;
    msgs: Message[] = [];

    constructor(public fb: FormBuilder, public router: Router, public global_service: GlobalService) {
        this.formCode();
    }

    ngOnInit() { }

    formCode() {
        this.myForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        })
    }

    homePage() {
        this.router.navigateByUrl('/home');
    }

    signupPage() {
        this.router.navigateByUrl('/sign-up');
    }

    onEnter(event) {
        if (event.keyCode == 13) {
            this.login();
        }
    }

    login() {
        let url = this.global_service.basePath + 'user/login';
        this.global_service.postMethod(url, this.myForm.value)
            .subscribe((res: any) => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'Login Successfully ' });
                setTimeout(() => {
                    let a = JSON.parse(res._body);
                    localStorage.setItem("username", a.name);
                    localStorage.setItem("token", a.scretKey);
                    this.homePage();
                }, 1000);
            }, err => {
                let error = JSON.parse(err._body);
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: error.data });
                console.log("some error ", err);
            })
    }

}