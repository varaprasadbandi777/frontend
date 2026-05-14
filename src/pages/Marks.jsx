import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState('Class A');
  const [subject, setSubject] = useState('Mathematics');
  const [examType, setExamType] = useState('Midterm');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  // Mock data for initial rendering
  useEffect(() => {
    setStudents([
      { _id: '1', name: 'John Doe', rollNumber: '101', marksObtained: '' },
      { _id: '2', name: 'Jane Smith', rollNumber: '102', marksObtained: '' },
      { _id: '3', name: 'Robert Johnson', rollNumber: '103', marksObtained: '' }
    ]);
  }, [className, subject, examType]);

  const handleMarksChange = (id, value) => {
    setStudents(students.map(s => s._id === id ? { ...s, marksObtained: value } : s));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        // Map Excel data (assuming it has RollNumber and Marks columns) to state
        const updatedStudents = students.map(student => {
          const excelRecord = data.find(d => String(d.RollNumber) === String(student.rollNumber));
          return excelRecord ? { ...student, marksObtained: excelRecord.Marks } : student;
        });
        
        setStudents(updatedStudents);
        setMessage('Excel data imported successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('Error reading Excel file. Ensure columns are "RollNumber" and "Marks".');
      }
    };
    reader.readAsBinaryString(file);
    // Reset input
    e.target.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      // In a real app, send each student's marks to the API:
      // await Promise.all(students.map(s => api.post('/marks', { student: s._id, subject, examType, marksObtained: Number(s.marksObtained), maxMarks: 100 })))
      
      setMessage('Marks successfully uploaded!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to upload marks: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Marks Entry</h2>
        <div>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
          />
          <button className="btn btn-outline-success" onClick={() => fileInputRef.current.click()}>
            <i className="bi bi-file-earmark-excel me-2"></i> Import Excel
          </button>
        </div>
      </div>

      <div className="glass-card p-4 mb-4">
        <form className="row g-3">
          <div className="col-md-3">
            <label className="form-label text-muted">Class</label>
            <select 
              className="form-select form-control-custom"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            >
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label text-muted">Subject</label>
            <select 
              className="form-select form-control-custom"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label text-muted">Exam Type</label>
            <select 
              className="form-select form-control-custom"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
              <option value="Assignment">Assignment</option>
              <option value="Quiz">Quiz</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label text-muted">Max Marks</label>
            <input type="number" className="form-control form-control-custom" defaultValue="100" readOnly />
          </div>
        </form>
      </div>

      {message && (
        <div className={`alert ${message.includes('Failed') ? 'alert-danger' : 'alert-success'} bg-opacity-25 text-white border-0`} role="alert">
          {message}
        </div>
      )}

      <div className="glass-card p-4">
        <div className="table-responsive">
          <table className="table table-custom table-hover align-middle">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Marks Obtained</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const percentage = student.marksObtained ? ((Number(student.marksObtained) / 100) * 100).toFixed(1) : '-';
                const isFail = percentage !== '-' && Number(percentage) < 35;
                
                return (
                  <tr key={student._id}>
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td style={{ width: '200px' }}>
                      <input 
                        type="number" 
                        className={`form-control form-control-custom ${isFail ? 'border-danger text-danger' : ''}`}
                        placeholder="Enter marks"
                        min="0"
                        max="100"
                        value={student.marksObtained}
                        onChange={(e) => handleMarksChange(student._id, e.target.value)}
                      />
                    </td>
                    <td>
                      <span className={`fw-bold ${isFail ? 'text-danger' : 'text-success'}`}>
                        {percentage !== '-' ? `${percentage}%` : '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="d-flex justify-content-end mt-4">
          <button 
            className="btn btn-primary-custom" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Marks'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marks;
