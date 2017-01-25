import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AstronautsList from '../components/astronautsList';
import * as astroActions from '../actions/astro';

function mapStateToProps(state) {
  return {
    astro: state.astro.astro
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(astroActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AstronautsList);