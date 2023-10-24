import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Candidate } from 'src/app/models/candidate.model';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CandidateComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    OnDestroy
{
  @Input() candidate!: Candidate;

  @Output() select = new EventEmitter();

  constructor() {}
  ngOnDestroy(): void {
    console.log('OnDestroy');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log({ changes });
  }

  ngOnInit(): void {
    console.log('OnInit');
    console.log('OnInit', { candidate: this.candidate });
  }
  ngDoCheck(): void {
    console.log('DoCheck');
  }
  ngAfterContentInit(): void {
    console.log('AfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('AfterContentChecked');
  }
  ngAfterViewChecked(): void {
    console.log('AfterViewChecked');
  }

  doEdit() {
    this.select.emit(this.candidate);
  }

  // 1. devolver un string
  // classExpression = 'candidate-card junior';
  // candidateClases = () => {
  //   if (this.candidate.experience < 3) {
  //     return 'candidate-card junior';
  //   } else if (this.candidate.experience > 5) {
  //     return 'candidate-card senior';
  //   } else {
  //     return 'candidate-card';
  //   }
  // };

  // 2. devolver un obj
  // classExpression = {
  //   'candidate-card': true,
  //   junior: true,
  // };
  // candidateClasses() {
  //   return {
  //     'candidate-card': true,
  //     senior: this.candidate.experience < 3,
  //     junior: this.candidate.experience > 5,
  //   };
  // }

  // e. devolver array de strings
  candidateClasses(): string[] {
    const classes = [];
    classes.push('candidate-card');
    if (this.candidate.experience < 3) {
      classes.push('junior');
    }
    if (this.candidate.experience > 5) {
      classes.push('senior');
    }
    return classes;
  }

  getStyles() {
    const styles: any = {
      color: 'black',
      'font-weight': '300',
      'font-size': '14px',
    };

    if (this.candidate.experience <= 5 && this.candidate.experience > 3) {
      styles['font-weight'] = 500;
      styles['font-size'] = '18px';
    } else {
      styles['font-weight'] = 300;
      styles['font-size'] = '14px';
    }
    if (this.candidate.experience > 5) {
      styles.color = 'white';
    }
    return styles;
  }
}
