import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  model = {
    allLogins: [
      'London',
      'London Kraftwerk',
      'Dover',
    ],
    selectedLogins: { },
  };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.parseQueryParams(queryParams);
    });
  }

  parseQueryParams(params: ParamMap) {
    let showLogins = params.get('showLogins');
    if (showLogins === 'All') {
      this.selectAll();
    }
    else if (showLogins === 'None') {
      this.selectNone();
    }
    else {
      this.onAll();
    }
  }

  onAll() {
    this.selectAll();
    this.router.navigate(['/dashboard'], { queryParams: { showLogins: 'All'}, queryParamsHandling: 'merge' });
  }

  onNone() {
    this.selectNone();
    this.router.navigate(['/dashboard'], { queryParams: { showLogins: 'None'}, queryParamsHandling: 'merge' });
  }

  selectAll() {
    for (var login of this.model.allLogins) {
      this.model.selectedLogins[login] = true;
    }
  }

  selectNone() {
    for (var login of this.model.allLogins) {
      this.model.selectedLogins[login] = false;
    }
  }
}
