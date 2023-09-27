const PageContent: React.FC<{ title: string; children: JSX.Element }> = ({
  title,
  children,
}) => {
  return (
    <div className="col-span-3 mt-10 text-xl text-center text-indigo-500 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
