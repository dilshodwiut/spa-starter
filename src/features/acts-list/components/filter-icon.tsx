import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const filterSvg: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.3999 2.09961H18.5999C19.6999 2.09961 20.5999 2.99961 20.5999 4.09961V6.29961C20.5999 7.09961 20.0999 8.09961 19.5999 8.59961L15.2999 12.3996C14.6999 12.8996 14.2999 13.8996 14.2999 14.6996V18.9996C14.2999 19.5996 13.8999 20.3996 13.3999 20.6996L11.9999 21.5996C10.6999 22.3996 8.8999 21.4996 8.8999 19.8996V14.5996C8.8999 13.8996 8.4999 12.9996 8.0999 12.4996L4.2999 8.49961C3.7999 7.99961 3.3999 7.09961 3.3999 6.49961V4.19961C3.3999 2.99961 4.2999 2.09961 5.3999 2.09961Z"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.93 2.09961L6 9.99961"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function FilterIcon(
  props: Partial<CustomIconComponentProps>,
): React.ReactElement {
  return <Icon component={filterSvg} {...props} />;
}
