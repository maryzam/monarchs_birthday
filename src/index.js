import * as d3 from 'd3';

import { parseMonarchsData, parseCelebrationsData } from './utils/data-parser.js';

import QueensBirthdayViz from './dataviz/queens-birthday.js';

const celebrationData2020 = [
	{ 
		country: 'New Zealand',
		date: '01/06/2020',
		code: 'nz'
	},
	{ 
		country: 'Australia',
		date: '08/06/2020',
		code: 'au'
	},
	{ 
		country: 'Canada',
		date: '18/05/2020',
		code: 'ca'
	},
	{ 
		country: 'United Kingdom',
		date: '13/06/2020',
		code: 'uk'
	},
];

d3
	.csv('/assets/data/british_monarchs.csv')
	.then(source => parseMonarchsData(source))
	.then(monarchBirthdayData => {
		const celebrations = parseCelebrationsData(celebrationData2020);
		const dataviz = new QueensBirthdayViz('.container');
		dataviz.drawMonarchBirthdays(monarchBirthdayData);
		dataviz.drawCelebrationDates(celebrations);
		dataviz.markAvgMonarchBithday(monarchBirthdayData);
	});