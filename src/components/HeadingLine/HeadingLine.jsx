import css from "./HeadingLine.module.css";

const HeadingLine = ({ error = false, text }) => {
  return (
    <div className={css.headingBox}>
      <h2>
        {error ? "Oops! Please reload the page or contact support " : text}
      </h2>
      {error && (
        <>
          <p>
            ERROR: <span>{error}</span>
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
