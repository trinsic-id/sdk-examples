export function Token(props: { token: string }) {
  return (
    <div style={{ backgroundColor: "white", width: "50%", color: "red" }}>
      <pre
        style={{
          textAlign: "left",
          paddingLeft: "15px",
          fontSize: "1rem",
          wordWrap: "break-word",
          wordBreak: "break-all",
          whiteSpace: "pre-wrap",
        }}
      >
        {props.token}
        <br />
      </pre>
    </div>
  );
}
