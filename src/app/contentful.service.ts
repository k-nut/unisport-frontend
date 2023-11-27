import {Injectable} from '@angular/core';
import {createClient, Entry, EntryFieldTypes} from 'contentful';

const CONFIG = {
  space: 'gbf87a5hp5jb',
  accessToken:
    'zgWmfK_A5Ujll_rrSbfBqj5O1_UFZNCZ640iAHgNlKE',
};

type FAQEntrySkeleton = {
  contentTypeId: 'faqEntry'
  fields: {
    question: EntryFieldTypes.Text
    answer: EntryFieldTypes.Text
    order: EntryFieldTypes.Number,
  }
}

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

  async getFAQEntries(query?: object): Promise<FAQEntry[]> {
    const res = await this.cdaClient.getEntries<FAQEntrySkeleton>({
      content_type: 'faqEntry',
      order: ['fields.order'],
      ...query
    });
    const entries = res.items.map(i => i.fields);
    return entries;
  }
}
