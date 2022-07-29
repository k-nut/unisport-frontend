import {Pipe, PipeTransform} from '@angular/core';
import {marked} from 'marked';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'markdown'
})
export class Markdown implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: any, args?: any): any {
    return this.domSanitizer.bypassSecurityTrustHtml(marked.parse(value));
  }
}
