import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/shared/intefaces';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  postSub: Subscription

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postSub = this.postService.getAll()
    .subscribe((posts) => {
      this.posts = posts;
    })
  }

  ngOnDestroy() {
    if(this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  remove() {

  }

}
