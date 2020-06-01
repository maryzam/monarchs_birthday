import { timeParse } from 'd3';

const toDate = timeParse("%d/%m/%Y");

const oneDayDuration = 1000 * 60 * 60 *24;

const getDayOfYear = (date) => {
	const startOfTheYear = new Date(date.getFullYear(), 0, 0);
	const timeZoneOffset = (startOfTheYear.getTimezoneOffset() - date.getTimezoneOffset()) * 1000 * 60;
	const diff = (date - startOfTheYear) + timeZoneOffset;
	const dayOfTheYear = Math.floor(diff / oneDayDuration);
	return dayOfTheYear;
};

const parseMonarchsData = (source) => {
	console.log(source);
	if (!source || !source.length) {
		return [];
	}
	
	return source.map((info) => {
		const birthdayDate = toDate(info.Born);
		console.log(info.Name)
		return ({
			name: info.Name,
			reign_from: toDate(info.From),
			reign_till: toDate(info.Till),
			born: birthdayDate,
			birthday: getDayOfYear(birthdayDate),
			celebrations: +info.Celebrates,
			title: info.Title,
			label: +info.Label
		});
	});
};

export {
	parseMonarchsData
};
