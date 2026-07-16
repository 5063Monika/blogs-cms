import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BlogService } from '../service/blogger';
@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule ],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class BlogFormComponent implements OnInit {
  blog = {
    title: '',
    content: '',
    category: '',
    authorName: '',
    publishDate: null,
    featuredImageUrl: '',
    readingTime: 1,
    status: 'draft',
    tags: ''
  };

  isEdit = false;
  blogId: string | null = null;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute) {}
  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.isEdit = true;
      this.blogService.getBlogById(this.blogId).subscribe((data: any) => {
          this.blog = {
            title: data.title,
            content: data.content,
            category: data.category,
            authorName: data.authorName,
            publishDate: data.publishDate,
            featuredImageUrl: data.featuredImageUrl,
            readingTime: data.readingTime,
            status: data.status,
            tags: data.tags?.join(',') || ''
          };
        });
    }
  }
  addBlogs() {
    const payload = {
      ...this.blog,
      tags: this.blog.tags
        .split(',')
        .map(tag => tag.trim())
    };
    if (this.isEdit && this.blogId) {
      this.blogService.updateBlog(this.blogId, payload).subscribe({
          next: () => {
            alert('Blog Updated Successfully');
            this.router.navigate(['/']);
          },
          error: () => {
            alert('Update Failed');
          }
        });
    } else {
      this.blogService.addBlog(payload).subscribe({
          next: () => {
            alert('Blog Added Successfully');
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            alert(
              err.error?.message ||
              'Failed to Add Blog'
            );
          }
        });
    }
  }
}
