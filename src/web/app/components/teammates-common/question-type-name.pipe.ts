import { Pipe, PipeTransform } from '@angular/core';
import { FeedbackQuestionType } from '../../../types/api-output';

/**
 * Pipe to handle the display of {@code FeedbackQuestionType}.
 */
@Pipe({
  name: 'questionTypeName',
})
export class QuestionTypeNamePipe implements PipeTransform {

  /**
   * Transforms {@link FeedbackQuestionType} to a simple name.
   */
  transform(type: FeedbackQuestionType): any {
    switch (type) {
      case FeedbackQuestionType.MCQ:
        return 'Multiple-Choice (single answer) question';
      case FeedbackQuestionType.CONTRIB:
        return 'Team contribution question';
      case FeedbackQuestionType.TEXT:
        return 'Essay question';
      case FeedbackQuestionType.NUMSCALE:
        return 'Numerical Scale Question';
      case FeedbackQuestionType.MSQ:
        return 'Multiple-choice (multiple answers) question';
      case FeedbackQuestionType.RANK_OPTIONS:
        return 'Rank (options) question';
      case FeedbackQuestionType.RANK_RECIPIENTS:
        return 'Rank (recipients) question';
      case FeedbackQuestionType.RUBRIC:
        return 'Rubric question';
      default:
        return 'Unknown';
    }
  }

}
