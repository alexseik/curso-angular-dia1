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
})
export class CandidateComponent implements OnChanges, OnInit, OnDestroy {
  // @Input() candidate!: Candidate;
  private _candidate!: Candidate;

  colorStyle = '';
  cssClasses = {
    'candidate-card': true,
    senior: false,
    junior: false,
  };

  @Input()
  set candidate(candidate: Candidate) {
    this._candidate = candidate;
    const index = candidate.name.indexOf(' ');
    // this.name = candidate.name.slice(0, index);
    //  this.surname = candidate.name.slice(index);

    if (candidate.age < 18) {
      throw new Error('El candidato debe ser mayor de edad');
    }
    this.cssClasses = {
      'candidate-card': true,
      senior: candidate.experience < 3,
      junior: candidate.experience > 5,
    };
    this.colorStyle = candidate.experience <= 5 ? 'black' : 'white';
  }
  get candidate() {
    return this._candidate;
  }

  @Output() select = new EventEmitter<Candidate>();
  @Output() remove = new EventEmitter<Candidate>();

  constructor() {}
  ngOnDestroy(): void {
    console.log('OnDestroy');
  }
  ngOnChanges(changes: SimpleChanges): void {
    let log: string = '';
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log = `Initial value of ${propName} set to ${to}`;
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log = `${propName} changed from ${from} to ${to}`;
      }
    }
    console.log('OnChanges', log);
  }

  ngOnInit(): void {
    console.log('OnInit', { candidate: this.candidate });
  }

  doEdit() {
    this.select.emit(this.candidate);
  }

  doRemove() {
    this.remove.emit(this.candidate);
  }
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
