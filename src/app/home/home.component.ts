import { Component, OnInit } from '@angular/core';
import{ HttpClient } from "@angular/common/http";
import { SpacexService } from "../services/spacex-service.js"
import {filter} from "rxjs/operators";


@Component({
  selector: 'HomeComponent',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private http: HttpClient, public SpacexService: SpacexService) {
  }
  rocketList:any = [];
  years:any = [2006, 2007,2008,2009,2010,2011,2012, 2013, 2014, 2015, 2016, 2017,2018,2019,2021]
  filters:any = {}

  ngOnInit(): void {
    this.getRocketList();
  }

  updateResponse(res) {
    const list = [...res] ;
    let data = list.map(item => {
      let land_success = null;

      item.rocket.first_stage.cores.map(id => {
        land_success = id.land_success;
        console.log( land_success);
      })
      return {
        land_success : (item.land_success == null) ? 'NA' : item.land_success,
        launch_year : item.launch_year,
        flight_number: item.flight_number,
        mission_name: item.mission_name,
        launch_success: item.launch_success,
        mission_id: item.mission_id,
        mission_patch: item.links.mission_patch
      }
    })
    console.log(data);
    return data;


  }
  filterRocketsByYear(filterName ,value) {
   if(value == this.filters[filterName]) {
     delete this.filters[filterName];
   } else {
     this.filters[filterName] = value;
   }

    this.SpacexService.getFilteredList(this.filters).subscribe(res => {
      this.rocketList = this.updateResponse(res);
    });
  }

  getRocketList() {
    this.SpacexService.getRocketList().subscribe(res => {
      this.rocketList = this.updateResponse(res);
    });
  }
}
