import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ArbitrageVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;

    svg.attr('width', width).attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    // Chart line
    const lineData = [];
    for (let i = 0; i < 100; i++) {
      lineData.push({
        x: i * 4,
        y: height / 2 + Math.sin(i * 0.1) * 30 + Math.random() * 20 - 10
      });
    }

    const line = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBasis);

    const path = svg.append('path')
      .datum(lineData)
      .attr('d', line)
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 2)
      .attr('fill', 'none')
      .style('filter', 'drop-shadow(0 0 5px #00ff88)');

    // Animate chart scrolling
    const animateChart = () => {
      const currentTransform = path.attr('transform') || 'translate(0,0) rotate(0)';
      const translateX = parseFloat(currentTransform.split('translate(')[1].split(',')[0]) || 0;
      const newTranslateX = translateX - 2;
      const rotate = Math.sin(Date.now() / 2000) * 5;

      path.attr('transform', `translate(${newTranslateX},0) rotate(${rotate})`);

      if (Math.abs(newTranslateX) > 200) {
        path.attr('transform', 'translate(0,0) rotate(0)');
      }

      requestAnimationFrame(animateChart);
    };
    animateChart();

    // Scanner bar
    const scanner = svg.append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 10px #00ff88)');

    const animateScanner = () => {
      const x = (Date.now() / 5000 % 1) * width;
      scanner.attr('x1', x).attr('x2', x);
      requestAnimationFrame(animateScanner);
    };
    animateScanner();

    // Hit points
    const hitPoints = [
      { x: width * 0.2, y: height * 0.4, delay: 500 },
      { x: width * 0.5, y: height * 0.6, delay: 1200 },
      { x: width * 0.8, y: height * 0.3, delay: 1800 }
    ];

    hitPoints.forEach((point, i) => {
      const hit = svg.append('circle')
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('r', 3)
        .attr('fill', '#00ff88')
        .attr('opacity', 0)
        .style('filter', 'drop-shadow(0 0 5px #00ff88)');

      const animateHit = () => {
        const time = Date.now() + point.delay;
        const opacity = Math.sin(time / 1000) > 0 ? 1 : 0;
        const scale = Math.sin(time / 1000) > 0 ? 1.5 : 1;
        hit.attr('opacity', opacity)
           .attr('r', 3 * scale);
        requestAnimationFrame(animateHit);
      };
      setTimeout(() => animateHit(), point.delay);
    });

  }, []);

  return (
    <div className="w-full h-56 bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default ArbitrageVisualization;