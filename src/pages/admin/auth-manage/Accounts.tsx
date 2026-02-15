import { useState } from 'react';
import { toast } from 'react-toastify';
import AdminList from '../../../components/admin/auth-manage/AdminList';
import AddAdminForm from '../../../components/admin/auth-manage/AddAdminForm';
import ArrowIcon from '../../../assets/icons/components/SeminarApply/arrow.svg';
import { useAddAdminAccount } from '../../../hooks/AuthManage/useAddAdminAccount';
import axios from 'axios';

const Accounts = () => {
  const [isAdding, setIsAdding] = useState(false);
  const addAdminMutation = useAddAdminAccount();

  const handleAddAdmin = async (data: { name: string; userId: string; password: string }) => {
    try {
      await addAdminMutation.mutateAsync({
        name: data.name,
        loginId: data.userId,
        password: data.password,
      });
      toast.success('관리자가 성공적으로 추가되었습니다.');
      setIsAdding(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const status = e.response?.status;
        // 전역 인터셉터가 처리하는 인증/권한 오류는 중복 토스트 방지
        if (status === 401 || status === 403) return;
        const serverCode = String(e.response?.data?.code ?? '').toUpperCase();
        if (serverCode === 'AUTH_4001') {
          toast.error('이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.');
        } else {
          toast.error('관리자 추가에 실패했습니다.');
        }
      } else {
        toast.error('관리자 추가 중 오류가 발생했습니다.');
      }
      console.error('관리자 추가 실패:', e);
    }
  };

  return (
    <div className="space-y-40 mx-60 mb-[100px]">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between mt-60">
        {isAdding ? (
          <div className="flex items-center gap-20">
            <button
              onClick={() => setIsAdding(false)}
              className="text-grey-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <img src={ArrowIcon} alt="뒤로가기" className="w-24 h-24" />
            </button>
            <h1 className="heading-1-bold text-white">관리자 아이디 추가하기</h1>
          </div>
        ) : (
          <>
            <h1 className="heading-1-bold text-white">관리자 아이디 관리</h1>
            <button
              onClick={() => setIsAdding(true)}
              className="w-[175px] h-[52px] rounded-8 heading-3-semibold flex items-center justify-center bg-green-300 text-black hover:opacity-80 hover:cursor-pointer"
            >
              아이디 추가하기
            </button>
          </>
        )}
      </div>

      {/* 본문 */}
      {isAdding ? (
        <AddAdminForm onSubmit={handleAddAdmin} isLoading={addAdminMutation.isPending} />
      ) : (
        <AdminList />
      )}
    </div>
  );
};

export default Accounts;
