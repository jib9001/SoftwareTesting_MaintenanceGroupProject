import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CourseRelatedInfoComponent } from './course-related-info.component';

describe('CourseRelatedInfoComponent', () => {
  let component: CourseRelatedInfoComponent;
  let fixture: ComponentFixture<CourseRelatedInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseRelatedInfoComponent],
      imports: [RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseRelatedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
