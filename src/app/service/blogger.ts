import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class BlogService {
  api = 'http://localhost:5000/api/blogs';
  blogs = signal<any[]>([]);
  filtered = signal<any[]>([]);
  search = signal<string>('');
  category = signal<string>('all');
  showForm = signal<boolean>(false);
  constructor(private http: HttpClient) {}
  loadBlogs() {
    this.http.get<any[]>(this.api).subscribe(res => {
      this.blogs.set(res);
      this.filtered.set(res);
    });
  }
  getBlogs() {
    return this.http.get<any[]>(this.api);
  }
  getBlogById(id: string) {
    return this.http.get<any>(`${this.api}/${id}`);
  }
  addBlog(data: any) {
    return this.http.post(this.api, data);
  }
  updateBlog(id: string, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }
  deleteBlog(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
  toggleForm() {
    this.showForm.update(v => !v);
  }
  setSearch(value: string) {
    this.search.set(value);
    this.applyFilter();
  }
  setCategory(value: string) {
    this.category.set(value);
    this.applyFilter();
  }
  applyFilter() {
    let data = this.blogs();
    if (this.search()) {
      data = data.filter(b =>
        b.title.toLowerCase().includes(this.search().toLowerCase())
      );
    }
   if (this.category() !== 'all') {
      data = data.filter(b => b.category === this.category());
    }
    this.filtered.set(data);
  }
}
