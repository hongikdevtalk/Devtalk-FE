import ApplicantsList from '../../../components/admin/attendance/SeminarList';

const Attendance = () => {
  return (
    <div className="mx-60 my-60">
      <h1 className="text-white heading-1-bold mb-12">세미나 출석 관리</h1>
      <ApplicantsList />
    </div>
  );
};

export default Attendance;
