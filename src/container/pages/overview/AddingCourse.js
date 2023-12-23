import { Suspense, useEffect } from 'react';
import { message } from 'antd';
import { AdminApi } from '../../../config/api/admin/AdminApi';

function AddingCourse() {
  const courseInfo = localStorage.getItem('courseInfo');
  const courseInfoObject = JSON.parse(courseInfo);
  console.log(courseInfoObject);
  const coursePart = localStorage.getItem('coursePart');
  const coursePartObject = JSON.parse(coursePart);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await AdminApi.addCourse(courseInfoObject);
        const courses = await AdminApi.getCourse({ pageSize: 10000, pageNumber: 1 });
        coursePartObject.map(async (value, index) => {
          const res2 = await AdminApi.addCoursePart({
            courseID: courses.data.data[courses.data.data.length - 1].courseID,
            index: index + 1,
            partTitle: value,
            amout: 0,
            duration: 0,
          });
          return res2;
        });
        message.success('Added');
        return res;
      } catch (error) {
        alert('hehe');
      }
    }
    fetchData();
  }, []);

  return (
    <Suspense>
      <div>Adding...</div>
    </Suspense>
  );
}

export default AddingCourse;
