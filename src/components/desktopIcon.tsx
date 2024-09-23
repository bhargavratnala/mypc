import { ReactNode } from "react";
import SuspenseLoader from "./SuspenseLoader";

function DesktopIcon( props : { desktopIconName: string, src : ReactNode, open : (index : number) => void, index: number } ) {
  return (
    <SuspenseLoader>
        <div className="desktopIcon" onClick={() => props.open(props.index)}>
            {props.src}
            <span className="iconName">{props.desktopIconName}</span>
        </div>
    </SuspenseLoader>
  );
}

export default DesktopIcon;