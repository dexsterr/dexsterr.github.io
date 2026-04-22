import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const SecurityEventAnalysisViz: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;

    svg.attr('width', width).attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    // Dashboard background
    svg.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#111')
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 1);

    // Status indicators
    const indicators = [
      { x: 50, y: 40, label: 'IOC', status: 'active' },
      { x: 150, y: 40, label: 'Phishing', status: 'alert' },
      { x: 250, y: 40, label: 'Threat', status: 'normal' },
      { x: 350, y: 40, label: 'Response', status: 'active' }
    ];

    indicators.forEach((ind, i) => {
      const color = ind.status === 'alert' ? '#ff4444' :
                   ind.status === 'active' ? '#00ff88' : '#888';

      // Indicator circle
      const circle = svg.append('circle')
        .attr('cx', ind.x)
        .attr('cy', ind.y)
        .attr('r', 15)
        .attr('fill', color)
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0 0 5px ' + color + ')');

      // Label
      svg.append('text')
        .attr('x', ind.x)
        .attr('y', ind.y + 35)
        .attr('text-anchor', 'middle')
        .attr('fill', color)
        .attr('font-size', '10px')
        .text(ind.label);

      // Pulse for active/alert
      if (ind.status !== 'normal') {
        const pulse = () => {
          const time = Date.now() / 1000;
          const scale = 1 + 0.3 * Math.sin(time + i * 0.5);
          circle.attr('r', 15 * scale);
          requestAnimationFrame(pulse);
        };
        pulse();
      }
    });

    // Data flow lines
    const flows = [
      { x1: 50, y1: 40, x2: 150, y2: 40 },
      { x1: 150, y1: 40, x2: 250, y2: 40 },
      { x1: 250, y1: 40, x2: 350, y2: 40 }
    ];

    flows.forEach(flow => {
      svg.append('line')
        .attr('x1', flow.x1)
        .attr('y1', flow.y1)
        .attr('x2', flow.x2)
        .attr('y2', flow.y2)
        .attr('stroke', '#00ff88')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

      // Animated data packet
      const packet = svg.append('circle')
        .attr('cx', flow.x1)
        .attr('cy', flow.y1)
        .attr('r', 3)
        .attr('fill', '#00ff88')
        .style('filter', 'drop-shadow(0 0 3px #00ff88)');

      const animatePacket = () => {
        const time = Date.now() / 2000 % 1;
        const x = flow.x1 + (flow.x2 - flow.x1) * time;
        const y = flow.y1 + (flow.y2 - flow.y1) * time;
        packet.attr('cx', x).attr('cy', y);
        requestAnimationFrame(animatePacket);
      };
      animatePacket();
    });

    // Alert notifications
    const alerts = [
      { y: 120, message: 'Suspicious Login', severity: 'high' },
      { y: 140, message: 'Malware Detected', severity: 'critical' },
      { y: 160, message: 'Port Scan Alert', severity: 'medium' }
    ];

    alerts.forEach((alert, i) => {
      const color = alert.severity === 'critical' ? '#ff0000' :
                   alert.severity === 'high' ? '#ff8800' : '#ffff00';

      svg.append('rect')
        .attr('x', 20)
        .attr('y', alert.y - 8)
        .attr('width', width - 40)
        .attr('height', 16)
        .attr('fill', 'rgba(0,0,0,0.7)')
        .attr('stroke', color)
        .attr('stroke-width', 1)
        .attr('rx', 2);

      svg.append('text')
        .attr('x', 30)
        .attr('y', alert.y + 2)
        .attr('fill', color)
        .attr('font-size', '10px')
        .text(alert.message);

      // Blink effect
      const blink = () => {
        const time = Date.now() / 500;
        const opacity = Math.sin(time + i) > 0 ? 1 : 0.3;
        svg.selectAll('rect').filter((d, j) => j === i + 4).attr('opacity', opacity);
        requestAnimationFrame(blink);
      };
      setTimeout(() => blink(), i * 200);
    });

  }, []);

  return (
    <div className="w-full h-56 bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default SecurityEventAnalysisViz;