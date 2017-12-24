import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GlobalService } from '../../globalService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';



@Component({
    selector: 'app-user',
    templateUrl: './userDetails.html',
    styleUrls: ['./userDetails.css']
})

export class UserDetails implements OnInit {

    getUserId: any;
    myFormSignup: FormGroup;
    msgs: Message[] = [];


    constructor(public router: Router ,public fb: FormBuilder,private activatedRoute: ActivatedRoute, public global_service: GlobalService) {
        this.formCode();
        this.activatedRoute.params.forEach((param: Params) => {
            this.getUserId = param['id'];
        })
    }

    ngOnInit() {
        this.getUniqueData();
    }

    formCode() {
        this.myFormSignup = this.fb.group({
            username: '',
            email: ['',[Validators.required,Validators.pattern('[a-z-.-A-zÀ-ÿ_0-9]+@[a-zA-ZÀ-ÿ]+[.][a-z-.-A-ZÀ-ÿ]+')]],
            mobile: ['',[Validators.required,Validators.pattern('^[0-9]+$')]]
        })
    }

    getUniqueData() {
        let url = this.global_service.basePath + 'user/edit?userId=' + this.getUserId;
        this.global_service.getMethod(url)
            .subscribe((res: any) => {
                let data = JSON.parse(res._body).data;
                this.myFormSignup.controls['username'].setValue(data.username);
                this.myFormSignup.controls['email'].setValue(data.email);
                this.myFormSignup.controls['mobile'].setValue(data.mobile);
                console.log("check response ", res);
            }, err => {
                console.log("some error ", err);
            })
    }

    back(){
        this.router.navigateByUrl('home');
    }

    updateData() {
        let url = this.global_service.basePath + 'user/update';
        this.global_service.putMethod(url, this.myFormSignup.value)
            .subscribe((res) => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'User Updated' });
                setTimeout(() =>{
                    this.back();
                },2000)
            }, err => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: 'User not Updated' });
                this.myFormSignup.reset();
                console.log("check error ", err);
            })
    }


}