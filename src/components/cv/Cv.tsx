
type Props = {
  link: string;
}

const Cv = (props: Props): React.JSX.Element => (
  <div style={{ flex: 1, overflow: 'hidden' }}>
      <iframe
        src={props.link}
        width={'100%'}
        height={'100%'}
        style={{ border: 'none' }}
      />
  </div>
);

export default Cv;