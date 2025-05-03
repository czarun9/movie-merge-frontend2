import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePaginationComponent } from './browse-pagination.component';

describe('BrowsePaginationComponent', () => {
  let component: BrowsePaginationComponent;
  let fixture: ComponentFixture<BrowsePaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsePaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowsePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
