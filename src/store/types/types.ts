export interface ForecastDay {
    isoDate: string;
    weekday: string;
    dateLabel: string;
    icon: string;
    maxTempC: number;
    minTempC: number;
    description: string;
}

export interface Wether {
    current: {
        temp_c: number;
        condition: {
            icon: string;
        };
    };
    forecast?: {
        requestedDays: number;
        days: ForecastDay[];
    };
}
