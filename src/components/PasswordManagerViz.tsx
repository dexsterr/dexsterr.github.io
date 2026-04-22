import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PasswordManagerViz: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;

    svg.attr('width', width).attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    // Lock body
    const lockBody = svg.append('rect')
      .attr('x', width / 2 - 25)
      .attr('y', height / 2 - 15)
      .attr('width', 50)
      .attr('height', 40)
      .attr('fill', '#333')
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 2)
      .attr('rx', 5);

    // Lock shackle
    const shackle = svg.append('path')
      .attr('d', `M ${width / 2 - 15} ${height / 2 - 15} A 15 15 0 0 1 ${width / 2 + 15} ${height / 2 - 15}`)
      .attr('fill', 'none')
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 3);

    // Keyhole
    svg.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2 + 5)
      .attr('r', 3)
      .attr('fill', '#000');

    svg.append('rect')
      .attr('x', width / 2 - 1)
      .attr('y', height / 2 + 5)
      .attr('width', 2)
      .attr('height', 8)
      .attr('fill', '#000');

    // Encryption particles
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        char: String.fromCharCode(65 + Math.floor(Math.random() * 26))
      });
    }

    const particleElements = svg.selectAll('.particle')
      .data(particles)
      .enter()
      .append('text')
      .attr('class', 'particle')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('fill', '#00ff88')
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .text(d => d.char)
      .style('filter', 'drop-shadow(0 0 3px #00ff88)');

    // Key
    const key = svg.append('g')
      .attr('transform', `translate(${width * 0.8}, ${height * 0.3})`);

    key.append('rect')
      .attr('x', -20)
      .attr('y', -2)
      .attr('width', 25)
      .attr('height', 4)
      .attr('fill', '#ffd700')
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 1);

    key.append('circle')
      .attr('cx', 5)
      .attr('cy', 0)
      .attr('r', 6)
      .attr('fill', '#ffd700')
      .attr('stroke', '#00ff88')
      .attr('stroke-width', 1);

    // Teeth
    for (let i = 0; i < 3; i++) {
      key.append('rect')
        .attr('x', -15 + i * 5)
        .attr('y', -2)
        .attr('width', 2)
        .attr('height', -3 - i)
        .attr('fill', '#ffd700');
    }

    // Animation
    const animate = () => {
      // Update particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      particleElements
        .attr('x', d => d.x)
        .attr('y', d => d.y);

      // Rotate key
      const time = Date.now() / 3000;
      key.attr('transform', `translate(${width * 0.8}, ${height * 0.3}) rotate(${Math.sin(time) * 10})`);

      requestAnimationFrame(animate);
    };
    animate();

  }, []);

  return (
    <div className="w-full h-56 bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default PasswordManagerViz;