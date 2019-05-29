import { Component, OnInit } from '@angular/core';
import {SharedIndustryService} from '../shared/shared-industry.service';
import {Observable} from 'rxjs';
import {SharedSectorService} from '../shared/shared-sector.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  hidden = true;
  sectors$: Observable<string[]>;
  industries$: Observable<string[]>;

  constructor(private sharedSectorService: SharedSectorService,
              private sharedIndustryService: SharedIndustryService) { }

  ngOnInit() {
    this.sectors$ = this.sharedSectorService.getSectors();
    this.industries$ = this.sharedIndustryService.getIndustries();
  }

  onToggleClicked(): void {
    this.hidden = !this.hidden;
  }

}
