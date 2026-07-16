import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { BlogService } from '../service/blogger';
@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule ],
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class BlogListComponent implements OnInit {
  displayedColumns: string[] = ['title',
    'category',
    'author',
    'status',
    'readingTime',
    'actions' ];
  searchText = signal('');
  selectedCategory = signal('all');
  blogs = signal<any[]>([]);
  filteredBlogs = computed(() => {
    let data = this.blogs();
    if (this.searchText()) {
      data = data.filter(blog =>
        blog.title.toLowerCase().includes(this.searchText().toLowerCase())
      );
    }
    if (this.selectedCategory() !== 'all') {
      data = data.filter(blog =>
        blog.category === this.selectedCategory()
      );
    }
    return data;
  });
  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loadBlogs();
  }
  loadBlogs() {
    this.blogService.getBlogs().subscribe((res: any) => {
      this.blogs.set(res);
    });
  }
  editBlog(id: string) {
    this.router.navigate(['/edit', id]);
  }
  deleteBlog(id: string) {
    if (confirm('Delete Blog?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.loadBlogs();
      });
    }
  }
  isOwner(blog: any): boolean {
    const userId = localStorage.getItem('userId');
    if (!userId || !blog?.createdBy) return false;
    const ownerId = typeof blog.createdBy === 'object'
      ? blog.createdBy._id
      : blog.createdBy;
    return String(ownerId) === String(userId);
  }

}
