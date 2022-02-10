import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store'
import './style.scss';
import Locations from './components/locations/Locations';

ReactDOM.render(
	<Provider store={store}>
		<Locations />
	</Provider>
	,
	document.getElementById('root')
);
