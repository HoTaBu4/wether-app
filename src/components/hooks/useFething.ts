import { useCallback, useState } from 'react';
import { WetherService } from "../../services/wetherService";
import { Wether } from "../../store/types/types";

export const useFetching = (city: string = "London", defaultDays: number = 7) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<unknown>(undefined);

    const parser = useCallback(async (days: number = defaultDays): Promise<Wether | null> => {
        try {
            setIsLoading(true);
            setError(undefined);
            const response = await WetherService.getCurrentWether(city, days);
            return response.data;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [city, defaultDays]);

    return [parser, isLoading, error] as const;
};
