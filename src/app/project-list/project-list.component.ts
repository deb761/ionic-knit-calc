import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProjectThumbComponent } from '../project-thumb/project-thumb.component';
import { SweaterComponent } from '../projects/sweater/sweater.component';
import { RectangularComponent } from '../projects/rectangular/rectangular.component';
import { MittensComponent } from '../projects/mittens/mittens.component';
import { VestComponent } from '../projects/vest/vest.component';
import { HatComponent } from '../projects/hat/hat.component';
import { BeretComponent } from '../projects/beret/beret.component';
import { GlovesComponent } from '../projects/gloves/gloves.component';
import { SocksComponent } from '../projects/socks/socks.component';

@Component({
  standalone: true,
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [ProjectThumbComponent, IonicModule, SweaterComponent, RectangularComponent, MittensComponent, VestComponent, HatComponent, BeretComponent, GlovesComponent, SocksComponent]
})
export class ProjectListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
