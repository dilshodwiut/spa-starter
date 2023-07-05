import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const noteSvg: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.07 6.25 8.66 5.84C8.25 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z"
      fill="currentColor"
    />
    <path
      d="M18.83 5.02972C18.6 4.83972 18.34 4.68972 18.06 4.57972C17.77 4.46972 17.48 4.69972 17.42 4.99972C17.08 6.70972 15.57 7.99972 13.75 7.99972H10.25C9.25 7.99972 8.31 7.60972 7.6 6.89972C7.08 6.37972 6.72 5.71972 6.58 5.00972C6.52 4.70972 6.22 4.46972 5.93 4.58972C4.77 5.05972 4 6.11972 4 8.24972V17.9997C4 20.9997 5.79 21.9997 8 21.9997H16C18.21 21.9997 20 20.9997 20 17.9997V8.24972C20 6.61972 19.55 5.61972 18.83 5.02972ZM8 12.2497H12C12.41 12.2497 12.75 12.5897 12.75 12.9997C12.75 13.4097 12.41 13.7497 12 13.7497H8C7.59 13.7497 7.25 13.4097 7.25 12.9997C7.25 12.5897 7.59 12.2497 8 12.2497ZM16 17.7497H8C7.59 17.7497 7.25 17.4097 7.25 16.9997C7.25 16.5897 7.59 16.2497 8 16.2497H16C16.41 16.2497 16.75 16.5897 16.75 16.9997C16.75 17.4097 16.41 17.7497 16 17.7497Z"
      fill="currentColor"
    />
  </svg>
);

export default function NoteIcon(
  props: Partial<CustomIconComponentProps>,
): React.ReactElement {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Icon component={noteSvg} {...props} />;
}
