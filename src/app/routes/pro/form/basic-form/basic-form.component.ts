import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from '@services';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      content: [null, [Validators.required]],
    });
  }

  submit = ($event, value) => {
    this.submitting = true;
    $event.preventDefault();
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
    }
    this.articleService.create(value).subscribe(res => {
      this.submitting = false;
      console.log(res)
      this.cdr.detectChanges();
    })
  }
}
