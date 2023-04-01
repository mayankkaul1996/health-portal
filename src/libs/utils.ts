export class DomainUtils {

	static getDomainFromEmail(email: string, withTLD: boolean = true): string {
		let domain: string = email.split('@')[1];

		if (!withTLD) {
			domain = domain.split('.')[0];
		}

		return domain;
	}
}

export class Utils {

	static getWeekStartEnd(date?: Date) {
		const currentDate = date ? new Date(date) : new Date();
		const currentDay = currentDate.getDay();
		const weekStart = new Date(currentDate.valueOf() - (currentDay<=0 ? 7-1:currentDay-1)*86400000);
		const weekEnd = new Date(weekStart.valueOf() + 7*86400000);
		return { weekStart, weekEnd }
	}

	static sentenceCamelCase(str: string) {
		const result = (str).replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
	}

	static AddMinutesToDate(date: Date, minutes: number): Date {
		return new Date(date.getTime() + minutes * 60000);
	}

}