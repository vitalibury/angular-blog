import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/shared/intefaces';
import { PostService } from 'src/app/shared/services/post.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  postSub: Subscription
  delSub: Subscription
  searchStr = ''

  constructor(private postService: PostService, private alertService: AlertService) { }

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

    if(this.delSub) {
      this.delSub.unsubscribe();
    }
  }

  delete(id: string) {
    this.delSub = this.postService.delete(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Пост удалён')
    })
  }

}
