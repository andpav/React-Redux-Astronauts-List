import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AstronautsList from '../components/astronautsList';
import { actions } from '../ducks/astro';

function mapStateToProps(state) {
  return {
    astro: state.astro.astro
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AstronautsList);