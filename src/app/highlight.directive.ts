import {Directive, ElementRef, Input, OnChanges, SimpleChange, Renderer} from '@angular/core';


@Directive({selector: '[unisportHighlight]'})
export class HighlightDirective implements OnChanges {
  @Input() word: string;
  @Input() text: string;

  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    let newContent: string;
    if (this.word && this.word.length > 1) {
      newContent = this.text.replace(new RegExp('(' + this.word + ')', 'gi'), '<b class=\'highlight\'>$1</b>');
    } else {
      newContent = this.text;
    }
    newContent = newContent.replace(new RegExp('\n', 'gi'), '<br />');

    this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', newContent);
  }
}
