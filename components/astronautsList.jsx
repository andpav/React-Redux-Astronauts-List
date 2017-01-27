import React from 'react';
import Modal from './modal.jsx';

const ITEMS_ON_PAGE = 4;

class AstronautsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterValue: '',
      page: 1,
      pages: [],
      modal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.filtration = this.filtration.bind(this);
    this.pagination = this.pagination.bind(this);
    this.resetPages = this.resetPages.bind(this);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  filtration(event) {
    this.setState({ filterValue: event.target.value });
  }

  pagination(page) {
    this.setState({ page });
  }

  resetPages(list) {
    this.state.pages.splice(0, this.state.pages.length);

    list.astro.map((astronautsListItem, i) => {
      const astronaut = astronautsListItem;
      const itemPage = (Math.floor(i / ITEMS_ON_PAGE) + 1);

      astronaut.page = itemPage;

      if (this.state.pages[this.state.pages.length - 1] !== itemPage) {
        this.state.pages.push(itemPage);
      }

      return astronaut;
    });

    return list;
  }

  renderList(astro) {
    const filterPhrase = this.state.filterValue.toLowerCase();
    const filteredList = { astro: astro.filter(item => item.name.toLowerCase().indexOf(filterPhrase) !== -1) };
    const numberedList = this.resetPages(filteredList);

    return { astro: numberedList.astro.filter(item => item.page === this.state.page) };
  }

  render() {
    const { astro, addAstronaut, deleteAstronaut } = this.props;
    const renderList = this.renderList(astro);

    return (
      <div className="page">
        <h1 className="section section__header">Astronauts</h1>
        <div className="section section__filter">
          <Filter filtration={this.filtration} />
        </div>
        <ListItems notes={renderList} removeItem={deleteAstronaut} />
        <div className="section section__footer">
          <AddNew toggleModal={this.toggleModal} />
          <Pagination pages={this.state.pages} pagination={this.pagination} />
        </div>
        <Modal isShowModal={this.state.modal} toggleModal={this.toggleModal} addItem={addAstronaut} />
      </div>
    );
  }
}

const Filter = (({ filtration }) =>
  <input className="filter-input" onChange={filtration} placeholder="Search" />
);

const AddNew = (({ toggleModal }) =>
  <button className="add-button" onClick={toggleModal}>+ ADD</button>
);

const Pagination = (({ pages, pagination }) =>
  <span className="pagination">{pages.map((item, i) =>
    <label key={i} className="pagination__page-number" onClick={() => pagination(item)}>{item}</label>
  )}</span>
);

const ListItems = (({ notes, removeItem }) =>
  <div className="section section__table">
    <div className="table__header">
      <table className="table__row">
        <tbody>
          <tr>
            <th className="table__header-cell">Id</th>
            <th className="table__header-cell">Name</th>
            <th className="table__header-cell">Date</th>
            <th className="table__header-cell">Days</th>
            <th className="table__header-cell">Mission</th>
            <th className="table__header-cell">IsMultiple</th>
          </tr>
        </tbody>
      </table>
    </div>
    {notes.astro.map(item => <ListItem key={item.id} item={item} removeItem={removeItem} />)}
  </div>
);

const ListItem = (({ item, removeItem }) =>
  <table className="table__row">
    <tbody>
      <tr>
        <td className="table__cell">{item.id}</td>
        <td className="table__cell">{item.name}</td>
        <td className="table__cell">{item.date}</td>
        <td className="table__cell">{item.days}</td>
        <td className="table__cell">{item.mission}</td>
        <td className="table__cell">{item.isMultiple}</td>
        <td onClick={() => removeItem({ id: item.id })} className="remove">x</td>
      </tr>
    </tbody>
  </table>
);

AstronautsList.propTypes = {
  astro: React.PropTypes.array.isRequired,
  addAstronaut: React.PropTypes.func.isRequired,
  deleteAstronaut: React.PropTypes.func.isRequired,
};

Filter.propTypes = {
  filtration: React.PropTypes.func.isRequired,
};

AddNew.propTypes = {
  toggleModal: React.PropTypes.func.isRequired,
};

Pagination.propTypes = {
  pages: React.PropTypes.array.isRequired,
  pagination: React.PropTypes.func.isRequired,
};

ListItems.propTypes = {
  removeItem: React.PropTypes.func.isRequired,
  notes: React.PropTypes.object.isRequired,
};

ListItem.propTypes = {
  removeItem: React.PropTypes.func.isRequired,
  item: React.PropTypes.object.isRequired,
};

export default AstronautsList;
