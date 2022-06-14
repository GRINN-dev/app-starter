import * as React from "react";
import { SVGProps } from "react";

const PhotoIcon = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V15C19 16.1046 18.1046 17 17 17H7C5.89543 17 5 16.1046 5 15V9Z" /><path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" /></svg>;

export default PhotoIcon;
export { PhotoIcon } 