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
      'Dover',
      'London',
      'London Kraftwerk',
    ],
    selectedLogins: { },
    selection: '',
  };
  showLoginsAsString: string;
  showNoLoginsAsString = '';
  showAllLoginsAsString: string;
  showDefaultLoginsAsString: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.model.allLogins.sort();
    this.showAllLoginsAsString = this.model.allLogins.join(',');
    this.showDefaultLoginsAsString = this.showAllLoginsAsString;

    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      console.log('activatedRoute.queryParamMap:');
      console.log(queryParams);
      this.parseQueryParams(queryParams);
    });
  }

  parseQueryParams(params: ParamMap) {
    console.log('parseQueryParams:');
    let showLoginsAsString = params.get('showLogins');
    if (showLoginsAsString === null) {
      showLoginsAsString = this.showDefaultLoginsAsString;
    } else if (showLoginsAsString === 'All') {
      showLoginsAsString = this.showAllLoginsAsString;
    }
    this.showLoginsAsString = showLoginsAsString;
    this.evalShowLoginSelection();
    this.selectNone();
    for (const login of showLoginsAsString.split(',')) {
      if (login === '') {
        continue;
      }
      console.log(`selecting '${login}'`);
      this.model.selectedLogins[login] = true;
    }
  }

  selectNone() {
    console.log('selecting none');
    for (const login of this.model.allLogins) {
      this.model.selectedLogins[login] = false;
    }
  }

  onAll() {
    console.log('onAll:');
    this.updateShowLoginsParameter(this.showAllLoginsAsString);
  }

  onNone() {
    console.log('onNone:');
    this.updateShowLoginsParameter(this.showNoLoginsAsString);
  }

  onGroupChange(event) {
    console.log('onGroupChange:');
    const showLoginsAsString = event.value.sort().join(',');
    console.log(`showLogins='${showLoginsAsString}'`);
    this.updateShowLoginsParameter(showLoginsAsString);
  }

  updateShowLoginsParameter(showLoginsAsString) {
    console.log('updateShowLoginsParameter:');
    console.log(showLoginsAsString);
    this.showLoginsAsString = showLoginsAsString;
    this.evalShowLoginSelection();
    if (showLoginsAsString === this.showDefaultLoginsAsString) {
      showLoginsAsString = null;
    }
    const extras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { showLogins: showLoginsAsString },
      queryParamsHandling: 'merge',
    };
    this.router.navigate(['dashboard'], extras);
  }

  evalShowLoginSelection() {
    console.log('evalShowLoginSelection:');
    let selection = this.showLoginsAsString;
    if (selection === this.showAllLoginsAsString) {
      selection = '(All)';
    } else if (selection === this.showNoLoginsAsString) {
      selection = '(None)';
    } else {
      selection = this.getShortestLoginSelection();
    }
    this.model.selection = selection;
  }

  getShortestLoginSelection() {
    console.log('getShortestLoginSelection:');
    const numAll = this.model.allLogins.length;
    const numSelected = this.showLoginsAsString.split(',').length;
    const numDeselected = numAll - numSelected;
    if (numDeselected < numSelected) {
      return '<strike>' + this.getDeselectedLogins().join(',') + '</strike>';
    } else {
      return this.showLoginsAsString;
    }
  }

  getDeselectedLogins() {
    console.log('getDeselectedLogins:');
    console.log(this.model);
    console.log(this.model.selectedLogins);
    console.log(this.model.selectedLogins['Dover']);
    const deselectedLogins = [];
    for (const login of this.model.allLogins) {
      console.log(login);
      console.log(this.model.selectedLogins[login]);
      if (!this.model.selectedLogins[login]) {
        console.log(`'${login}' deselected`);
        deselectedLogins.push(login);
      } else {
        console.log(`'${login}' selected`);
      }
    }
    return deselectedLogins;
  }
}
