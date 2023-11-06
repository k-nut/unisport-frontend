import {Pipe, PipeTransform} from '@angular/core';
import {marked} from 'marked';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'markdown'
})
export class Markdown implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(marked.parse(value));
  }
}
