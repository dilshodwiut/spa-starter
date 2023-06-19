interface Props {
  children: React.ReactElement;
}

export default function DefaultLayout(props: Props): React.ReactElement {
  const { children } = props;

  return <div>{children}</div>;
}
