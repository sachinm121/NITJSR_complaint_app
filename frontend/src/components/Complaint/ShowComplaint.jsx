import React, { useEffect, useState } from "react";
import Card from "../Card/Card";

async function getStudentData(sid){
    console.log(sid);
    const res = await fetch( `http://localhost:4000/api/v1/get/user/student?sid=${sid}`,{
      method: "POST",
      headers: {
        'Content-type' : 'application/json'
      }
    });

  // console.log(res);

  if(res.ok){
    const data = await res.json();
    // console.log(data);
    return data;
  }
  else{
    return null;
  }

}

function ShowComplaint() {
  const [complaint, setComplaint] = useState(null);
  const [serviemanComplaint, setServicemanComplaint] = useState();

  // console.log(complaint);

  useEffect(() => {
    async function getData() {
      const st = JSON.parse(localStorage.getItem("student"));
      const ad = JSON.parse(localStorage.getItem("admin"));
      const sm = JSON.parse(localStorage.getItem("serviceman"));
      // console.log(sm);

      let user;

      if (st) {
        user = st;
        const userId = user._id
        // console.log(student);
        let res = await fetch(
          `http://localhost:4000/api/v1/get/student/complaints/${userId}`
        );
        if (res.ok) {
          res = await res.json();
          // console.log(res.complaints['student']);
          console.log(res.complaints);
          setComplaint(res.complaints);
          // console.log(studentDetails);
        }
      } else if (ad) {
        user = ad;
        let res = await fetch(
          `http://localhost:4000/api/v1/get/admin/complaints`
        );

        if (res.ok) {
          res = await res.json();
          // console.log(res.complaints['student']);
          console.log(res);
          console.log(res.complaints);
          setComplaint(res.complaints);
          // console.log(studentDetails);
        }
      } else if (sm) {
        user = sm;
        const userRole = user.role
        console.log(userRole);
        console.log(userRole)
        let res = await fetch(
          `http://localhost:4000/api/v1/get/serviceman/complaints?role=${userRole}`,
          {
              method: "POST",
              header: {
                'Content-type' : 'application/json'
              }
          }
        );
        
        if (res.ok) {
          res = await res.json();
          // console.log(res.complaints['student']);
          console.log(res);
          // const sdata = await getStudentData(res.sid);
          // console.log("Student data fetched: " + sdata);
          setComplaint(res.complaints);

        }
        else
          console.log(res);
        
      }

      // console.log(res);
    }

    getData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl mt-4 font-bold underline ">Complaints</h1>
      {complaint &&
        complaint.map((item, ind) => {
          return (
            <Card
              className={" mb-4 hover:cursor-pointer items-center"}
              key={item._id}
            >
              <h2 className="text-lg font-semibold mb-4">
                {item.complaintType}
              </h2>
              <div className="grid grid-cols-2 text-center">
                
                
                <p>Name</p>
                <p>{item.sid.name}</p>
                <p>Registration No.</p>
                <p>{item.sid.rollNo}</p>
                <p>Hostel</p>
                <p>{item.sid.hostel}</p>
                <p>Room No.</p>
                <p>{item.sid.roomNo}</p>
                <p>Complaints</p>
                <p className="text-gray-600">{item.complaint}</p>
                <p>Status</p>
                <p className="text-red-500 block mx-auto">{item.status}</p>
              </div>
            </Card>
          );
        })}
    </div>
  );
}

export default ShowComplaint;
