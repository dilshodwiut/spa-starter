import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const peopleSvg: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 2C6.38 2 4.25 4.13 4.25 6.75C4.25 9.32 6.26 11.4 8.88 11.49C8.96 11.48 9.04 11.48 9.1 11.49C9.12 11.49 9.13 11.49 9.15 11.49C9.16 11.49 9.16 11.49 9.17 11.49C11.73 11.4 13.74 9.32 13.75 6.75C13.75 4.13 11.62 2 9 2Z"
      fill="currentColor"
    />
    <path
      d="M14.08 14.1509C11.29 12.2909 6.74002 12.2909 3.93002 14.1509C2.66002 15.0009 1.96002 16.1509 1.96002 17.3809C1.96002 18.6109 2.66002 19.7509 3.92002 20.5909C5.32002 21.5309 7.16002 22.0009 9.00002 22.0009C10.84 22.0009 12.68 21.5309 14.08 20.5909C15.34 19.7409 16.04 18.6009 16.04 17.3609C16.03 16.1309 15.34 14.9909 14.08 14.1509Z"
      fill="currentColor"
    />
    <path
      d="M19.99 7.3401C20.15 9.2801 18.77 10.9801 16.86 11.2101C16.85 11.2101 16.85 11.2101 16.84 11.2101H16.81C16.75 11.2101 16.69 11.2101 16.64 11.2301C15.67 11.2801 14.78 10.9701 14.11 10.4001C15.14 9.4801 15.73 8.1001 15.61 6.6001C15.54 5.7901 15.26 5.0501 14.84 4.4201C15.22 4.2301 15.66 4.1101 16.11 4.0701C18.07 3.9001 19.82 5.3601 19.99 7.3401Z"
      fill="currentColor"
    />
    <path
      d="M21.99 16.5904C21.91 17.5604 21.29 18.4004 20.25 18.9704C19.25 19.5204 17.99 19.7804 16.74 19.7504C17.46 19.1004 17.88 18.2904 17.96 17.4304C18.06 16.1904 17.47 15.0004 16.29 14.0504C15.62 13.5204 14.84 13.1004 13.99 12.7904C16.2 12.1504 18.98 12.5804 20.69 13.9604C21.61 14.7004 22.08 15.6304 21.99 16.5904Z"
      fill="currentColor"
    />
  </svg>
);

export default function PeopleIcon(
  props: Partial<CustomIconComponentProps>,
): React.ReactElement {
  return <Icon component={peopleSvg} {...props} />;
}
