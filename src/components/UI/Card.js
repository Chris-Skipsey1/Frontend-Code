import PropTypes from 'prop-types';
import '../UI/Card.css';

export default function Card({ children, onClick, isParentHovering = false }) {

  return (
    <div className={"Card" + (isParentHovering ? " Hovering" : "")} onClick={onClick}>
      {children}

    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string
};

function Container({ children, className = "" }) {
  return (
    <div className={"CardContainer " + className}>
      {children}
    </div>
  );
}

Card.Container = Container;