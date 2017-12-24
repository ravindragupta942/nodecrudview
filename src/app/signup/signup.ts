import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../globalService';
import { Message } from 'primeng/components/common/api';

@Component({
    selector: 'signup-app',
    templateUrl: './signup.html',
    styleUrls: ['./signup.css']
})

export class SignupComponent implements OnInit {

    myFormSignup: FormGroup;
    msgs: Message[] = [];

    constructor(public fb: FormBuilder, public router: Router, public global_service: GlobalService) {
        this.formCode();
    }

    ngOnInit() { }

    formCode() {
        this.myFormSignup = this.fb.group({
            username: '',
            password: '',
            email: ['',[Validators.required,Validators.pattern('[a-z-.-A-zÀ-ÿ_0-9]+@[a-zA-ZÀ-ÿ]+[.][a-z-.-A-ZÀ-ÿ]+')]],
            mobile: ['',[Validators.required,Validators.pattern('^[0-9]+$')]]
        })
    }

    loginPage() {
        this.router.navigateByUrl('/login');
    }

    postData() {
        let url = this.global_service.basePath + 'user/signup';
        this.global_service.postMethod(url, this.myFormSignup.value)
            .subscribe((res) => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'User created' });
                this.myFormSignup.reset();
                setTimeout(() =>{
                    this.loginPage();
                },1000)
            }, err => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: 'User not created' });
                this.myFormSignup.reset();
                console.log("check error ", err);
            })
    }

}