import * as XLSX from 'xlsx';

/**
 * 엑셀 다운로드 버튼 컴포넌트의 Props 인터페이스
 */
interface ExcelDownloadButtonProps {
  /** 엑셀로 변환할 데이터 배열 */
  data: any[];
  /** 다운로드될 파일명 (기본값: 'data.xlsx') */
  fileName?: string;
  /** 버튼에 적용할 추가 CSS 클래스 */
  className?: string;
  /** 버튼 내부에 표시될 텍스트 또는 컴포넌트 */
  children?: React.ReactNode;
  /** 데이터 키를 한글 헤더명으로 매핑하는 객체 */
  headers?: { [key: string]: string };
}

/**
 * 엑셀 파일 다운로드 버튼 컴포넌트
 *
 * @param data - 엑셀로 변환할 JSON 데이터 배열
 * @param fileName - 다운로드될 파일명 
 * @param className - 버튼에 적용할 추가 CSS 클래스 
 * @param children - 버튼 내부에 표시될 텍스트 또는 컴포넌트 
 * @param headers - 데이터 키를 한글 헤더명으로 매핑하는 객체 
 *
 * />
 */

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({
  data,
  fileName = 'data.xlsx',
  className = '',
  children = '엑셀 파일 다운로드',
  headers
}) => {

  const handleExcelDownload = () => {
    // 데이터 유효성 검사
    if (!data || data.length === 0) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }

    // 처리할 데이터를 원본 데이터로 초기화
    let processedData = data;

    // headers 매핑이 제공된 경우, headers에 정의된 키만 처리하여 한글 헤더명으로 변환
    if (headers) {
      processedData = data.map(item => {
        const newItem: any = {};

        // headers 매핑에 정의된 키들만 순회 (매핑에 없는 키는 제외)
        Object.keys(headers).forEach(key => {
          // 해당 키가 데이터에 존재하는 경우에만 처리
          if (key in item) {
            const headerName = headers[key];
            // 새로운 객체에 한글 헤더명을 키로 하여 값 저장
            newItem[headerName] = item[key];
          }
        });

        return newItem;
      });
    }

    // JSON 데이터를 엑셀 워크시트로 변환
    const worksheet = XLSX.utils.json_to_sheet(processedData);

    // 새로운 워크북 생성
    const workbook = XLSX.utils.book_new();

    // 워크시트를 워크북에 'Sheet1' 이름으로 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 워크북을 파일로 다운로드
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      onClick={handleExcelDownload}
      className={`w-[200px] h-[60px] flex-shrink-0 bg-grey-700 hover:ring-2 hover:ring-green-300 hover:ring-inset text-gray rounded transition-colors ${className} cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default ExcelDownloadButton;