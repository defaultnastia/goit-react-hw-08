import css from "./HeadingLine.module.css";

const HeadingLine = ({ error = false, text }) => {
  return (
    <div className={css.headingBox}>
      <h2>
        {error ? "Oops! Please reload the page or contact support " : text}
      </h2>
      {error && (
        <>
          <img
            src="https://assets.bigcartel.com/product_images/228233459/PikachuMeme.png?auto=format&fit=max&w=1500"
            alt="shocked pikachu"
            width="200px"
          />
          <p>
            ERROR: <span>{error}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default HeadingLine;
