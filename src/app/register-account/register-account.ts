import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Fieldset } from 'primeng/fieldset';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

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

}
