import { News } from "./../../model/news";
import { NewsState } from "./../../store/reducers/news.reducer";
import { NewsActions } from "../../store/actions/news.actions";

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { NewsService } from "../../services/news.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  subsections: string[];
  response: Object[];
  constructor(private store: Store<any>, private newsAction: NewsActions) {}

  ngOnInit() {
    
    let sectionNewsList: News[];
    this.store.select("news").subscribe((response: NewsState) => {
      sectionNewsList = response.newsList;
      this.subsections = [];
      for (const item of sectionNewsList) {
        if (
          item.subsection && item.subsection.length &&
          this.subsections.indexOf(item.subsection) === -1
        ) {
          // console.log(item.subsection);
          this.subsections.push(item.subsection);
        }
      }
    });
  }

  dispatchAction($event: string) {
    console.log($event);
    this.store.dispatch(this.newsAction.FilterSubsection($event));
  }
}
