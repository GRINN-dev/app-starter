import * as React from "react";
import { SVGProps } from "react";

const ActiveIcon = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 3.00003C6 4.65689 4.65685 6.00003 3 6.00003C1.34315 6.00003 0 4.65689 0 3.00003C0 1.34318 1.34315 3.05176e-05 3 3.05176e-05C4.65685 3.05176e-05 6 1.34318 6 3.00003Z" /></svg>;

export default ActiveIcon;
export { ActiveIcon } 