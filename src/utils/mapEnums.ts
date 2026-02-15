export const mapParticipation = (label: string): 'ONLINE' | 'OFFLINE' => {
  return label?.startsWith('온라인') ? 'ONLINE' : 'OFFLINE';
};

export const mapInflowPath = (
  label: string
): 'INSTAGRAM' | 'CLUB' | 'EVERYTIME' | 'CAMPUS' | 'FRIEND' | 'PROFESSOR' | 'DEPARTMENT' => {
  switch (label) {
    case '인스타그램':
      return 'INSTAGRAM';
    case '학회/동아리 공지방':
      return 'CLUB';
    case '에브리타임':
      return 'EVERYTIME';
    case '교내 포스터 / X배너':
      return 'CAMPUS';
    case '지인':
      return 'FRIEND';
    case '교수님':
      return 'PROFESSOR';
    case '학과 공지방':
    default:
      return 'DEPARTMENT';
  }
};
