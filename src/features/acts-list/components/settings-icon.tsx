import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const settingsSvg: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.3 7.57969H15.72C15.33 7.57969 15.02 7.26969 15.02 6.87969C15.02 6.48969 15.33 6.17969 15.72 6.17969H21.3C21.69 6.17969 22 6.48969 22 6.87969C22 7.26969 21.69 7.57969 21.3 7.57969Z"
      fill="currentColor"
    />
    <path
      d="M6.42 7.57969H2.7C2.31 7.57969 2 7.26969 2 6.87969C2 6.48969 2.31 6.17969 2.7 6.17969H6.42C6.81 6.17969 7.12 6.48969 7.12 6.87969C7.12 7.26969 6.8 7.57969 6.42 7.57969Z"
      fill="currentColor"
    />
    <path
      d="M10.14 10.8297C12.3215 10.8297 14.09 9.06121 14.09 6.87969C14.09 4.69816 12.3215 2.92969 10.14 2.92969C7.95848 2.92969 6.19 4.69816 6.19 6.87969C6.19 9.06121 7.95848 10.8297 10.14 10.8297Z"
      fill="currentColor"
    />
    <path
      d="M21.3 17.8102H17.58C17.19 17.8102 16.88 17.5002 16.88 17.1102C16.88 16.7202 17.19 16.4102 17.58 16.4102H21.3C21.69 16.4102 22 16.7202 22 17.1102C22 17.5002 21.69 17.8102 21.3 17.8102Z"
      fill="currentColor"
    />
    <path
      d="M8.28 17.8102H2.7C2.31 17.8102 2 17.5002 2 17.1102C2 16.7202 2.31 16.4102 2.7 16.4102H8.28C8.67 16.4102 8.98 16.7202 8.98 17.1102C8.98 17.5002 8.66 17.8102 8.28 17.8102Z"
      fill="currentColor"
    />
    <path
      d="M13.86 21.0699C16.0415 21.0699 17.81 19.3014 17.81 17.1199C17.81 14.9384 16.0415 13.1699 13.86 13.1699C11.6785 13.1699 9.91 14.9384 9.91 17.1199C9.91 19.3014 11.6785 21.0699 13.86 21.0699Z"
      fill="currentColor"
    />
  </svg>
);

export default function SettingsIcon(
  props: Partial<CustomIconComponentProps>,
): React.ReactElement {
  return <Icon component={settingsSvg} {...props} />;
}
