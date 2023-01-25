import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility } from '../reducers/togglableReducer';

const Togglable = ({ buttonLabel, children }) => {
  const visible = useSelector((state) => state.togglable);
  const dispatch = useDispatch();

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  return (
    <div className="max-w-xs flex ml-2">
      <div style={hideWhenVisible}>
        <button
          type="button"
          className="bg-orange-400 text-orange-50 hover:bg-orange-500 font-semibold text-sm px-2"
          onClick={() => dispatch(toggleVisibility(true))}
        >
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="items-center">
        {children}
        <button
          type="button"
          className="bg-orange-400 text-orange-50 hover:bg-orange-500 font-semibold text-sm px-2"
          onClick={() => dispatch(toggleVisibility(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
