import { useState, useEffect, useCallback } from 'react';
import { AI_MODELS } from '../types';
import { generateChartData } from '../data/mockData';
import type { AIModel, ChartDataPoint } from '../types';

export const useLiveData = () => {
  const [models, setModels] = useState<AIModel[]>(AI_MODELS);
  const [chartData, setChartData] = useState<ChartDataPoint[]>(generateChartData());
  const [isLive, setIsLive] = useState(true);

  const updateModelValues = useCallback(() => {
    setModels(prevModels => 
      prevModels.map((model, index) => {
        // Each model has different volatility and trading patterns
        const volatilities = [0.005, 0.008, 0.003, 0.006, 0.012, 0.004, 0.007]; // Different volatility levels
        const tradingFrequencies = [0.1, 0.15, 0.05, 0.12, 0.2, 0.08, 0.13]; // Different trading frequencies
        
        const volatility = volatilities[index];
        const changePercent = (Math.random() - 0.5) * volatility; // ±volatility% change
        const newValue = model.currentValue * (1 + changePercent);
        
        // Use different base values for each model to maintain separation
        const baseValues = [150, 300, 450, 600, 750, 900, 1050];
        const baseValue = baseValues[index];
        const newPercentChange = ((newValue - baseValue) / baseValue) * 100;
        
        // Different models trade at different frequencies
        const shouldAddTrade = Math.random() < tradingFrequencies[index];
        
        return {
          ...model,
          currentValue: newValue,
          percentChange: newPercentChange,
          trades: model.trades + (shouldAddTrade ? 1 : 0),
        };
      })
    );
  }, []);

  const updateChartData = useCallback(() => {
    setChartData(prevData => {
      const newData = [...prevData];
      const now = Date.now();
      
      // Add new data point
      const newPoint: ChartDataPoint = { timestamp: now };
      
      models.forEach((model, index) => {
        const lastValue = prevData[prevData.length - 1]?.[model.id] || model.currentValue;
        
        // More realistic market movements
        const volatilities = [0.002, 0.004, 0.001, 0.003, 0.006, 0.002, 0.003];
        const volatility = volatilities[index];
        
        // Random walk with slight upward bias
        const randomChange = (Math.random() - 0.4) * volatility; // Slight upward bias
        const trendBias = 0.0001; // Small upward trend
        
        // Add some momentum (if last move was up, slightly more likely to continue)
        const lastChange = prevData.length > 1 ? 
          (lastValue - (prevData[prevData.length - 2]?.[model.id] || lastValue)) / lastValue : 0;
        const momentum = lastChange * 0.1; // Small momentum effect
        
        const totalChange = randomChange + trendBias + momentum;
        newPoint[model.id] = lastValue * (1 + totalChange);
      });
      
      newData.push(newPoint);
      
      // Keep only last 100 points
      return newData.slice(-100);
    });
  }, [models]);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      updateModelValues();
      updateChartData();
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isLive, updateModelValues, updateChartData]);

  const toggleLive = () => setIsLive(prev => !prev);

  return {
    models,
    chartData,
    isLive,
    toggleLive,
  };
};
