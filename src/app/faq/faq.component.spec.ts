import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {FaqComponent} from './faq.component';
import {ContentfulService, FAQEntry} from '../contentful.service';
import {Entry} from 'contentful';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(waitForAsync(() => {
    const contentFulStub = {
      getFAQEntries: (): Promise<Entry<FAQEntry>[]> => Promise.resolve([{
        fields: {question: 'Question 1', answer: 'Answer 1'}
      } as Entry<FAQEntry>,
        {
          fields: {question: 'Question 2', answer: 'Answer 2'}
        } as Entry<FAQEntry>
      ]),
    };

    TestBed.configureTestingModule({
      declarations: [FaqComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: ContentfulService, useValue: contentFulStub},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render faq entries loaded form contentful', fakeAsync(() => {
    const element = fixture.nativeElement;
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(element.querySelectorAll('dt').length).toBe(2);
    expect(element.querySelectorAll('dd').length).toBe(2);
  }));
});
