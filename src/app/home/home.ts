import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../globalService';
import { Message } from 'primeng/components/common/api';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'home-app',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})

export class HomeComponent implements OnInit {

    cars: any[];
    userData: any;
    lodingData: boolean = true;
    username: any;
    msgs: Message[] = [];
    searchUsers = new FormControl();


    constructor(public router: Router, public global_service: GlobalService) {
        this.username = localStorage.getItem("username");
        this.cars = [
            { vin: 'Dummy', year: '2011', brand: 'BMW' },
            { vin: 'Dummy', year: '2011', brand: 'BMW' },
            { vin: 'Dummy', year: '2011', brand: 'BMW' },
            { vin: 'Dummy', year: '2011', brand: 'BMW' },
            { vin: 'Dummy', year: '2011', brand: 'BMW' },
        ];
    }

    ngOnInit() {
        this.getUsers();
        this.searchUsers.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe((value) => {
                console.log('check ', value);
                if (value.length > 2) {
                    this.searchUser(value)
                }
                else if (value == '') {
                    this.getUsers();
                }
            })
    }

    searchUser(value) {
        let url = this.global_service.basePath + "user/search?username=" + value;
        this.global_service.getMethod(url)
            .subscribe((res: any) => {
                this.userData = JSON.parse(res._body).data;
                console.log("check data ", res._body);
                console.log("check data2 ", JSON.parse(res._body));
            }, err => {
                console.log("some error ", err);
            })
    }

    back() {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }

    getUsers() {
        let url = this.global_service.basePath + 'user/getuser?limit=10?page=1';
        this.global_service.getMethod(url)
            .subscribe((res: any) => {
                this.userData = JSON.parse(res._body).data;
                this.lodingData = false;
            }, err => {
                console.log("check error ", err)
            })
    }

    getUsersPagination(page) {
        console.log("check page ", page);
        let url = this.global_service.basePath + 'user/getuserpagination?limit=10&page='+page;
        this.global_service.getMethod(url)
            .subscribe((res: any) => {
                console.log("check pagination");
                this.userData = JSON.parse(res._body).data;
                this.lodingData = false;
            }, err => {
                console.log("check error ", err)
            })
    }

    editPage(data) {
        this.router.navigate(['/user-details', data._id])
        console.log("check data ", data._id);
    }

    deleteUsers(data) {
        let url = this.global_service.basePath + 'user/delete?userId=' + data._id;
        this.global_service.deleteMethod(url)
            .subscribe((res: any) => {
                this.msgs = [];
                this.msgs.push({ severity: 'success', detail: 'User Deleted ' });
                this.getUsers();
                console.log("check delkete ", res);
            }, err => {
                this.msgs = [];
                this.msgs.push({ severity: 'error', detail: 'User not Deleted' });
                console.log("check error ", err)
            })
    }

    loadUserData(event) {
        let page = (event.first + 10) / 10;
        this.getUsersPagination(page);
        console.log("check page link ", page);
    }

}