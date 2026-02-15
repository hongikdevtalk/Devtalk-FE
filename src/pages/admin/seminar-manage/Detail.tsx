import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSeminarState } from '../../../hooks/SeminarManage/detail/useSeminarState';
import { useSeminarUpdateActions } from '../../../hooks/SeminarManage/actions/useSeminarActions';

import Header from '../../../components/admin/seminar-manage/Header';
import MainContent from '../../../components/admin/seminar-manage/MainContent';
import Footer from '../../../components/admin/seminar-manage/Footer';
import AdminModal from '../../../components/admin/common/AdminModal';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const seminarId = id ? parseInt(id) : undefined;

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    variant: 'deleteSeminar' | 'cancel' | null;
  }>({
    isOpen: false,
    variant: null,
  });

  const {
    currentState,
    isLoading: isSeminarLoading,
    error,
    isDirty,
    dateFormatError,
    validateActivationDates,
    updateSeminarData,
    updatePendingFiles,
    updateSpeakerProfile,
    hasErrors,
    pendingFiles,
    getError,
  } = useSeminarState(id);

  const {
    handleUpdateSeminar,
    handleDeleteSeminar,
    isLoading: isSeminarUpdating,
  } = useSeminarUpdateActions(seminarId);

  // 세미나 삭제 모달 열기
  const handleDeleteSeminarModal = () => {
    setModalConfig({
      isOpen: true,
      variant: 'deleteSeminar',
    });
  };

  // 저장
  const handleSave = async () => {
    if (!currentState) return;

    try {
      await handleUpdateSeminar(currentState, pendingFiles);
      alert('세미나가 수정되었습니다.');
    } catch (error: any) {
      alert(error.message);
    }
  };

  // 취소
  const handleCancel = () => {
    if (!currentState) return;

    if (isDirty) {
      setModalConfig({
        isOpen: true,
        variant: 'cancel',
      });
    } else {
      navigate(-1);
    }
  };

  // 모달에서 삭제하기 클릭 시
  const handleConfirm = async () => {
    if (modalConfig.variant === 'deleteSeminar') {
      try {
        await handleDeleteSeminar();
        navigate('/admin/seminars');
      } catch (error: any) {
        alert(error.message);
      }
    } else if (modalConfig.variant === 'cancel') {
      navigate(-1);
    }
  };

  const handleCloseModal = () => {
    setModalConfig({ isOpen: false, variant: null });
  };

  const isLoading = isSeminarLoading || isSeminarUpdating;

  // 로딩 상태
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 에러 상태
  if (error) {
    return <div className="text-status-error text-center p-20">{error}</div>;
  }

  // 데이터가 없는 경우
  if (!currentState) {
    return <div className="text-white text-center p-20">세미나 정보가 없습니다.</div>;
  }

  return (
    <div className="mx-60 my-40 min-h-screen">
      <Header
        title="세미나 상세정보 관리"
        showDeleteButton={true}
        onDelete={handleDeleteSeminarModal}
      />

      <MainContent
        currentState={currentState}
        pendingFiles={pendingFiles}
        dateFormatError={dateFormatError}
        validateActivationDates={validateActivationDates}
        updateSeminarData={updateSeminarData}
        updatePendingFiles={updatePendingFiles}
        updateSpeakerProfile={updateSpeakerProfile}
      />

      <Footer
        saveButtonText="수정하기"
        isDirty={isDirty}
        hasErrors={hasErrors}
        dateFormatError={dateFormatError}
        validateActivationDates={validateActivationDates}
        getError={getError}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {modalConfig.variant && (
        <AdminModal
          isOpen={modalConfig.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          variant={modalConfig.variant}
        />
      )}
    </div>
  );
};

export default Detail;
