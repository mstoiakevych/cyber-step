import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {
  ChartConfiguration,
  ChartData,
  ChartDataset,
  ChartOptions,
  ChartType
} from "chart.js";
import {OpenDotaService} from "../../shared/services/opendota.service";
import {OpenDotaMatch} from "../../shared/interfaces/opendota.match";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  matches: OpenDotaMatch[]
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  public radarChartData: ChartDataset[] = [
    { data: [41, 45, 23, 67, 43], type: 'radar', pointBackgroundColor: '#FF9C07CF', pointBorderColor: '#FF9C07CF' },
  ];
  public radarChartLabels: string[] = ['Fighting', 'Farming', 'Supporting', 'Pushing', 'Versatility'];
  public radarChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined,
    responsive: true,
    backgroundColor: '#FFC507A9',
    borderColor: '#FF9C07CF',
    color: '#FFC507FF',
    scales: {
      scale: {
        min: 0,
        max: 100,
        ticks: {
          maxTicksLimit: 2,
          display: false,
        },
        grid: {drawTicks: false}
      }
    },
  };

  // Doughnut
  public polarAreaChartLabels: string[];
  public polarAreaChartData: ChartData<'polarArea'>;
  public polarAreaLegend = true;
  public polarChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined,
    scales: {
      scale: {
        ticks: {
          maxTicksLimit: 5,
          display: false,
        },
        grid: {
          drawTicks: false
        }
      }
    }
  };

  public polarAreaChartType: ChartType = 'polarArea';


  // Line
  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          drawTicks: false
        },
        ticks: {
          maxTicksLimit: 5
        }
      },
      y: {
        min: 10,
        grid: {
          display: false,
          drawTicks: false,
          drawBorder: false,
          drawOnChartArea: false
        },
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      legend: { display: false },
    }
  };
  public barChartLabels: string[];
  public barChartType: ChartType = 'line';

  public barChartData: ChartData<'line'>;

  constructor(public authService: AuthService, public dotaService: OpenDotaService) {
    this.fakeMatchInfo()
    this.fakeHeroesInfo()
  }

  ngOnInit(): void {
  }

  fakeMatchInfo() {
    this.barChartData = {"labels": ["August, 2015", "September, 2015", "October, 2015", "November, 2015", "December, 2015", "January, 2016", "February, 2016", "March, 2016", "April, 2016", "May, 2016", "June, 2016", "July, 2016", "August, 2016", "September, 2016", "October, 2016", "November, 2016", "December, 2016", "January, 2017", "February, 2017", "March, 2017", "April, 2017", "May, 2017", "June, 2017", "July, 2017", "August, 2017", "September, 2017", "October, 2017", "November, 2017", "December, 2017", "January, 2018", "February, 2018", "March, 2018", "April, 2018", "May, 2018", "June, 2018", "July, 2018", "August, 2018", "September, 2018", "October, 2018", "November, 2018", "December, 2018", "January, 2019", "February, 2019", "March, 2019", "June, 2019", "August, 2019"], "datasets": [{"data": [7, 18, 45, 5, 14, 15, 14, 14, 10, 12, 42, 20, 45, 43, 52, 18, 11, 34, 32, 30, 23, 51, 78, 35, 56, 24, 48, 58, 48, 51, 39, 39, 33, 23, 66, 59, 42, 27, 39, 55, 25, 7, 2, 0, 1, 1], "label": "Wins"}]}
  }

  fakeHeroesInfo() {
    this.polarAreaChartData = {
      labels: [ 'Arc Warden', 'Templar Assassin', 'Invoker', 'Storm Spirit', 'Tinker' ],
      datasets: [ {
        data: [58, 56, 50, 58, 51],
        label: 'Best heroes'
      }]
    };
  }

  getMatchInfo() {
    this.dotaService.getMatches().subscribe(data => {
      this.matches = data

      this.matches = this.matches.map(x => {
        x.start_date = new Date(x.start_date!.getFullYear(), x.start_date!.getMonth())

        return x;
      })

      const grouped = this.groupArrayBy(this.matches, 'start_date')

      // @ts-ignore
      const finalData = Object.entries(grouped).map(x => [new Date(x[0]), x[1].reduce((p, c) => p + (c.radiant_win ? 1 : 0), 0)])
        .sort((x, y) => x[0] - y[0])


      this.barChartData = {
        labels: finalData.map(x => `${this.monthNames[x[0].getMonth()]}, ${x[0].getFullYear()}`),
        datasets: [
          {data: finalData.map(x => x[1]), label: 'Wins'}
        ]
      }

      console.log(this.barChartData)
    })
  }

  getHeroesInfo() {
    this.dotaService.getHeroes().subscribe(data => {
      data = data.slice(0, 5)

      const winrates = data.map(x => Math.floor((x.win / x.games) * 100))

      console.log(winrates)

      // @ts-ignore
      this.polarAreaChartData = {labels: this.polarAreaChartLabels, datasets: [{data: winrates}]}
    })
  }

  groupArrayBy(xs: any[], key: string) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

}
