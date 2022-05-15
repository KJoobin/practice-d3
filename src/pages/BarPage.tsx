import { useEffect, useRef } from 'react';

import * as d3 from 'd3';

const HEIGHT = 150;
const WIDTH = 300;

const MARGIN = ({
  top: 20, right: 0, bottom: 30, left: 40,
});

const data = [
  { date: '1', value: 4 },
  { date: '2', value: 10 },
  { date: '3', value: 20 },
  { date: '4', value: 30 },
  { date: '7', value: 120 },
  { date: '14', value: 120 },
];

function BarPage() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const x = d3.scaleBand()
      .domain(['1', '2', '3', '4', '5', '6', '7'])
      .range([MARGIN.left, WIDTH - MARGIN.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0]).nice()
      .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

    const xAxis = (g) => g
      .attr('transform', `translate(0,${HEIGHT - MARGIN.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = (g) => g
      .attr('transform', `translate(${MARGIN.left},0)`)
      .call(d3.axisLeft(y))
      .call((g) => g.select('.domain').remove());

    const bar = svg.append('g')
      .attr('class', 'bars')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data.filter((el) => +el.date > 0 && +el.date < 8))
      .join('rect')
      .attr('x', (d) => x(d.date) || 0)
      .attr('y', y(0))
      .attr('height', 0)
      .attr('width', x.bandwidth())

    svg.append('g')
      .attr('class', 'x-axis')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    bar.transition()
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => y(0) - y(d.value))
      .ease(d3.easeLinear)
      .duration(1000);
  }, [data]);

  return (
    <div>
      <h2>
        BarPage
      </h2>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <svg
          ref={svgRef}
          viewBox={`0, 0, ${WIDTH}, ${HEIGHT}`}
        />
      </div>
    </div>
  );
}

export default BarPage;
