import { Component, Input } from '@angular/core';

export interface Skill{
  name:string,
  progress:number
}

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})

export class SkillItemComponent{
  @Input() skill!:Skill;
  percentage:number= 0;
  intersecting:boolean = false;
  timer = (ms: number) => new Promise(res => setTimeout(res, ms));  
  
  async setPercentage(){
    while(this.percentage<this.skill.progress){
      this.percentage++;
      await this.timer(1600/this.skill.progress);
    }
  }
}
