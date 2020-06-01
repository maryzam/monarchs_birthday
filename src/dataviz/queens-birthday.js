import * as d3 from 'd3';

const formatDate = d3.timeFormat("%B %d, %Y")

class QueensBirthdayViz {

	constructor(selector) {

		const container = d3.select(selector);
		const containerSize = container.node().getBoundingClientRect();

		this._prepareContainer(container, containerSize);
		this._setupScales(containerSize);

		const topHeight = Math.floor(containerSize.height / 2);

		this.size = {
			height: topHeight,
			wigth: containerSize.width,
			imgDim: Math.min(150, Math.floor(topHeight / 3))
		}
	};

	drawMonarchBirthdays(source) {

		const celebrationsRange = d3.extent(source, source => source.celebrations);
		this.scales.celebrations.domain(celebrationsRange);

		source.sort((one, two) => (two.celebrations - one.celebrations));

		const monarchs = this.container
								.selectAll('g.monarch')
								.data(source)
									.enter()
								.append('g')
									.attr('class', 'monarch')
									.attr("transform", (info) => `translate(${ this.scales.dayOfYear(info.birthday) }, 0)`);

		monarchs
			.append('circle')
				.attr('class', (info) => info.title)
				.attr('r', (info) => this.scales.celebrations(info.celebrations));

		monarchs
			.append('line')
				.attr('class', 'tooltip')
				.attr('y1', (info) => {
					const offset = (info.label + 1) * this.size.imgDim -  this.size.height;
					return offset + ((offset > 0) ? 0 : 25);
				});

		monarchs
			.append('svg:image')
				.attr('xlink:href', (info) => `/assets/images/${ info.name.replace(' ', '_') }_sq.png`)
				.attr('width', this.size.imgDim)
				.attr('height', this.size.imgDim)
				.attr('x', -(this.size.imgDim / 2))
				.attr('y', (info) => (info.label * this.size.imgDim -this.size.height));

		monarchs
			.append('text')
				.text((info) => info.name)
				.attr('class', 'name')
				.attr('y', (info) => ((info.label + 1)  * this.size.imgDim - this.size.height))
				.attr('dy', '1em');

		monarchs
			.append('text')
				.text((info) => formatDate(info.born))
				.attr('class', 'note')
				.attr('y', (info) => ((info.label + 1)*  this.size.imgDim - this.size.height))
				.attr('dy', '2.5em');
	}

	drawCelebrationDates(source) {
		source.sort((one, two) => (one.dayOfYear - two.dayOfYear));

		const countries = this.container
								.selectAll('g.country')
								.data(source)
									.enter()
								.append('g')
									.attr('class', 'country')
									.attr("transform", (info) => `translate(${ this.scales.dayOfYear(info.dayOfYear) }, 0)`);
		countries
			.append('svg:image')
				.attr('xlink:href', (info) => `/assets/images/flags/${ info.code }.png`)
				.attr('width', 12)
				.attr('height', 12)
				.attr('x', -6)
				.attr('y', -6);
	}

	markAvgMonarchBithday(source) {

		const sumOfBithdays = source.reduce((days, info) => (days + (info.birthday * info.celebrations)), 0);
		const celebrationsTotal = source.reduce((total, info) => (total + info.celebrations), 0);
		const avgBirthday = Math.ceil(sumOfBithdays / celebrationsTotal);

		this.container
			.selectAll('.avg-birthday')
			.data([avgBirthday])
				.enter()
			.append('g')
				.attr('class', 'avg-birthday')
				.attr('transform', (day) => `translate($ {this.scales.dayOfYear(day)}, 0)`);
	};

	_setupScales(containerSize) {

		const maxMarkRadius = Math.floor(containerSize.width / 20);

		const dayOfYearScale = d3
								.scaleLinear()
								.domain([0, 365])
								.range([0, containerSize.width]);

		const celebrationScale = d3
								  .scaleSqrt()
								  .range([3, maxMarkRadius]);

		this.scales = {
			dayOfYear: dayOfYearScale,
			celebrations: celebrationScale
		};
	};

	_prepareContainer(root, containerSize) {

		const midHeight = Math.floor(containerSize.height / 2);

		this.container = d3
					.select(".container")
					.append("svg")
						.attr("width", containerSize.width)
						.attr("height", containerSize.height)
					.append("g")
						.attr("transform", `translate(0, ${ midHeight })`);

		this.container
			.append("line")
				.attr("class", "axis")
				.attr("x2", containerSize.width);
	};

};

export default QueensBirthdayViz;