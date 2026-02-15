import LoadingSpinner from '../../../components/common/LoadingSpinner';
import LinkInput from '../../../components/admin/home/LinkInput';
import {
  useHomeLink,
  usePostHomeLink,
  useDeleteHomeLink,
} from '../../../hooks/HomeManage/useHomeLink';
import { useHomeFAQ, usePostHomeFAQ, useDeleteHomeFAQ } from '../../../hooks/HomeManage/useHomeFAQ';

const Links = () => {
  // 문의하기 커스텀 훅
  const { data, isLoading } = useHomeLink();
  const postMutation = usePostHomeLink();
  const deleteMutation = useDeleteHomeLink();

  // FAQ 관련 훅
  const { data: faqData, isLoading: isLoadingFAQ } = useHomeFAQ();
  const postMutationFAQ = usePostHomeFAQ();
  const deleteMutationFAQ = useDeleteHomeFAQ();

  if (isLoading || isLoadingFAQ) return <LoadingSpinner />;

  return (
    <div className="space-y-40 mx-60 mb-[175px]">
      <h1 className="mt-60 heading-1-bold text-white">링크 관리</h1>

      <LinkInput
        title="문의하기 링크"
        initialUrl={data?.result?.url}
        onSave={(url) => postMutation.mutate({ url })}
        onDelete={() => deleteMutation.mutate()}
        isSaving={postMutation.isPending}
        isDeleting={deleteMutation.isPending}
      />

      <LinkInput
        title="FAQ 링크"
        initialUrl={faqData?.result?.url}
        onSave={(url) => postMutationFAQ.mutate({ url })}
        onDelete={() => deleteMutationFAQ.mutate()}
        isSaving={postMutationFAQ.isPending}
        isDeleting={deleteMutationFAQ.isPending}
      />
    </div>
  );
};

export default Links;
