import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["header.component.css"],
})
export class HeaderComponent implements OnInit {

  constructor(private toaster: ToastrManager, private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.toaster.successToastr('logout succesfull')


  }
}