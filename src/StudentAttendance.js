import React, { useState, useEffect } from "react";
import "./tailwind.css";

function StudentAttendance() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      rollNo: rollNo,
      name: name,
      checkinTime: new Date().toLocaleTimeString(),
      checkoutTime: "",
      presence: "",
    };
    setStudents([...students, newStudent]);
    setRollNo("");
    setName("");
  };

  const removeStudent = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const handleCheckout = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].checkoutTime = new Date().toLocaleTimeString();
    updatedStudents[index].presence = "LEFT";
    setStudents(updatedStudents);
  };

  useEffect(() => {
    const updatedStudents = [...students];
    updatedStudents.forEach((student) => {
      if (student.checkoutTime !== "") {
        student.checkoutTime = new Date().toLocaleTimeString();
      }
    });
    setStudents(updatedStudents);
  }, []);

  return (
    <>
    {/* <div className="bg-cover bg-no-repeat bg-center p-8"
      style={{
        backgroundImage: `url('https://www.smartschoolerp.com/wp-content/uploads/2022/12/attendance-management.jpg')`,
        backgroundSize: 'cover',
        // width: '52vw',
        height: '40vh',
      }}>
    </div> */}
      <div className="container mx-auto p-4 bg-gradient-to-r from-sky-200 to-indigo-800" 
       >
        <h1 className="text-2xl font-bold mb-4 text--800">
          Student Attendance
        </h1>
        <form
          className="mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex mb-4">
            <div className="w-1/3 mr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="rollNo"
              >
                Roll No.
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rollNo"
                placeholder="Enter RollNo"
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>
            <div className="w-2/3 ml-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                placeholder="Enter Your Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Check In
          </button>
        </form>
        <div className="mb-8">
          <p className="text-gray-700 font-bold mb-2">
            Students present in school:
          </p>
          <p className="text-pink-700 font-bold text-4xl">
            {students.filter((student) => student.checkoutTime === "").length}
          </p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-100 text-left">Roll No.</th>
              <th className="px-4 py-2 bg-blue-100 text-left">Name</th>
              <th className="px-4 py-2 bg-blue-100 text      -left">
                Check In Time
              </th>
              <th className="px-4 py-2 bg-blue-100 text-left">
                Check Out Time
              </th>
              <th className="px-4 py-2 bg-blue-100">Present Status</th>
              <th className="px-4 py-2 bg-blue-100">Remove student</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{student.rollNo}</td>
                <td className="border px-4 py-2">{student.name}</td>
                <td className="border px-4 py-2">{student.checkinTime}</td>
                <td className="border px-4 py-2">{student.checkoutTime}</td>
                <td className="border px-4 py-2">
                  {student.presence}
                  {student.checkoutTime === "" && (
                    <button
                      onClick={() => handleCheckout(index)}
                      className="bg-orange-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                     Click to Checkout
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {student.checkoutTime === "" || (
                    <button
                      className="bg-slate-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => removeStudent(index)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StudentAttendance;
