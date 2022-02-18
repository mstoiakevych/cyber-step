import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BlogService} from '../../../../../../shared/services/blog.service';
import {Blog} from '../../../../../../shared/interfaces/blog';

@Component({
  selector: 'app-single-blog-page',
  templateUrl: './single-blog-page.component.html',
  styleUrls: ['./single-blog-page.component.scss']
})
export class SingleBlogPageComponent implements OnInit {
  blog: Blog | undefined;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.blogService.getOneBlog(this.route.snapshot.params.id).subscribe(blog => {
      this.blog = blog;
    });
  }
}
