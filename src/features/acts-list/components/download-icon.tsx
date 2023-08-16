import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const downloadSvg: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.47 10.98C8.76 10.69 9.24 10.69 9.53 10.98L11.25 12.7V6.51C11.25 6.1 11.59 5.76 12 5.76C12.41 5.76 12.75 6.1 12.75 6.51V12.7L14.47 10.98C14.76 10.69 15.24 10.69 15.53 10.98C15.82 11.27 15.82 11.75 15.53 12.04L12.53 15.04C12.46 15.11 12.38 15.16 12.29 15.2C12.2 15.24 12.1 15.26 12 15.26C11.9 15.26 11.81 15.24 11.71 15.2C11.62 15.16 11.54 15.11 11.47 15.04L8.47 12.04C8.18 11.75 8.18 11.28 8.47 10.98ZM18.24 17.22C16.23 17.89 14.12 18.23 12 18.23C9.88 18.23 7.77 17.89 5.76 17.22C5.37 17.09 5.16 16.66 5.29 16.27C5.42 15.88 5.84 15.66 6.24 15.8C9.96 17.04 14.05 17.04 17.77 15.8C18.16 15.67 18.59 15.88 18.72 16.27C18.84 16.67 18.63 17.09 18.24 17.22Z"
      fill="currentColor"
    />
  </svg>
);

export default function DownloadIcon(
  props: Partial<CustomIconComponentProps>,
): React.ReactElement {
  return <Icon component={downloadSvg} {...props} />;
}
