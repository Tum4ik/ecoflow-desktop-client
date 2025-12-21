import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Fieldset } from 'primeng/fieldset';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { AccountService } from '../services/account-service';

@Component({
  selector: 'edc-register-account',
  templateUrl: './register-account.html',
  styleUrl: './register-account.scss',
  imports: [
    Fieldset,
    FloatLabel,
    InputText,
    Button,
  ],
})
export class RegisterAccount {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);

  async register(accessKey: string, secretKey: string) {
    const registered = await this.accountService.registerAsync(accessKey, secretKey);
    if (registered) {
      await this.router.navigate(['']);
    }

    // todo: if not registered - display error message
  }
}
