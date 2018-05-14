import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  queryParams = { };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.queryParams = params;
      this.parseQueryParams();
    });
  }

  parseQueryParams() {
    if (this.queryParams['hideLogins'] === 'None') {
      this.selectAll();
    }
    else if (this.queryParams['hideLogins'] === 'All') {
      this.selectNone();
    }
  }

  onAll() {
    this.selectAll();
    this.queryParams = {...this.queryParams, hideLogins: 'None'};
    this.router.navigate(['dashboard'], { queryParams: this.queryParams });
  }

  onNone() {
    this.selectNone();
    this.queryParams = {...this.queryParams, hideLogins: 'All'};
    this.router.navigate(['dashboard'], { queryParams: this.queryParams });
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
