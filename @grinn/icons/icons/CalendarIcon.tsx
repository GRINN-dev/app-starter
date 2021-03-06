import * as React from "react";
import { SVGProps } from "react";

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 7.84842V3.84842M16 7.84842V3.84842M7 11.8484H17M5 21.8484H19C20.1046 21.8484 21 20.953 21 19.8484V7.84842C21 6.74385 20.1046 5.84842 19 5.84842H5C3.89543 5.84842 3 6.74385 3 7.84842V19.8484C3 20.953 3.89543 21.8484 5 21.8484Z" /></svg>;

export default CalendarIcon;
export { CalendarIcon } 