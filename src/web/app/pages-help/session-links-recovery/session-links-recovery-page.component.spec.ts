import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SessionLinksRecoveryPageComponent } from './session-links-recovery-page.component';

describe('SessionLinksRecoveryPageComponent', () => {
  let component: SessionLinksRecoveryPageComponent;
  let fixture: ComponentFixture<SessionLinksRecoveryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SessionLinksRecoveryPageComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxCaptchaModule,
        MatSnackBarModule,
      ],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionLinksRecoveryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
