import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { sections, initialState } from "../../store/reducers/sections.reducer";
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: "app-sections",
  templateUrl: "./sections.component.html",
  styleUrls: ["./sections.component.css"],
})
export class SectionsComponent implements OnInit {
  sectionList: any;
  sectionArr: Observable<string[]>;
  constructor(private store: Store<{ sections: string[] }>) {}

  ngOnInit() {
    // this.sectionList = initialState;
    this.store.select("sections").subscribe((response) => {
      this.sectionList = response;
    });
  }
}
