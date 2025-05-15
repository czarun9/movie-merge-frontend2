import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomListViewPageComponent } from './custom-list-view-page.component';

describe('CustomListViewPageComponent', () => {
  let component: CustomListViewPageComponent;
  let fixture: ComponentFixture<CustomListViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomListViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomListViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
