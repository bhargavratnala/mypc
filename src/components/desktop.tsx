import Taskbar from "./taskbar";
import '../assets/css/desktop.css';
import DesktopIcon from "./desktopIcon";
import { useEffect, useState } from "react";
import SuspenseLoader from "./SuspenseLoader";
import Window from "./window";
import Terminal from "./terminal";
import MyPC from "./mypc";
import Projects from "./projects";
import Skills from "./skills";
import Education from "./education";

function Desktop() {

  const [windows, setWindows] = useState([
    {
      windowName: 'My PC',
      isOpen : false,
      active : false,
      minimized : false,
      icon : <SuspenseLoader path="computer" />,
      content: <MyPC />,
    },
    {
      windowName: 'Terminal',
      isOpen : false,
      active : false,
      minimized : false,
      icon : <SuspenseLoader path="terminal" />,
      content: <Terminal open={openWindow} />,
    },
    {
      windowName: 'Projects',
      isOpen : false,
      active : false,
      minimized : false,
      icon : <SuspenseLoader path="projects" />,
      content: <Projects />,
    },
    {
      windowName: 'Skills',
      isOpen : false,
      active : false,
      minimized : false,
      icon : <SuspenseLoader path="skills" />,
      content: <Skills />,
    },
    {
      windowName: 'Education',
      isOpen : false,
      active : false,
      minimized : false,
      icon : <SuspenseLoader path="education" />,
      content: <Education />,
    }
  ]);

  function openWindow(index : number) {
    const tempWindows = [...windows];
    tempWindows[index].isOpen = true;
    tempWindows[index].active = true;
    setWindows(tempWindows);
  }

  function closeWindow(index : number) {
    const tempWindows = [...windows];
    tempWindows[index].isOpen = false;
    setWindows(tempWindows);
  }

  function minimizeWindow(index : number) {
    const tempWindows = [...windows];
    tempWindows[index].minimized = true;
    setWindows(tempWindows);
  }

  function unMinimizeWindow(index : number) {
    const tempWindows = [...windows];
    tempWindows[index].minimized = false;
    setWindows(tempWindows);
  }

  function setActive(index : number) {
    const tempWindows = [...windows];
    tempWindows[index].active = true;
    setWindows(tempWindows);
  }

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });

  return (
    <div className="desktop">
      <div className="desktopIconContainer">
        {windows.map((window, index) => {
          return (
            <DesktopIcon desktopIconName={window.windowName} src={window.icon} open={openWindow} index={index} key={index} />
          );
        }
        )}
      </div>
      
      <Taskbar windows={windows} unMinimizeWindow={unMinimizeWindow} openWindow={openWindow} setActive={setActive} />
      
      {windows.map((window, index) => {
        if(window.isOpen)
        return (
          <Window windowName={window.windowName} minimize={() => {
            minimizeWindow(index);
          }} closeWindow={() => {
            closeWindow(index);
          }} setActive={
            (value : boolean) => {
              const tempWindows = [...windows];
              tempWindows[index].active = value;
              setWindows(tempWindows);
            }
          } active={window.active} isMinimized={window.minimized} content={window.content} key={index} windowId={index} />
        );
      })
      }
    </div>
  );
}

export default Desktop;