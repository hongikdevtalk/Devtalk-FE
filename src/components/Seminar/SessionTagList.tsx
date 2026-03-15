interface SessionTagListProps {
  tags: string[];
}

const SessionTagList = ({ tags }: SessionTagListProps) => {
  return (
    <div className="flex justify-center items-center gap-3 flex-wrap">
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="flex px-[10px] py-[8px] justify-center items-center gap-[10px] rounded-[10px] bg-[radial-gradient(154.4%_134.44%_at_86.96%_107.14%,_#ADE657_0%,_#4FC78F_100%)]"
        >
          <span className="text-white body-1-medium"># {tag}</span>
        </div>
      ))}
    </div>
  );
};

export default SessionTagList;
