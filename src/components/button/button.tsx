interface Props {
  onClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
}

export default function Button(props: Props): JSX.Element {
  const { onClick, text } = props;

  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
}
