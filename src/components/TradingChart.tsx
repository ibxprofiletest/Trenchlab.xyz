import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { AI_MODELS } from '../types';
import { useLiveData } from '../hooks/useLiveData';

export default function TradingChart() {
  const { models, chartData, isLive, toggleLive } = useLiveData();
  const [visibleModels, setVisibleModels] = useState<Set<string>>(
    new Set(models.map(m => m.id))
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState(0);

  const toggleModel = (modelId: string) => {
    setVisibleModels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(modelId)) {
        newSet.delete(modelId);
      } else {
        newSet.add(modelId);
      }
      return newSet;
    });
  };

  const showAll = () => {
    setVisibleModels(new Set(models.map(m => m.id)));
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 5)); // Max zoom 5x
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5)); // Min zoom 0.5x
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startOffset = panOffset;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const totalPoints = chartData.length;
      const deltaOffset = deltaX / (totalPoints * 10); // Adjust sensitivity
      setPanOffset(Math.max(0, Math.min(1, startOffset + deltaOffset)));
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const formatValue = (value: number) => {
    return `$${value.toFixed(0)}`;
  };

  // Apply zoom and pan to chart data
  const getVisibleData = () => {
    const totalPoints = chartData.length;
    const visiblePoints = Math.floor(totalPoints / zoomLevel);
    const startIndex = Math.max(0, Math.floor(panOffset * totalPoints));
    const endIndex = Math.min(totalPoints, startIndex + visiblePoints);
    
    return chartData.slice(startIndex, endIndex);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chart Controls */}
      <div className="bg-background border-2 border-b-0 border-border px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <button 
            onClick={zoomIn}
            className="px-2 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold border-2 border-border bg-background text-foreground hover:bg-muted transition-colors"
          >
            <span className="hidden sm:inline">ZOOM IN </span>+
          </button>
          <button 
            onClick={zoomOut}
            className="px-2 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold border-2 border-border bg-background text-foreground hover:bg-muted transition-colors"
          >
            <span className="hidden sm:inline">ZOOM OUT </span>−
          </button>
          <button 
            onClick={resetView}
            className="px-2 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <span className="hidden sm:inline">RESET </span>
            <span className="sm:hidden">↻ </span>
            <span className="hidden sm:inline">VIEW</span>
          </button>
          <button 
            onClick={toggleLive}
            className={`px-2 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold border-2 transition-colors ${
              isLive 
                ? 'border-red-500 bg-red-500 text-white hover:bg-red-600' 
                : 'border-green-500 bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            <span className="hidden sm:inline">{isLive ? 'PAUSE' : 'START '}</span>
            <span className="sm:hidden">{isLive ? '⏸' : '▶'}</span>
            <span className="hidden sm:inline">{isLive ? ' LIVE' : 'LIVE'}</span>
          </button>
          <span className="hidden md:inline text-xs text-muted-foreground ml-2">
            Use mouse wheel to zoom, drag to pan
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-muted-foreground border-l-2 border-border pl-2 sm:pl-4">
            ZOOM: {zoomLevel.toFixed(1)}x
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-muted-foreground ml-auto border-l-2 border-border pl-2 sm:pl-4">
            <span className="hidden sm:inline">ALL TIMES IN </span>UTC
          </span>
        </div>
      </div>

      {/* Chart */}
      <div 
        className="flex-1 bg-card border-2 border-border cursor-grab active:cursor-grabbing" 
        style={{ minHeight: '400px' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={getVisibleData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E0" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="#666666"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <YAxis
              tickFormatter={formatValue}
              stroke="#666666"
              style={{ fontSize: '12px', fontFamily: 'monospace' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #1A1A1A',
                borderRadius: '0',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
              labelFormatter={(label) => formatTime(label as number)}
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            />
            <Legend
              wrapperStyle={{
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            />
            {models.map(model => (
              visibleModels.has(model.id) && (
                <Line
                  key={model.id}
                  type="monotone"
                  dataKey={model.id}
                  name={model.displayName}
                  stroke={model.color}
                  strokeWidth={2}
                  dot={false}
                  animationDuration={300}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Model Filters */}
      <div className="bg-background border-2 border-t-0 border-border p-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={showAll}
            className="px-3 py-1.5 text-xs font-bold border-2 border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            SHOW ALL
          </button>
          {models.map(model => (
            <button
              key={model.id}
              onClick={() => toggleModel(model.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs border-2 transition-all ${
                visibleModels.has(model.id)
                  ? 'border-border bg-card'
                  : 'border-muted-foreground bg-muted opacity-50'
              }`}
            >
              <div
                className="w-3 h-3 border-2 border-border"
                style={{ backgroundColor: model.color }}
              />
              <span className="font-medium">{model.displayName}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
