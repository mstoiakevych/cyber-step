import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../../shared/services/blog.service';
import {Blog} from '../../../../shared/interfaces/blog';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  blogs: Blog[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe(data => this.blogs = data);
  }
}

