import * as d3 from 'd3';

class QueensBirthdayViz {

	constructor(selector) {

		const container = d3.select(selector);
		const containerSize = container.node().getBoundingClientRect();

		this._prepareContainer(container, containerSize);

		this._setupScales(containerSize);
	};

	drawMonarchBirthdays(source) {
		const celebrationsRange = d3.extent(source, source => source.celebrations);
		this.scales.celebrations.domain(celebrationsRange);

		this.container
			.selectAll('.monarch')
			.data(source)
				.enter()
			.append('circle')
				.attr('class', (info) => `monarch ${ info.title }`)
				.attr('cx', (info) => this.scales.dayOfYear(info.birthday))
				.attr('cy', 0)
				.attr("data-name", (info) => info.name)
				.attr("data-cel", (info) => info.celebrations)
				.attr("data-birthday", (info) => info.birthday)
				.attr('r', (info) => this.scales.celebrations(info.celebrations));
	}

	drawCelebrationDates(source) {
		console.log('drawCelebrationDates');
	}

	markAvgMonarchBithday(source) {
		const sumOfBithdays = source.reduce((days, info) => (days + (info.birthday * info.celebrations)), 0);
		const celebrationsTotal = source.reduce((total, info) => (total + info.celebrations), 0);
		const avgBirthday = Math.round(sumOfBithdays / celebrationsTotal);

		this.container
			.selectAll('.avg-birthday')
			.data([avgBirthday])
				.enter()
			.append('circle')
				.attr('cx', (day) => this.scales.dayOfYear(day))
				.attr("r", 3)
				.style("fill", "red");

		const statistic = new Date();
		statistic.setMonth(0);
		statistic.setDate(avgBirthday);
		console.log('birthday');
		console.log(statistic);	
		console.log(avgBirthday);	
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