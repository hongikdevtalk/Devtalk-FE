import AdminImageUpload from '../../../components/admin/upload/AdminImageUpload';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import {
  useHomeImages,
  useUploadHomeImage,
  useDeleteHomeImage,
} from '../../../hooks/HomeManage/useHomeImage';

const PromoImage = () => {
  const { data, isLoading, isError } = useHomeImages();
  const uploadMutation = useUploadHomeImage();
  const deleteMutation = useDeleteHomeImage();

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <div className="text-status-error text-center p-20">데이터를 불러올 수 없습니다.</div>;

  return (
    <div className="space-y-40  mx-60 mb-[175px]">
      <h1 className="mt-60 heading-1-bold text-white">홍보 사진 관리</h1>
      <AdminImageUpload
        title="Devtalk 소개 사진"
        serverFileName={data?.result?.intro?.fileName}
        serverFileUrl={data?.result?.intro?.url}
        serverFileCount={data?.result?.intro ? 1 : 0}
        isUploading={uploadMutation.isPending}
        onUpload={(files) => {
          console.log('소개 사진 업로드 요청:', files[0]);
          uploadMutation.mutate(
            { type: 'INTRO', file: files[0] },
            {
              onSuccess: (data) => {
                console.log('업로드 성공 - 소개 사진:', data);
              },
              onError: (error) => {
                console.error('업로드 실패 - 소개 사진:', error);
              },
            }
          );
        }}
        onRemove={() => {
          console.log('삭제 요청 - 소개 사진');
          deleteMutation.mutate({ type: 'INTRO' });
        }}
      />

      <AdminImageUpload
        title="이전 세미나 보러가기 사진"
        serverFileName={data?.result?.previousSeminar?.fileName}
        serverFileUrl={data?.result?.previousSeminar?.url}
        serverFileCount={data?.result?.previousSeminar ? 1 : 0}
        isUploading={uploadMutation.isPending}
        onUpload={(files) => {
          console.log('이전 세미나 사진 업로드 요청:', files[0]);
          uploadMutation.mutate(
            { type: 'PREVIOUS_SEMINAR', file: files[0] },
            {
              onSuccess: (data) => {
                console.log('업로드 성공 - 이전 세미나:', data);
              },
              onError: (error) => {
                console.error('업로드 실패 - 이전 세미나:', error);
              },
            }
          );
        }}
        onRemove={() => {
          console.log('이전 세미나 사진 삭제 요청');
          deleteMutation.mutate({ type: 'PREVIOUS_SEMINAR' });
        }}
      />
    </div>
  );
};

export default PromoImage;
