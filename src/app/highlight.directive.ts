import {Directive, ElementRef, Input, OnChanges, SimpleChange, Renderer} from '@angular/core';


@Directive({selector: '[myHighlight]'})
export class HighlightDirective implements OnChanges {
  constructor(private el: ElementRef, private renderer: Renderer) {
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
    let newContent: string;
    if (this.word && this.word.length > 1) {
      newContent = this.text.replace(new RegExp("(" + this.word + ")", "gi"), "<b class='highlight'>$1</b>");
    } else {
      newContent = this.text;
    }

    this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', newContent);

  }

  @Input('myHighlight') word: string;
  @Input() text: string;

}
