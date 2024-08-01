import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-project-thumb',
  templateUrl: './project-thumb.component.html',
  styleUrls: ['./project-thumb.component.scss'],
  imports: [IonicModule],
})
export class ProjectThumbComponent implements OnInit {
  @Input() name: string = 'sweater';
  public image = `assets/img/thumbs/${this.name}.png`;
  constructor(private router: Router) {}

  ngOnInit() {}

  handleClick() {
    this.router.navigate([`/tabs/tab1/${this.name}`])
  }
}
