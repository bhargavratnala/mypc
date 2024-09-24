import { ReactNode } from "react";

function DesktopIcon( props : { desktopIconName: string, src : ReactNode, open : (index : number) => void, index: number } ) {
  return (
        <div className="desktopIcon" onClick={() => props.open(props.index)}>
            {props.src}
            <span className="iconName">{props.desktopIconName}</span>
        </div>
  );
}

export default DesktopIcon;