import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntEmptyComponent } from './ant-empty.component';

describe('AntEmptyComponent', () => {
  let component: AntEmptyComponent;
  let fixture: ComponentFixture<AntEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
