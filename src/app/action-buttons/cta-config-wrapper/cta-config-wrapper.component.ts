import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cta-config-wrapper',
  templateUrl: './cta-config-wrapper.component.html',
})
export class CtaConfigWrapperComponent implements OnInit {
  @Input() hintText: string;
  constructor() {}

  ngOnInit(): void {}
}
