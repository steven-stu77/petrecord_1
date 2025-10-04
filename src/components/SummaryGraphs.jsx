import React, { useState } from 'react';

export const SummaryGraphs = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('behavior');

  // Mock data for demonstration
  const behaviorData = [
    { date: '2024-09-15', aggressive: 2, playful: 8, anxious: 3 },
    { date: '2024-09-20', aggressive: 1, playful: 12, anxious: 2 },
    { date: '2024-09-25', aggressive: 3, playful: 10, anxious: 4 },
    { date: '2024-09-30', aggressive: 1, playful: 15, anxious: 2 },
    { date: '2024-10-05', aggressive: 0, playful: 18, anxious: 1 }
  ];

  const healthMetrics = [
    { metric: 'Weight', value: 85, unit: 'lbs', trend: 'stable' },
    { metric: 'Temperature', value: 101.2, unit: '°F', trend: 'normal' },
    { metric: 'Heart Rate', value: 120, unit: 'bpm', trend: 'good' },
    { metric: 'Activity Level', value: 75, unit: '%', trend: 'up' }
  ];

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '✅';
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'rgb(22, 101, 52)';
      case 'down': return 'rgb(220, 38, 38)';
      case 'stable': return 'rgb(37, 99, 235)';
      default: return 'rgb(75, 85, 99)';
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: 'rgb(17, 24, 39)',
          marginBottom: '0.5rem'
        }}>Summary Graphs & Analytics</h1>
        <p style={{ color: 'rgb(75, 85, 99)' }}>Visual insights into your pets' health and behavior patterns</p>
      </div>

      {/* Controls */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'rgb(55, 65, 81)',
              marginBottom: '0.5rem'
            }}>Time Range</label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              style={{
                border: '1px solid rgb(209, 213, 219)',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
                outline: 'none',
                fontSize: '1rem'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgb(59, 130, 246)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'rgb(55, 65, 81)',
              marginBottom: '0.5rem'
            }}>Metric Type</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              style={{
                border: '1px solid rgb(209, 213, 219)',
                borderRadius: '0.375rem',
                padding: '0.5rem 0.75rem',
                outline: 'none',
                fontSize: '1rem'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgb(59, 130, 246)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <option value="behavior">Behavior Patterns</option>
              <option value="health">Health Metrics</option>
              <option value="activity">Activity Levels</option>
              <option value="training">Training Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Behavior Chart Simulation */}
      {selectedMetric === 'behavior' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'rgb(31, 41, 55)',
            marginBottom: '1.5rem'
          }}>Behavior Patterns Over Time</h2>
          <div style={{
            height: '16rem',
            backgroundColor: 'rgb(249, 250, 251)',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed rgb(209, 213, 219)'
          }}>
            <div style={{ textAlign: 'center', color: 'rgb(107, 114, 128)' }}>
              <div style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>📊</div>
              <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>Interactive Chart Would Appear Here</p>
              <p style={{ fontSize: '0.875rem' }}>Showing behavior trends: Playful, Aggressive, Anxious</p>
            </div>
          </div>
          
          {/* Data Table */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '500',
              color: 'rgb(31, 41, 55)',
              marginBottom: '1rem'
            }}>Recent Data Points</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                minWidth: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead style={{ backgroundColor: 'rgb(249, 250, 251)' }}>
                  <tr>
                    <th style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: 'rgb(107, 114, 128)',
                      textTransform: 'uppercase'
                    }}>Date</th>
                    <th style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: 'rgb(107, 114, 128)',
                      textTransform: 'uppercase'
                    }}>Playful</th>
                    <th style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: 'rgb(107, 114, 128)',
                      textTransform: 'uppercase'
                    }}>Aggressive</th>
                    <th style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: 'rgb(107, 114, 128)',
                      textTransform: 'uppercase'
                    }}>Anxious</th>
                  </tr>
                </thead>
                <tbody>
                  {behaviorData.map((data, index) => (
                    <tr key={index} style={{
                      borderBottom: '1px solid rgb(229, 231, 235)',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(249, 250, 251)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    >
                      <td style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: 'rgb(17, 24, 39)'
                      }}>{data.date}</td>
                      <td style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: 'rgb(22, 101, 52)',
                        fontWeight: '500'
                      }}>{data.playful}</td>
                      <td style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: 'rgb(220, 38, 38)',
                        fontWeight: '500'
                      }}>{data.aggressive}</td>
                      <td style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.875rem',
                        color: 'rgb(202, 138, 4)',
                        fontWeight: '500'
                      }}>{data.anxious}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Health Metrics */}
      {selectedMetric === 'health' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {healthMetrics.map((metric, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  color: 'rgb(31, 41, 55)'
                }}>{metric.metric}</h3>
                <span style={{
                  fontSize: '1.5rem',
                  color: getTrendColor(metric.trend)
                }}>
                  {getTrendIcon(metric.trend)}
                </span>
              </div>
              <div style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                color: 'rgb(17, 24, 39)',
                marginBottom: '0.5rem'
              }}>
                {metric.value} <span style={{
                  fontSize: '0.875rem',
                  fontWeight: 'normal',
                  color: 'rgb(107, 114, 128)'
                }}>{metric.unit}</span>
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: getTrendColor(metric.trend),
                textTransform: 'capitalize'
              }}>
                {metric.trend} trend
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'rgb(55, 65, 81)',
            marginBottom: '1rem'
          }}>Most Active Pet</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '2.25rem', marginRight: '1rem' }}>🐕</div>
            <div>
              <p style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: 'rgb(17, 24, 39)'
              }}>Buddy</p>
              <p style={{
                fontSize: '0.875rem',
                color: 'rgb(107, 114, 128)'
              }}>Golden Retriever</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'rgb(55, 65, 81)',
            marginBottom: '1rem'
          }}>Behavior Alerts</h3>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'rgb(202, 138, 4)'
            }}>2</p>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgb(107, 114, 128)'
            }}>Require attention</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'rgb(55, 65, 81)',
            marginBottom: '1rem'
          }}>Health Score</h3>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'rgb(22, 101, 52)'
            }}>92%</p>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgb(107, 114, 128)'
            }}>Excellent</p>
          </div>
        </div>
      </div>

      {/* Chart Placeholder for other metrics */}
      {selectedMetric !== 'behavior' && selectedMetric !== 'health' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: 'rgb(31, 41, 55)',
            marginBottom: '1.5rem',
            textTransform: 'capitalize'
          }}>{selectedMetric} Analytics</h2>
          <div style={{
            height: '16rem',
            backgroundColor: 'rgb(249, 250, 251)',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed rgb(209, 213, 219)'
          }}>
            <div style={{ textAlign: 'center', color: 'rgb(107, 114, 128)' }}>
              <div style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>📈</div>
              <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>{selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Chart</p>
              <p style={{ fontSize: '0.875rem' }}>Interactive visualization for {selectedMetric} data</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};