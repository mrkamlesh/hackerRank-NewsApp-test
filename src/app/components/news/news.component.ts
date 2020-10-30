import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { Store } from "@ngrx/store";
import "../../../../node_modules/zone.js/dist/zone.js";

import { NewsItemComponent } from "./news-item/news-item.component";
import { NewsService } from "../../services/news.service";
import { News } from "../../model/news";
import { NewsActions } from "../../store/actions/news.actions";
import { getNews } from "../../store/reducers/selector";
import { news, NewsState } from "../../store/reducers/news.reducer";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
  providers: [],
})
export class NewsComponent implements OnInit {
  sectionNewsList: any;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private newsAction: NewsActions,
    private store: Store<any>
  ) {}

  ngOnInit() {
    let sectionName: string;
    this.route.params.subscribe((response) => {
      sectionName = response.id;
      console.log(sectionName);

      /* this.newsService
        .getSectionNews(sectionName)
        .subscribe((response: Response) => {
          let newsObjRes = response.json();
          this.sectionNewsList = newsObjRes["results"];
          console.log(this.sectionNewsList);
        });
      */

      /*this.newsService
        .getSectionNews(sectionName)
        .subscribe((response: any) => {
          this.sectionNewsList = response.json().results;
          console.log(this.sectionNewsList);
        });
      */

      this.newsService
        .getSectionNews(sectionName)
        .subscribe((response: any) => {
          this.store.dispatch(
            // this.newsAction.LoadSectionNews(response.json().results)
            this.newsAction.LoadSectionNews(response.results)
          );
        });

      this.store.select("news").subscribe((response: NewsState) => {
        console.log("\n\n-------------------",response);
        this.sectionNewsList = response.newsList;
      });
    });
    // send this sectionName to newsService. Subscribe newsService and get the newsList
    // now, get news from store
  }
}
