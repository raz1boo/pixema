import { Fragment, ReactNode } from "react";
import { Tab, TabList, TabPanel, Tabs as ReactTabs } from "react-tabs";
import { useAppSelector } from "../../store/hooks/redux";
import "./Tabs.scss";
interface TabItem {
  txt?: string;
  condition?: unknown;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <ReactTabs className="tabs">
      <TabList>
        {tabs.map((el) => (
          <Fragment key={el.txt}>
            {el.condition ? <Tab style={{color: theme==='light'?'#242426':'#fff'}}>{el.txt}</Tab> : null}
          </Fragment>
        ))}
      </TabList>
      {tabs.map((el) => (
        <Fragment key={el.txt}>
          {el.condition ? <TabPanel key={el.txt} >{el.content}</TabPanel> : null}
        </Fragment>
      ))}
    </ReactTabs>
  );
};

export default Tabs;
