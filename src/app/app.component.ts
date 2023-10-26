import { Component, ViewChild, ViewChildren } from '@angular/core';
import { Candidate } from './models/candidate.model';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { CandidateComponent } from './components/candidate/candidate.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('list') list!: CandidateListComponent;

  @ViewChildren(CandidateComponent)
  private candidateComps!: CandidateComponent[];

  title = 'angular-101-day1';

  private _candidateName = '';

  selectedCandidate: Candidate | null = null;

  get candidateName(): string {
    return this.selectedCandidate ? this.selectedCandidate.name : '';
  }

  // get candidateExperience(): number {
  //   return this.selectedCandidate ? this.selectedCandidate.experience : 0;
  // }

  // set candidateExperience(experience: number) {
  //   debugger;
  //   if (this.selectedCandidate) {
  //     const candidateIndex = this.candidates.findIndex(
  //       (c) => c.name === this.selectedCandidate?.name
  //     );
  //     if (candidateIndex > -1) {
  //       this.candidates[candidateIndex] = Object.assign(
  //         {},
  //         this.candidates[candidateIndex],
  //         { experience }
  //       );
  //     }
  //   }
  // }

  candidates: Candidate[] = [
    {
      id: 1,
      name: 'Paco Pérez',
      age: 25,
      position: 'Desarrollador Junior',
      experience: 1,
      skills: ['Java', 'SQL'],
    },
    {
      id: 2,
      name: 'Paco López',
      age: 40,
      position: 'Desarrollador Senior',
      experience: 15,
      skills: ['Java', 'SQL', 'Oracle', 'PL/SQL', 'Cobol', 'C++'],
    },
    {
      id: 3,
      name: 'Mireia García',
      age: 30,
      position: 'Desarrolladora Intermedia',
      experience: 4,
      skills: ['Java', 'SQL', 'Oracle', 'PL/SQL', 'Cobol', 'C++'],
    },
  ];

  selectCandidate(candidate: Candidate) {
    this.selectedCandidate = candidate;
  }

  changeInput(event: any) {
    const experience = parseInt(event.target.value);
    if (this.selectedCandidate) {
      const candidateIndex = this.candidates.findIndex(
        (c) => c.id === this.selectedCandidate?.id
      );
      if (candidateIndex > -1) {
        this.candidates[candidateIndex] = Object.assign(
          {},
          this.candidates[candidateIndex],
          { experience }
        );
      }
    }
    // this.candidateExperience = parseInt(event.target.value);
  }

  changeName(event: any) {
    debugger;
    const newName = event.target.value;
    if (this.selectedCandidate) {
      const candidateIndex = this.candidates.findIndex(
        (c) => c.id === this.selectedCandidate?.id
      );
      if (candidateIndex > -1) {
        this.candidates[candidateIndex] = Object.assign(
          {},
          this.candidates[candidateIndex],
          { name: newName }
        );
      }
    }
  }

  toggleDirection() {
    this.list.toggleDirection();
  }

  getCandidatesLength() {
    return !!this.candidateComps && 'length' in this.candidateComps
      ? this.candidateComps.length
      : 0;
  }
}
