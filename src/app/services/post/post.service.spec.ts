import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostModel } from '../../models/post-model';

const testMockPosts: PostModel[] = [
  { id: 1, userId: 1, title: 'title 1', body: 'body 1' },
  { id: 2, userId: 2, title: 'title 2', body: 'body 2' },
]

xdescribe('PostService', () => {
  let service: PostService;
  let httpClient: HttpClient;
  let httpTestingControl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpTestingController, PostService]
    });
    service = TestBed.inject(PostService);
  });

  beforeEach(() => {
    service = TestBed.inject(PostService)
    // httpTestingControl=TestBed.inject(PostService);
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get post list -httpclient get method-', () => {
    service.get().subscribe(
      (posts) => {
        expect(testMockPosts).toBe(posts, 'should check mock data');
      }
    );

    const req = httpTestingControl.expectOne(service.API_URL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testMockPosts);
    httpTestingControl.verify();
  })
});
