import {Injectable} from '@angular/core';
import {createClient, Entry} from 'contentful';

const CONFIG = {
  space: 'gbf87a5hp5jb',
  accessToken:
    'zgWmfK_A5Ujll_rrSbfBqj5O1_UFZNCZ640iAHgNlKE',

  contentTypeIds: {
    faqEntry: 'faqEntry',
  },
};

export type FAQEntry = {
  question: string;
  answer: string;
};

@Injectable()
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  getFAQEntries(query?: object): Promise<Entry<FAQEntry>[]> {
    return this.cdaClient.getEntries({
      content_type: CONFIG.contentTypeIds.faqEntry,
      order: 'fields.order',
      ...query
    })
      .then(res => res.items as Entry<FAQEntry>[]);
  }
}
