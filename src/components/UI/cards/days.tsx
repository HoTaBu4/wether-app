import { useContext, useEffect, useMemo, useState } from 'react';
import  ContextM  from "../../context/context";
import Card from "./card";
import './cartStyle.css'
import PodcastMenu from "../podcastMenu/podcastMenu";
import { ForecastDay } from '../../../store/types/types';

interface Props{
  forecastDays: ForecastDay[];
  onSelectDays: (days: number) => void;
  selectedDays: number;
  isLoading: boolean;
}

const MAX_ITEMS_PER_VIEW = 6;

export const Days = ({forecastDays, onSelectDays, selectedDays, isLoading}:Props) =>{
 const theme = useContext(ContextM);
 const [startIndex, setStartIndex] = useState(0);

 const effectiveItemsPerView = useMemo(() => {
  if (!forecastDays.length) {
    return MAX_ITEMS_PER_VIEW;
  }
  return Math.min(MAX_ITEMS_PER_VIEW, forecastDays.length);
 }, [forecastDays.length]);

 useEffect(() => {
  setStartIndex(0);
 }, [forecastDays.length, effectiveItemsPerView]);

 const visibleDays = useMemo(() => {
  return forecastDays.slice(startIndex, startIndex + effectiveItemsPerView);
 }, [forecastDays, startIndex, effectiveItemsPerView]);

 const canGoPrev = startIndex > 0;
 const canGoNext = startIndex + effectiveItemsPerView < forecastDays.length;
 const showSliderControls = forecastDays.length > effectiveItemsPerView;

 const handlePrev = () => {
  if (canGoPrev) {
    setStartIndex(prev => Math.max(prev - effectiveItemsPerView, 0));
  }
 };

 const handleNext = () => {
  if (canGoNext) {
    setStartIndex(prev =>
      Math.min(
        prev + effectiveItemsPerView,
        Math.max(forecastDays.length - effectiveItemsPerView, 0)
      )
    );
  }
 };

 const baseClasses = [
  theme ? 'black-background' : 'white',
  'box_of_cards'
 ];
 if (showSliderControls) {
  baseClasses.push('slider_window');
 }
 const cardContainerClass = baseClasses.join(' ');

 const skeletons = useMemo(() => Array.from({length: effectiveItemsPerView}, (_, index) => (
  <div className={theme ? 'black_card card skeleton_card' : 'white_card card skeleton_card'} key={`skeleton-${index}`}>
    <div className="skeleton-line skeleton-title" />
    <div className="skeleton-line skeleton-subtitle" />
    <div className="skeleton-circle" />
    <div className="skeleton-line skeleton-temp" />
    <div className="skeleton-line skeleton-temp" />
    <div className="skeleton-line skeleton-desc" />
  </div>
  )), [theme, effectiveItemsPerView]);

 return(
  <div className="podcast">
     <PodcastMenu onSelect={onSelectDays} selectedDays={selectedDays}/>
     {showSliderControls ? (
        <div className="forecast_slider">
          <button
            type="button"
            className="slider_button"
            onClick={handlePrev}
            disabled={!canGoPrev || isLoading}
            aria-label="Show previous forecast days"
          >
            ‹
          </button>
          <div className={cardContainerClass}>
            {isLoading
              ? skeletons
              : visibleDays.length > 0
                ? visibleDays.map(day => <Card day={day} key={day.isoDate}/>)
                : <div className="no_forecast_message">No forecast data available.</div>
            }
          </div>
          <button
            type="button"
            className="slider_button"
            onClick={handleNext}
            disabled={!canGoNext || isLoading}
            aria-label="Show next forecast days"
          >
            ›
          </button>
       </div>
     ) : (
        <div className={cardContainerClass}>
          {isLoading
            ? skeletons
            : forecastDays.length > 0
              ? forecastDays.map(day => <Card day={day} key={day.isoDate}/>)
              : <div className="no_forecast_message">No forecast data available.</div>
          }
        </div>
     )}
  </div>
 )
 
}
