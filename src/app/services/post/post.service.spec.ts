import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostModel } from '../../models/post-model';

const testMockPosts: PostModel[] = [
  { id: 1, userId: 1, title: 'title 1', body: 'body 1' },
  { id: 2, userId: 2, title: 'title 2', body: 'body 2' },
]

describe('PostService', () => {
  let service: PostService;
  let httpClient: HttpClient;
  let httptesttoControl: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
  });

  beforeEach(() => {
    service = TestBed.inject(PostService)
    httptesttoControl = TestBed.inject(HttpTestingController);
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get post list -httpclient get method-', () => {
    service.get().subscribe(
      (posts) => {
        expect(testMockPosts).toBe(posts);
      }
    );

    const req = httptesttoControl.expectOne(service.API_URL);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testMockPosts);
    httptesttoControl.verify();
  })
});
