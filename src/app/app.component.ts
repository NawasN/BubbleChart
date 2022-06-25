import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) { }

  gloObj: any = {}

  ngOnInit(): void {
    const [width, height] = [window.innerWidth, window.innerHeight],
      colors = ["yellow", "green", "maroon", "violet"];

    const pack = data => d3.pack()
      .size([width, height])
      .padding(3)
      (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value))

    const root = this.gloObj.root = pack(this.dataService.getData());

    this.gloObj.svg = d3.select('#bubbleChartId')
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("display", "block")
      .style("margin", "10 10px")
      .style("background", "#18184f")
      .style("cursor", "pointer")
      .on("click", (event) => this.zoom(event, root));

    //this.addGradient();

    this.gloObj.node = this.gloObj.svg.append("g")
      .attr("width", window.innerWidth)
      .selectAll("circle")
      //.style("margin", "5 5px")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => d.data.color ? d.data.color : colors[Math.floor(Math.random() * colors.length)])
      .style("fill-opacity", 0.8)
      //.attr('fill', 'url(#gradient)')
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function () { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) => this.gloObj.root !== d && (this.zoom(event, d), event.stopPropagation()));

    this.gloObj.label = this.gloObj.svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
    //.text(d => d.data.name);

    this.zoomTo([root.x, root.y, root.r * 2]);

  }
  addGradient() {
    this.gloObj.gradient = this.gloObj.svg.append("svg:defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    this.gloObj.gradient.append("svg:stop")
      .attr("offset", "0%")
      .attr("stop-color", "#a00000")
      .attr("stop-opacity", 0.2);

    this.gloObj.gradient.append("svg:stop")
      .attr("offset", "100%")
      .attr("stop-color", "#a00000")
      .attr("stop-opacity", 0.8);
  }

  findZoomRatio(ratioInp) {
    let width = window.innerWidth;
    return Math.floor((width / 2) / ratioInp) == 1 ? 1 : (width / 2) / ratioInp;
  }

  zoomTo(v) {
    const k = this.findZoomRatio(v[2]);
    this.gloObj.view = v;
    this.gloObj.label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    this.gloObj.node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    this.gloObj.node.attr("r", d => d.r * k);
  }

  zoom(event, d) {
    const self = this;
    this.gloObj.root = d;

    const transition = this.gloObj.svg.transition()
      .duration(event.altKey ? 7500 : 750)
      .tween("zoom", d => {
        const i = d3.interpolateZoom(this.gloObj.view, [this.gloObj.root.x, this.gloObj.root.y, this.gloObj.root.r * 2]);
        return t => this.zoomTo(i(t));
      });

    this.gloObj.label
      .filter(function (d) { return d.parent === self.gloObj.root || this.style.display === "inline"; })
      .transition(transition)
      .style("fill-opacity", d => d.parent === self.gloObj.root ? 1 : 0)
      .on("start", function (d) { if (d.parent === self.gloObj.root) this.style.display = "inline"; })
      .on("end", function (d) { if (d.parent !== self.gloObj.root) this.style.display = "none"; });
  }
}
