import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import { DataService } from "../services/data.service";
import Chart from 'chart.js/auto';
import {NtChartRegionInterface} from "../shared/interfaces/nt-chart-region.interface";
import {protesUtilityService} from "../services/protes-utility.service";

@Component({
  selector: 'app-protes-chart-market',
  templateUrl: './protes-chart-market.component.html',
  styleUrls: ['./protes-chart-market.component.scss']
})
export class ProtesChartMarketComponent implements OnDestroy, AfterViewInit, OnInit  {

  public chart: any;

  public chartData: NtChartRegionInterface = {
    labels: [],
    real: [],
    target: []
  };

  @Input() lineColor1: string | undefined;
  @Input() lineColor2: string | undefined;

  public chartInstances: Chart[] = [];

  public chartContext: any;

  public chartId: string;

  public productId = 1;

  public countryId = 10;

  constructor(private dataService: DataService, private us: protesUtilityService) {
    this.chartId = 'chart_' + Math.random().toString(36).substring(2, 9);
  }


  ngOnInit() {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.productId = this.us.getSessionVariableNumber('productId')
      this.countryId = this.us.getSessionVariableNumber('countryId')
      this.dataService.getNationalMarketChart(this.productId, this.countryId).subscribe(data => {
        this.chartData = data;
        this.createChart();
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  createChart() {
    const chartCanvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    if (!chartCanvas) {
      console.error("Elemento canvas non trovato");
      return;
    } else{
      this.chartContext = chartCanvas.getContext("2d") ;
    }

    if (!this.chartData.labels || this.chartData.labels.length === 0) {
      console.error("Dati non disponibili.");
      return;
    }


    const chartInstance = new Chart( this.chartContext, {
      type: 'line',
      data: {
        labels: this.chartData.labels, // Assuming labels for X-axis
        datasets: [
          { label: "Actual",
            data: this.chartData.real,
            borderColor: this.lineColor1,
            borderWidth: 2
          },
          { label: "Forecast",
            data: this.chartData.target,
            borderColor: this.lineColor2,
            borderWidth: 2
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        aspectRatio: 5.0,
        plugins: {
          legend: {
            display: false // Nascondi l'etichetta sopra il grafico
          }
        },
        scales: {
          x: {
            display: true, // Mostra l'asse X
            title: {
              display: false, // Mostra il titolo sull'asse X
              text: 'Mesi' // Testo del titolo sull'asse X
            },
            grid: {
              display: false, // Nascondi le linee della griglia verticali
              lineWidth: 0,
              color: 'rgba(0, 0, 0, 0)',
              drawOnChartArea: false,
            },
            ticks: {
              font: {
                size: 8, // Imposta il font-size delle etichette
                family: 'Montserrat, sans-serif'
              }
            },
          },
          y: {
            display: true, // Mostra l'asse Y
            title: {
              display: false, // Mostra il titolo sull'asse Y
              text: 'Valori' // Testo del titolo sull'asse Y
            },
            ticks: {
              callback: function(data, index, values) {
                return data + '%'; // Converti il valore decimale in percentuale e aggiungi il simbolo "%"
              },
              font: {
                size: 8, // Imposta il font-size delle etichette
                family: 'Montserrat, sans-serif'
              },
              maxTicksLimit: 10
            },
            suggestedMin: 0,
            suggestedMax: 100,
            grid: {
              display: true
            },
            border:{
              display: false
            },
          }
        }
      }
    });
    this.chartInstances.push(chartInstance);
  }

  private destroyCharts(): void {
    this.chartInstances.forEach(chartInstance => {
      chartInstance.destroy();
    });
    this.chartInstances = [];
  }


}
