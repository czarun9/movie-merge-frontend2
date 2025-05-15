import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomListsPageComponent } from './custom-lists-page.component';

describe('CustomListsPageComponent', () => {
  let component: CustomListsPageComponent;
  let fixture: ComponentFixture<CustomListsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomListsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomListsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
