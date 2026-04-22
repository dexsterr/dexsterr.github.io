import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const NetworkSecurityScannerViz: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;

    svg.attr('width', width).attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    // Network nodes
    const nodes = [
      { x: width * 0.1, y: height * 0.2, type: 'router', status: 'open' },
      { x: width * 0.3, y: height * 0.4, type: 'server', status: 'open' },
      { x: width * 0.5, y: height * 0.6, type: 'workstation', status: 'closed' },
      { x: width * 0.7, y: height * 0.3, type: 'firewall', status: 'filtered' },
      { x: width * 0.9, y: height * 0.5, type: 'switch', status: 'open' }
    ];

    // Connections
    const links = [
      { source: 0, target: 1 },
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 0, target: 4 }
    ];

    // Draw connections
    links.forEach(link => {
      const source = nodes[link.source];
      const target = nodes[link.target];

      svg.append('line')
        .attr('x1', source.x)
        .attr('y1', source.y)
        .attr('x2', target.x)
        .attr('y2', target.y)
        .attr('stroke', 'rgba(0, 255, 136, 0.3)')
        .attr('stroke-width', 2);
    });

    // Draw nodes
    nodes.forEach((node, i) => {
      const color = node.status === 'open' ? '#00ff88' :
                   node.status === 'closed' ? '#ff4444' : '#ffaa00';

      const circle = svg.append('circle')
        .attr('cx', node.x)
        .attr('cy', node.y)
        .attr('r', 12)
        .attr('fill', color)
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0 0 5px ' + color + ')');

      // Label
      svg.append('text')
        .attr('x', node.x)
        .attr('y', node.y + 25)
        .attr('text-anchor', 'middle')
        .attr('fill', color)
        .attr('font-size', '8px')
        .text(node.type);

      // Pulse for open ports
      if (node.status === 'open') {
        const pulse = () => {
          const time = Date.now() / 1000;
          const scale = 1 + 0.3 * Math.sin(time + i);
          circle.attr('r', 12 * scale);
          requestAnimationFrame(pulse);
        };
        pulse();
      }
    });

    // Scanning wave
    const wave = svg.append('circle')
      .attr('cx', width * 0.1)
      .attr('cy', height * 0.2)
      .attr('r', 0)
      .attr('fill', 'none')
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 2)
      .attr('opacity', 0.5)
      .style('filter', 'drop-shadow(0 0 10px #00ff88)');

    const scanWave = () => {
      const time = Date.now() / 2000 % 1;
      const radius = time * Math.sqrt(width * width + height * height);
      wave.attr('r', radius);
      requestAnimationFrame(scanWave);
    };
    scanWave();

  }, []);

  return (
    <div className="w-full h-56 bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default NetworkSecurityScannerViz;