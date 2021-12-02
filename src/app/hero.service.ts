import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable,  of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private log(message:string){
    this.messageService.add(`HeroService:${message}`);
  }
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    }
    getHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
      return this.http.get<Hero>(url).pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    }
    updateHero(hero:Hero):Observable<any>{
      return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
        tap(_=>this.log(`updateed hero id=${hero.id}`)),
        catchError(this.handleError<any>('update?Hero'))
      )
    }
    addHero(hero:Hero):Observable<Hero>{
      return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
        tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      )
    }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO:Sending error message to the remote server
      console.error(error); 
  
      // TODO: Convert to type that user can understand
      this.log(`${operation} failed: ${error.message}`);
  
      //The basic vaule of error
      return of(result as T);
    };
  }

}
