import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProjectThumbComponent } from '../project-thumb/project-thumb.component';
import { SweaterComponent } from '../projects/sweater/sweater.component';
import { RectangularComponent } from '../projects/rectangular/rectangular.component';

@Component({
  standalone: true,
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  imports: [ProjectThumbComponent, IonicModule, SweaterComponent, RectangularComponent]
})
export class ProjectListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
