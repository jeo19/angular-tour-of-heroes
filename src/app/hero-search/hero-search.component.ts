import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!:Observable<Hero[]>;
  private searchTerms=new Subject<string>();


  constructor(private heroService:HeroService) { }
  search(term:string):void {
    this.searchTerms.next(term)


  }

  ngOnInit(): void {
    this.heroes$=this.searchTerms.pipe(
      //wait for 30s in order to proccessed sequenced a data
      debounceTime(300),
      //ignore if data equal previously endtered search term
      distinctUntilChanged(),
      //if the search term changed,it will create new observale
      switchMap((term:string)=>this.heroService.searchHeroes(term)),
    );
  }

}
