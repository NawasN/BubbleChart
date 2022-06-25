import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData() {
    return {
      "name": "flare",
      "color": "#333a8a",
      "children": [
        {
          "name": "analytics",
          "color": "#333a8a",
          "children": [
            {
              "name": "cluster",
              "value": 3812
            },
            {
              "name": "graph",
              "value": 568
            },
            {
              "name": "optimization",
              "value": 1002
            }
          ]
        },
        {
          "name": "animate",
          "color": "#333a8a",
          "children": [

            {
              "name": "interpolate",
              "value": 1564
            },
            {
              "name": "ISchedulable",
              "value": 803
            },
            {
              "name": "Parallel",
              "value": 2036
            },
            {
              "name": "Tween",
              "value": 3251
            }
          ]
        },
        {
          "name": "data",
          "color": "#333a8a",
          "children": [
            {
              "name": "converters",
              "value": 456
            },
            {
              "name": "DataField",
              "value": 1759
            },
            {
              "name": "DataSchema",
              "value": 2165
            },
            {
              "name": "DataSet",
              "value": 586
            },
            {
              "name": "DataSource",
              "value": 3331
            },
            {
              "name": "DataTable",
              "value": 772
            },
            {
              "name": "DataUtil",
              "value": 3322
            }
          ]
        },
        {
          "name": "display",
          "color": "#333a8a",
          "children": [
            {
              "name": "DirtySprite",
              "value": 883
            },
            {
              "name": "LineSprite",
              "value": 1732
            },
            {
              "name": "RectSprite",
              "value": 3623
            },
            {
              "name": "TextSprite",
              "value": 1066
            }
          ]
        },
        {
          "name": "query",
          "color": "#333a8a",
          "children": [
            {
              "name": "AggregateExpression",
              "value": 1616
            },
            {
              "name": "And",
              "value": 1027
            },
            {
              "name": "Arithmetic",
              "value": 3891
            },
            {
              "name": "Average",
              "value": 891
            },
            {
              "name": "Variance",
              "value": 1876
            },
            {
              "name": "Xor",
              "value": 1101
            }
          ]
        },
        {
          "name": "scale",
          "color": "#333a8a",
          "children": [
            {
              "name": "IScaleMap",
              "value": 2105
            },
            {
              "name": "LinearScale",
              "value": 1316
            },
            {
              "name": "LogScale",
              "value": 3151
            },
            {
              "name": "OrdinalScale",
              "value": 3770
            },
            {
              "name": "QuantileScale",
              "value": 2435
            },
            {
              "name": "QuantitativeScale",
              "value": 4839
            },
            {
              "name": "RootScale",
              "value": 1756
            },
            {
              "name": "Scale",
              "value": 4268
            },
            {
              "name": "ScaleType",
              "value": 1821
            },
            {
              "name": "TimeScale",
              "value": 5833
            }
          ]
        },
        {
          "name": "flare",
          "value": 7690
        }
      ]
    };
  }
}
