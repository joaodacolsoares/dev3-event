function Sidebar({ children }) {
  return <div className="md:w-5/12 w-full space-y-2 md:space-y-6 flex-grow">{children}</div>;
}

function Section({ children }) {
  return <div className="md:w-7/12 w-full space-y-2 md:space-y-6 flex-grow">{children}</div>;
}

function Template({ children, title }) {
  return (
    <div className="w-full flex justify-center mb-4 md:px-5">
      <div className="flex flex-col max-w-5xl w-full">
        <div className="font-semibold shadow-sm mb-2 bg-white md:my-6 md:bg-transparent md:text-2xl md:shadow-none p-5 md:p-0">
          {title}
        </div>

        <div className="flex w-full items-start flex-col md:flex-row space-y-2 md:space-x-6 md:space-y-0">
          {children}
        </div>
      </div>
    </div>
  );
}

Template.Sidebar = Sidebar;
Template.Section = Section;
export default Template;
