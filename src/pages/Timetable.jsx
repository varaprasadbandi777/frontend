import React from 'react';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM (Lunch)', '01:00 PM', '02:00 PM'];
  
  const schedule = {
    'Monday': ['Math', 'Physics', 'Chemistry', '-', 'English', 'Computer'],
    'Tuesday': ['Physics', 'Math', 'English', '-', 'Chemistry', 'Sports'],
    'Wednesday': ['Computer', 'Chemistry', 'Math', '-', 'Physics', 'Library'],
    'Thursday': ['English', 'Computer', 'Physics', '-', 'Math', 'Chemistry'],
    'Friday': ['Chemistry', 'Math', 'Computer', '-', 'Sports', 'Physics'],
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Class Timetable</h2>
        <select className="form-select form-control-custom w-auto">
          <option>Class A</option>
          <option>Class B</option>
          <option>Class C</option>
        </select>
      </div>

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-custom table-bordered text-center align-middle">
            <thead className="bg-primary bg-opacity-10">
              <tr>
                <th className="py-3">Day / Time</th>
                {times.map(time => <th key={time} className="py-3">{time}</th>)}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day}>
                  <td className="fw-bold bg-dark bg-opacity-25">{day}</td>
                  {schedule[day].map((subject, idx) => (
                    <td key={idx} className={subject === '-' ? 'bg-secondary bg-opacity-10' : ''}>
                      {subject === '-' ? <span className="text-muted">Lunch Break</span> : 
                        <span className={`badge ${subject === 'Math' ? 'bg-primary' : subject === 'Physics' ? 'bg-success' : subject === 'Computer' ? 'bg-info' : 'bg-secondary'} bg-opacity-75 p-2 w-100`}>
                          {subject}
                        </span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
