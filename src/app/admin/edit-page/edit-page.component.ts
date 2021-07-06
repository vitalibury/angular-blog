import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/intefaces';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  post: Post
  updateSub: Subscription
  form: FormGroup
  submitted = false

  constructor( private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        content: new FormControl(post.content, Validators.required)
      })
    })
  }

  submit() {
    if(this.form.invalid) {
      return
    }

    this.submitted = true;
    this.updateSub = this.postService.update({
      ...this.post,
      title: this.form.value.title,
      content: this.form.value.content
    }).subscribe(() => {
      this.submitted = false;
    })
  }

}
