import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';

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
      console.log('activatedRoute.queryParamMap:');
      console.log(queryParams);
      this.parseQueryParams(queryParams);
    });
  }

  parseQueryParams(params: ParamMap) {
    let showLogins = params.get('showLogins');
    if (showLogins === null) {
      //this.onAll();
    }
    else if (showLogins === 'All') {
      this.selectAll();
    }
    else if (showLogins === '') {
      this.selectNone();
    }
    else {
      this.selectNone();
      for (let login of showLogins.split(',')) {
        console.log(`selecting '${login}'...`);
        this.model.selectedLogins[login] = true;
      }
    }
  }

  onAll() {
    this.updateShowLoginsParameter(this.model.allLogins.join(','));
  }

  onNone() {
    this.updateShowLoginsParameter('');
  }

  onToggle(login, event) {
    console.log(`onToggle(${login}, ${event})...`);
    this.model.selectedLogins[login] = event;
    this.evalLoginString();
  }

  updateShowLoginsParameter(value) {
    let extras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { showLogins: value },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['dashboard'], extras);
  }

  evalLoginString() {
        let logins = []
        for (let login in this.model.selectedLogins) {
            console.log(`login '${login}' is ${this.model.selectedLogins[login]}`);
            if (this.model.selectedLogins[login]) {
                logins.push(login);
            }
        }
        let loginsString = logins.join(',')
        console.log(`logins: '${loginsString}'`);
    }

  selectAll() {
    console.log('selecting all');
    for (var login of this.model.allLogins) {
      this.model.selectedLogins[login] = true;
    }
  }

  selectNone() {
    console.log('selecting none');
    for (var login of this.model.allLogins) {
      this.model.selectedLogins[login] = false;
    }
  }
  onToggleChange(login, event) {
    this.model.selectedLogins[login] = event.source._checked;
    console.log('onToggleChange:');
    console.log(login);
    console.log(event);
  }

  onGroupChange(event) {
    console.log('onGroupChange:');
    let showLoginsAsString = event.value.join(',');
    console.log(`showLogins='${showLoginsAsString}'`);
    this.updateShowLoginsParameter(showLoginsAsString);
  }
}
