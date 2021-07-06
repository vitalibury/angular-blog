import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/shared/intefaces";

@Pipe({
  name: 'postsPipe'
})

export class PostsPipe implements PipeTransform {

  transform(posts: Post[], searchStr = ''): Post[] {

    if(!searchStr.trim()) {
      return posts
    }
    return posts.filter((post) => post.title.toLowerCase().includes(searchStr.toLowerCase()))

}
}
