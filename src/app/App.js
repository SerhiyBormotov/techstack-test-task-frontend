import React from 'react';
import ApartmentsList from '../features/apartments-list/ApartmentsList';
import ApartmentsAddForm from '../features/apartments-add-form/ApartmentsAddForm';
import ApartmentsFilters from '../features/apartments-filter/ApartmentsFilters';
import ErrorBoundary from '../features/error-boundry/ErrorBoundry';
import './App.scss';


function App() {
  return (
    <div className="app__container">
      <h1>Apartment marketplace application</h1>
      <div className="app__grid">
        <aside className="app__aside">
          <ApartmentsAddForm/>
        </aside>
        <main className="app__main">
          <ErrorBoundary>
            <ApartmentsFilters/>
          </ErrorBoundary>
          <ErrorBoundary>
            <ApartmentsList/>
          </ErrorBoundary>         
        </main>
      </div>
    </div>
  );
}

export default App;
