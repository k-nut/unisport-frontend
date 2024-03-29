import {Component, OnInit} from '@angular/core';
import {ContentfulService, FAQEntry} from '../contentful.service';

@Component({
  selector: 'unisport-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
  })

export class FaqComponent implements OnInit {
  entries: FAQEntry[] = [];

  constructor(private contentfulService: ContentfulService) {
  }

  ngOnInit() {
    this.contentfulService.getFAQEntries()
      .then(entries => {
        this.entries = entries;
      });
  }
}
