import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { AccountService } from "./services/account-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  imports: [RouterOutlet],
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly accountService = inject(AccountService);

  async ngOnInit() {
    if (await this.accountService.isRegisteredAsync()) {
      await this.router.navigate(['devices']);
    }
    else {
      await this.router.navigate(['register-account']);
    }
  }
}
