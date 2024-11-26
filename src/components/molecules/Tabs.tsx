import { FC, ReactNode, useState } from "react";
import CN from "classnames";

interface TabsProps {
  [x: string]: any;
  tabs: { id: number; title: string; content: string | ReactNode }[];
  defaultActiveTab: number;
}

const Tabs: FC<TabsProps> = ({ tabs, defaultActiveTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <>
      <ul
        className="mb-1 flex list-none flex-row flex-wrap border-b-0 pl-0"
        role="tablist"
        data-te-nav-ref
      >
        {tabs.map(({ title, id }: any) => {
          return (
            <li
              role="presentation"
              key={id}
              className={CN({ "border-b border-[#00598d]": id === activeTab })}
            >
              <a
                onClick={() => setActiveTab(id)}
                className="data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400 block cursor-pointer border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-1.5 pt-2 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent dark:text-neutral-400 dark:hover:bg-transparent"
                data-te-toggle="pill"
                data-te-target="#tabs-home0"
                data-te-nav-active
                role="tab"
                aria-controls="tabs-home0"
                aria-selected="true"
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mb-2">
        <div
          className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          role="tabpanel"
          aria-labelledby="tabs-home-tab0"
          data-te-tab-active
        >
          {tabs?.find((tabDetail) => tabDetail.id === activeTab)?.content}
        </div>
      </div>
    </>
  );
};

export default Tabs;
