import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSelectorModalComponent } from './list-selector-modal.component';

describe('PageSelectorModalComponent', () => {
  let component: ListSelectorModalComponent;
  let fixture: ComponentFixture<ListSelectorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSelectorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSelectorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
