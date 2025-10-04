import React, { useState } from 'react';

export const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedPet, setSelectedPet] = useState('');
  
  const pets = ['All Pets', 'Buddy', 'Bella', 'Max'];
  const reportTypes = [
    { value: 'behavior-summary', label: 'Behavior Summary Report' },
    { value: 'health-records', label: 'Health Records Report' },
    { value: 'activity-log', label: 'Activity Log Report' },
    { value: 'training-progress', label: 'Training Progress Report' }
  ];

  const sampleReports = [
    { id: 1, name: 'Monthly Behavior Report - September', type: 'Behavior Summary', date: '2024-10-01', pet: 'All Pets' },
    { id: 2, name: 'Buddy Health Check Report', type: 'Health Records', date: '2024-09-28', pet: 'Buddy' },
    { id: 3, name: 'Training Progress - Week 40', type: 'Training Progress', date: '2024-09-25', pet: 'Bella' }
  ];

  const handleGenerateReport = () => {
    if (!reportType) {
      alert('Please select a report type');
      return;
    }
    // Simulate report generation
    alert(`Generating ${reportTypes.find(r => r.value === reportType)?.label} for ${selectedPet || 'All Pets'}`);
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
        }}>Reports</h1>
        <p style={{ color: 'rgb(75, 85, 99)' }}>Generate and view comprehensive pet reports</p>
      </div>

      {/* Report Generator */}
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
        }}>Generate New Report</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'rgb(55, 65, 81)',
              marginBottom: '0.5rem'
            }}>Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={{
                width: '100%',
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
              <option value="">Select Report Type</option>
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'rgb(55, 65, 81)',
              marginBottom: '0.5rem'
            }}>Pet</label>
            <select
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              style={{
                width: '100%',
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
              <option value="">All Pets</option>
              {pets.slice(1).map((pet) => (
                <option key={pet} value={pet}>{pet}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'rgb(55, 65, 81)',
              marginBottom: '0.5rem'
            }}>Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              style={{
                width: '100%',
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
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'rgb(55, 65, 81)',
              marginBottom: '0.5rem'
            }}>End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              style={{
                width: '100%',
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
            />
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          style={{
            backgroundColor: 'rgb(59, 130, 246)',
            color: 'white',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgb(59, 130, 246)';
          }}
        >
          Generate Report
        </button>
      </div>

      {/* Recent Reports */}
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
          marginBottom: '1.5rem'
        }}>Recent Reports</h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            minWidth: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead style={{ backgroundColor: 'rgb(249, 250, 251)' }}>
              <tr>
                <th style={{
                  padding: '0.75rem 1.5rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgb(107, 114, 128)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Report Name</th>
                <th style={{
                  padding: '0.75rem 1.5rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgb(107, 114, 128)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Type</th>
                <th style={{
                  padding: '0.75rem 1.5rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgb(107, 114, 128)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Pet</th>
                <th style={{
                  padding: '0.75rem 1.5rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgb(107, 114, 128)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Generated</th>
                <th style={{
                  padding: '0.75rem 1.5rem',
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'rgb(107, 114, 128)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: 'white' }}>
              {sampleReports.map((report) => (
                <tr key={report.id} style={{
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
                    padding: '1rem 1.5rem',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'rgb(17, 24, 39)'
                  }}>{report.name}</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    color: 'rgb(107, 114, 128)'
                  }}>{report.type}</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    color: 'rgb(107, 114, 128)'
                  }}>{report.pet}</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    color: 'rgb(107, 114, 128)'
                  }}>{report.date}</td>
                  <td style={{
                    padding: '1rem 1.5rem',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    <button style={{
                      color: 'rgb(37, 99, 235)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '0.75rem',
                      fontSize: '0.875rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'rgb(30, 64, 175)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgb(37, 99, 235)';
                    }}
                    >📄 View</button>
                    <button style={{
                      color: 'rgb(22, 101, 52)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginRight: '0.75rem',
                      fontSize: '0.875rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'rgb(21, 128, 61)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgb(22, 101, 52)';
                    }}
                    >📥 Download</button>
                    <button style={{
                      color: 'rgb(220, 38, 38)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'rgb(185, 28, 28)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgb(220, 38, 38)';
                    }}
                    >🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Statistics */}
      <div style={{
        marginTop: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'rgb(55, 65, 81)',
            marginBottom: '0.5rem'
          }}>Total Reports</h3>
          <p style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'rgb(37, 99, 235)'
          }}>23</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'rgb(55, 65, 81)',
            marginBottom: '0.5rem'
          }}>This Month</h3>
          <p style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'rgb(22, 101, 52)'
          }}>8</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'rgb(55, 65, 81)',
            marginBottom: '0.5rem'
          }}>Avg. per Week</h3>
          <p style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'rgb(147, 51, 234)'
          }}>2</p>
        </div>
      </div>
    </div>
  );
};