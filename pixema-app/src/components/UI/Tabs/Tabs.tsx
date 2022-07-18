import { Fragment, ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from "react-tabs";
import './Tabs.scss'
interface TabItem {
  txt?: string;
  condition?: unknown;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

const Tabs = ({ tabs }: TabsProps) => {
  return (
    <ReactTabs className="tabs">
      <TabList>
        {tabs.map((el) => (
          <Fragment key={el.txt}>
            {el.condition ? <Tab>{el.txt}</Tab> : null}
          </Fragment>
        ))}
      </TabList>
      {tabs.map((el) => (
        <Fragment key={el.txt}>
          {el.condition ? <TabPanel key={el.txt}>{el.content}</TabPanel> : null}
        </Fragment>
      ))}
    </ReactTabs>
  );
};

export default Tabs;
