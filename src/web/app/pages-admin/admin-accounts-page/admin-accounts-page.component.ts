import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { CourseService } from '../../../services/course.service';
import { HttpRequestService } from '../../../services/http-request.service';
import { NavigationService } from '../../../services/navigation.service';
import { StatusMessageService } from '../../../services/status-message.service';
import { Account, Course, Courses } from '../../../types/api-output';
import { ErrorMessageOutput } from '../../error-message-output';

/**
 * Admin accounts page.
 */
@Component({
  selector: 'tm-admin-accounts-page',
  templateUrl: './admin-accounts-page.component.html',
  styleUrls: ['./admin-accounts-page.component.scss'],
})
export class AdminAccountsPageComponent implements OnInit {

  instructorCourses: Course[] = [];
  studentCourses: Course[] = [];
  accountInfo: Account = {
    googleId: '',
    name: '',
    email: '',
    isInstructor: false,
    institute: '',
    createdAtTimeStamp: 0,
  };

  constructor(private route: ActivatedRoute, private router: Router, private httpRequestService: HttpRequestService,
      private navigationService: NavigationService, private statusMessageService: StatusMessageService,
              private accountService: AccountService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.loadAccountInfo(queryParams.instructorid);
    });
  }

  /**
   * Loads the account information based on the given ID.
   */
  loadAccountInfo(instructorid: string): void {
    this.accountService.getAccount(instructorid).subscribe((resp: Account) => {
      this.accountInfo = resp;
    }, (resp: ErrorMessageOutput) => {
      this.statusMessageService.showErrorMessage(resp.error.message);
    });

    this.courseService.getStudentCoursesInMasqueradeMode(instructorid).subscribe((resp: Courses) => {
      this.studentCourses = resp.courses;
    }, (resp: ErrorMessageOutput) => {
      if (resp.status !== 403) {
        this.statusMessageService.showErrorMessage(resp.error.message);
      }
    });

    this.courseService.getInstructorCoursesInMasqueradeMode(instructorid).subscribe((resp: Courses) => {
      this.instructorCourses = resp.courses;
    }, (resp: ErrorMessageOutput) => {
      if (resp.status !== 403) {
        this.statusMessageService.showErrorMessage(resp.error.message);
      }
    });
  }

  /**
   * Downgrades the instructor account to student.
   */
  downgradeAccountToStudent(): void {
    const id: string = this.accountInfo.googleId;
    this.accountService.downgradeAccount(id).subscribe(() => {
      this.loadAccountInfo(id);
      this.statusMessageService.showSuccessMessage('Instructor account is successfully downgraded to student.');
    }, (resp: ErrorMessageOutput) => {
      this.statusMessageService.showErrorMessage(resp.error.message);
    });
  }

  /**
   * Deletes the entire account.
   */
  deleteAccount(): void {
    const id: string = this.accountInfo.googleId;
    this.accountService.deleteAccount(id).subscribe(() => {
      this.navigationService.navigateWithSuccessMessage(this.router, '/web/admin/search',
          `Instructor account "${id}" is successfully deleted.`);
    }, (resp: ErrorMessageOutput) => {
      this.statusMessageService.showErrorMessage(resp.error.message);
    });
  }

  /**
   * Removes the student from course.
   */
  removeStudentFromCourse(courseId: string): void {
    const id: string = this.accountInfo.googleId;
    const paramMap: { [key: string]: string } = {
      googleid: id,
      courseid: courseId,
    };
    this.httpRequestService.delete('/student', paramMap).subscribe(() => {
      this.studentCourses = this.studentCourses.filter((course: Course) => course.courseId !== courseId);
      this.statusMessageService.showSuccessMessage(`Student is successfully deleted from course "${courseId}"`);
    }, (resp: ErrorMessageOutput) => {
      this.statusMessageService.showErrorMessage(resp.error.message);
    });
  }

  /**
   * Removes the instructor from course.
   */
  removeInstructorFromCourse(courseId: string): void {
    const id: string = this.accountInfo.googleId;
    const paramMap: { [key: string]: string } = {
      instructorid: id,
      courseid: courseId,
    };
    this.httpRequestService.delete('/instructor', paramMap).subscribe(() => {
      this.instructorCourses = this.instructorCourses.filter((course: Course) => course.courseId !== courseId);
      this.statusMessageService.showSuccessMessage(`Instructor is successfully deleted from course "${courseId}"`);
    }, (resp: ErrorMessageOutput) => {
      this.statusMessageService.showErrorMessage(resp.error.message);
    });
  }

}
