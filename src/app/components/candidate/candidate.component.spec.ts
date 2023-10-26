import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateComponent } from './candidate.component';
import { Candidate } from 'src/app/models/candidate.model';

describe('CandidateComponent', () => {
  let component: CandidateComponent;
  let fixture: ComponentFixture<CandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateComponent],
    });
    fixture = TestBed.createComponent(CandidateComponent);
    component = fixture.componentInstance;
    const candidate: Candidate = {
      age: 25,
      experience: 6,
      id: 0,
      name: 'Alex',
      position: 'developer',
      skills: ['JS'],
    };
    component.candidate = candidate;
    fixture.detectChanges();
  });

  it('should create', () => {
    //
    expect(component).toBeTruthy();
  });

  it('should render candidate name', () => {
    //
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Alex');
  });

  fit('should render white color for senior', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.style.color).toContain('white');
  });
});
