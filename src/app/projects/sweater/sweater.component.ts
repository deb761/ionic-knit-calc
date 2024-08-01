import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MeasurementComponent } from 'src/app/measurement/measurement.component';

@Component({
  standalone: true,
  selector: 'app-sweater',
  templateUrl: './sweater.component.html',
  styleUrls: ['./sweater.component.scss'],
  imports: [IonicModule, MeasurementComponent],
})
export class SweaterComponent  implements OnInit {
  shortLengthOptions = ['cm', 'in'];
  longLengthOptions = ['m', 'yd'];
  guageOptions = ['sts/4 in', 'sts/10 cm', 'sts/in'];
  ballOptions = ['whole', 'partial'];

  name = "sweater";
  chest = 40;
  chestUnits = 'in';
  guage = 20;
  guageUnits = 'sts/4 in';
  ballSize = 120;
  ballSizeUnits = 'yds';
  ballCount = 10;
  ballCountUnits = 'whole';


  constructor() { }

  ngOnInit() {}

}
