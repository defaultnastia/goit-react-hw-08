import css from "./HeadingLine.module.css";

const HeadingLine = ({ error = false, text }) => {
  return (
    <div className={css.headingBox}>
      <h2>{error ? "Oops!" : text}</h2>
      {error && (
        <>
          <p>
            An error was encountered: <br /> <span>{error} </span>
            <br />
            Please reload the page or contact support!
          </p>
          <img
            src="https://i.imgflip.com/8h26xs.png"
            alt="sad hamster"
            width="100px"
          />
        </>
      )}
    </div>
  );
};

export default HeadingLine;
