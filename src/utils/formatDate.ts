export const formatAdminDate = (isoString: string) => {
  //iso 형식으로 입력
  const safe = isoString.replace(/\./g, '-').replace(/\s*\(.*?\)\s*/g, 'T');

  const date = new Date(safe);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[date.getDay()];

  // 12시간제
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';

  hours %= 12;
  hours = hours || 12; // 0시는 12시로 표시

  // 분이 한 자리 수일 경우 앞에 0을 붙여줌
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${year}. ${month}. ${day} (${dayOfWeek}) ${ampm} ${hours}:${paddedMinutes}`;
};

export const formatDate = (isoString: string) => {
  //iso 형식으로 입력
  const safe = isoString.replace(/\./g, '-').replace(' ', 'T');

  const date = new Date(safe);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[date.getDay()];

  // 12시간제
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';

  hours %= 12;
  hours = hours || 12; // 0시는 12시로 표시

  // 분이 한 자리 수일 경우 앞에 0을 붙여줌
  const paddedMinutes = String(minutes).padStart(2, '0');

  return `${year}. ${month}. ${day} (${dayOfWeek}) ${ampm} ${hours}:${paddedMinutes}`;
};

// YYY-MM-DDTHH:mm:ss -> YYYY.MM.DD.HH:mm
export const formatIsoToInput = (isoString: string): string => {
  if (!isoString) return '';
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day}.${hours}:${minutes}`;
};

// YYYY.MM.DD.HH:mm -> YYYY-MM-DDTHH:mm:ss
export const formatInputToIso = (inputString: string): string => {
  if (!inputString) return '';

  const regex = /^(\d{4})\.(\d{2})\.(\d{2})\.(\d{2}):(\d{2})$/;
  const match = inputString.match(regex);

  if (!match) {
    return inputString;
  }

  const [, year, month, day, hours, minutes] = match;
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

// Date 객체 -> YYYY-MM-DDTHH:mm:ss
export const formatDateToIso = (date: Date | null): string | null => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};
