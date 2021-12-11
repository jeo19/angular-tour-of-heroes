import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero-data';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  constructor() { }
  power=['Really smart','Super flexible','Super Hot','Weather Changer'];
  model=new Hero(18,'Dr IQ',this.power[0],'Chuck Overstreet');
  submitted=false;
  onSubmit(){
    this.submitted=true;
  }

  ngOnInit(): void {
  }

}
