import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildSignalComponent } from './child-signal.component';

describe('ChildSignalComponent', () => {
  let component: ChildSignalComponent;
  let fixture: ComponentFixture<ChildSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
