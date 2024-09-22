import Taskbar from "./taskbar";
import '../assets/css/desktop.css';
import DesktopIcon from "./desktopIcon";
import { RiComputerLine, RiTerminalBoxFill } from "react-icons/ri";
import { useState } from "react";
import Window from "./window";

function Desktop() {

  const [windows, setWindows] = useState([
    {
      windowName: 'File Explorer',
      isOpen : false,
      active : false,
      minimized : false,
      icon : <RiComputerLine />,
    },
    {
      windowName: 'Terminal',
      isOpen : false,
      active : false,
      minimized : false,
      icon : <RiTerminalBoxFill />,
    }
  ]);

  function openWindow(index : number) {
    const tempWindows = [...windows];
    tempWindows[index].isOpen = true;
    tempWindows[index].active = true
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

  return (
    <div className="desktop">
      <div className="desktopIconContainer">
        {windows.map((window, index) => {
          return (
            <DesktopIcon desktopIconName={window.windowName} src={window.icon} open={() => {
              openWindow(index);
            }} key={index} />
          );
        }
        )}
      </div>
      <Taskbar windows={windows} unMinimizeWindow={unMinimizeWindow} openWindow={openWindow} setActive={setActive} />
      {windows.map((window, index) => {
        if(window.isOpen && !window.minimized)
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
          } active={window.active} key={index} windowId={index} />
        );
      })
      }
    </div>
  );
}

export default Desktop;