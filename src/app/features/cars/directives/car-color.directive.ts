import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCarColor]'
})
export class CarColorDirective implements OnChanges {
  @Input() carColor: string;
  constructor(private elementReference: ElementRef) {
  }
  ngOnChanges(): void {
    this.elementReference.nativeElement.style.backgroundColor = this.carColor;
  }

}
