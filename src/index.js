import * as d3 from 'd3';

import { parseMonarchsData } from './utils/data-parser.js';

import QueensBirthdayViz from './dataviz/queens-birthday.js';

const celebrationData = [];

d3
	.csv('/assets/data/british_monarchs.csv')
	.then(source => parseMonarchsData(source))
	.then(monarchBirthdayData => {
		const dataviz = new QueensBirthdayViz('.container');
		dataviz.drawMonarchBirthdays(monarchBirthdayData);
		dataviz.drawCelebrationDates(celebrationData);
		dataviz.markAvgMonarchBithday(monarchBirthdayData);
	});