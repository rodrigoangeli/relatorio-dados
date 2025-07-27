import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Section = React.memo(
  ({
    xs = 1,
    sm,
    md,
    lg,
    xl,
    xxl,
    gutter = 2,
    className,
    children,
    icon,
    title,
    subtitle,
    ...rest
  }) => {
    const classes = classNames(
      "row",
      `g-${gutter}`,
      {
        [`row-cols-${xs}`]: xs != null,
        [`row-cols-sm-${sm}`]: sm != null,
        [`row-cols-md-${md}`]: md != null,
        [`row-cols-lg-${lg}`]: lg != null,
        [`row-cols-xl-${xl}`]: xl != null,
        [`row-cols-xxl-${xxl}`]: xxl != null,
      },
      className
    );

    return (
      <div className="container-xxl my-2">
        <div className={`d-flex ${title && "mt-5"}`}>
          {icon && <img src="" />}
          <div>
            {title && <h4>{title}</h4>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>

        <div className={classes} {...rest}>
          {children}
        </div>
      </div>
    );
  }
);

Section.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  xxl: PropTypes.number,
  gutter: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Section;
