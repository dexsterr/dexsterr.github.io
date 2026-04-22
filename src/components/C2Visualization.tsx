import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const C2Visualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;

    svg.attr('width', width).attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    // Center point
    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 15)
      .attr('fill', '#00ff88')
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 10px #00ff88)');

    // Orbits
    const orbits = [
      { radius: 60, duration: 4000 },
      { radius: 80, duration: 6000 },
      { radius: 40, duration: 3000, reverse: true }
    ];

    orbits.forEach((orbit, i) => {
      // Orbit circle
      svg.append('circle')
        .attr('cx', width / 2)
        .attr('cy', height / 2)
        .attr('r', orbit.radius)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(0, 255, 136, 0.2)')
        .attr('stroke-width', 1);

      // Agent
      const agent = svg.append('circle')
        .attr('r', 4)
        .attr('fill', '#00ff88')
        .style('filter', 'drop-shadow(0 0 5px #00ff88)');

      // Animation
      const animate = () => {
        const angle = orbit.reverse ? -Date.now() / orbit.duration * 360 : Date.now() / orbit.duration * 360;
        const radian = (angle * Math.PI) / 180;
        const x = width / 2 + orbit.radius * Math.cos(radian);
        const y = height / 2 + orbit.radius * Math.sin(radian);
        agent.attr('cx', x).attr('cy', y);
        requestAnimationFrame(animate);
      };
      animate();
    });

    // Scan line
    const scanLine = svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', 0)
      .attr('y2', 0)
      .attr('stroke', 'rgba(0, 255, 136, 0.1)')
      .attr('stroke-width', 2);

    const scanAnimate = () => {
      const y = (Date.now() / 3000 % 1) * height;
      scanLine.attr('y1', y).attr('y2', y);
      requestAnimationFrame(scanAnimate);
    };
    scanAnimate();

  }, []);

  return (
    <div className="w-full h-56 bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default C2Visualization;